import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  Play, 
  Pause, 
  Store as StoreIcon, 
  ArrowUpRight, 
  Sparkles, 
  Info, 
  Navigation,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { TourScene, Hotspot, Store } from '../types';

interface VirtualTour360Props {
  scenes: TourScene[];
  activeScene: TourScene;
  onSelectScene: (scene: TourScene) => void;
  onSelectStore: (storeId: string) => void;
  onOpenFormModal: () => void;
  stores: Store[];
  onRecordVisit: (sceneId: string) => void;
}

export const VirtualTour360: React.FC<VirtualTour360Props> = ({
  scenes,
  activeScene,
  onSelectScene,
  onSelectStore,
  onOpenFormModal,
  stores,
  onRecordVisit,
}) => {
  // 360 Pan state
  const [yaw, setYaw] = useState<number>(activeScene.initialYaw || 0); // Horizontal angle -180 to 180
  const [pitch, setPitch] = useState<number>(0); // Vertical angle -30 to 30
  const [zoom, setZoom] = useState<number>(1);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeHotspotHover, setActiveHotspotHover] = useState<Hotspot | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Record visit for gamification / passport
  useEffect(() => {
    onRecordVisit(activeScene.id);
  }, [activeScene.id, onRecordVisit]);

  // Reset yaw smoothly on scene switch
  useEffect(() => {
    setYaw(activeScene.initialYaw || 0);
    setPitch(0);
  }, [activeScene]);

  // Auto rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setYaw((prev) => {
        const next = prev + 0.12;
        return next > 180 ? -180 : next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Mouse / Touch handlers for 360 drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotating(false);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setYaw((prev) => {
      let next = prev + deltaX * 0.15;
      if (next > 180) next -= 360;
      if (next < -180) next += 360;
      return next;
    });

    setPitch((prev) => {
      const next = prev - deltaY * 0.1;
      return Math.max(-25, Math.min(25, next));
    });
  }, []);

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom((prev) => {
      if (direction === 'in') return Math.min(1.6, prev + 0.2);
      return Math.max(0.85, prev - 0.2);
    });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Hotspot interaction
  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.type === 'store' && hotspot.storeId) {
      onSelectStore(hotspot.storeId);
    } else if (hotspot.type === 'floor_change' && hotspot.targetSceneId) {
      const target = scenes.find((s) => s.id === hotspot.targetSceneId);
      if (target) onSelectScene(target);
    } else if (hotspot.type === 'coupon') {
      onOpenFormModal();
    }
  };

  // Background position calculation to simulate 360 panoramic motion
  const bgPosX = ((yaw + 180) / 360) * 100;
  const bgPosY = 50 + pitch;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl transition-all ${
        isFullscreen ? 'h-screen rounded-none' : 'h-[520px] md:h-[620px]'
      }`}
    >
      {/* 360 Panorama Canvas Container */}
      <div
        className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Panoramic Background with smooth panning */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
          style={{
            backgroundImage: `url(${activeScene.imageUrl})`,
            backgroundPosition: `${bgPosX}% ${bgPosY}%`,
            backgroundSize: `${zoom * 260}% auto`,
            backgroundRepeat: 'repeat-x',
            filter: 'brightness(0.92) contrast(1.05)',
          }}
        />

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60 pointer-events-none" />

        {/* Interactive 360 Hotspots */}
        {activeScene.hotspots.map((hs) => {
          // Dynamic offset in viewport based on hotspot natural x and current yaw
          // Hotspot x is mapped from 0 to 100
          const angleDiff = ((hs.x * 3.6 - (yaw + 180) + 540) % 360) - 180;
          // Only show when within field of view (-60 to +60 degrees)
          const visible = Math.abs(angleDiff) < 65;
          const screenX = 50 + (angleDiff / 65) * 45;
          const screenY = hs.y + pitch * 0.4;

          if (!visible) return null;

          const linkedStore = hs.storeId ? stores.find((s) => s.id === hs.storeId) : null;

          return (
            <div
              key={hs.id}
              style={{
                left: `${screenX}%`,
                top: `${screenY}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 transition-all duration-100 ease-out group"
              onMouseEnter={() => setActiveHotspotHover(hs)}
              onMouseLeave={() => setActiveHotspotHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleHotspotClick(hs);
              }}
            >
              {/* Pulse Marker */}
              <div className="relative flex items-center justify-center cursor-pointer">
                <div className="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping" />
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 transition-transform duration-200 group-hover:scale-110 ${
                  hs.type === 'coupon'
                    ? 'bg-amber-500 border-white text-slate-950 shadow-amber-500/50'
                    : hs.type === 'floor_change'
                    ? 'bg-emerald-600 border-white text-white shadow-emerald-600/50'
                    : 'bg-blue-600 border-white text-white shadow-blue-600/50'
                }`}>
                  {hs.type === 'coupon' ? (
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  ) : hs.type === 'floor_change' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <StoreIcon className="w-4 h-4" />
                  )}
                </div>

                {/* Floating Badge Label */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg border border-slate-700 shadow-xl flex items-center gap-1.5 pointer-events-none group-hover:border-blue-400">
                  <span className="text-xs font-semibold">{hs.title}</span>
                  {hs.discountBadge && (
                    <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded">
                      {hs.discountBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* Rich Hover Card */}
              {activeHotspotHover?.id === hs.id && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-64 bg-slate-900/95 backdrop-blur-md rounded-xl p-3 shadow-2xl border border-blue-500/40 z-30 pointer-events-none animate-in fade-in zoom-in-95">
                  {linkedStore && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                      <img 
                        src={linkedStore.logo} 
                        alt={linkedStore.name} 
                        className="w-8 h-8 rounded-lg object-cover border border-slate-700" 
                      />
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{linkedStore.name}</p>
                        <p className="text-[10px] text-slate-400">{linkedStore.corridor}</p>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-slate-300 mb-2">{hs.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-blue-400 font-medium">
                    <span>{hs.type === 'floor_change' ? 'Mudar de Piso' : 'Clique para explorar'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* HUD: Top Bar with Scene Title and Compass */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-4 pointer-events-none">
          {/* Scene Name and Floor badge */}
          <div className="bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 shadow-xl max-w-sm pointer-events-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-blue-600/30 text-blue-300 border border-blue-500/40">
                {activeScene.floorName}
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Tour 360° Ativo
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {activeScene.title}
            </h2>
            <p className="text-xs text-slate-400 line-clamp-1">{activeScene.subtitle}</p>
          </div>

          {/* Compass and Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Compass Indicator */}
            <div 
              className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 shadow-lg"
              title={`Orientação: ${Math.round(yaw)}°`}
            >
              <Navigation 
                className="w-5 h-5 text-amber-400 transition-transform duration-75"
                style={{ transform: `rotate(${-yaw}deg)` }}
              />
            </div>

            {/* Help Button */}
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-lg transition-colors"
              title="Ajuda e Instruções do Tour"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Help Dialog */}
        {showHelp && (
          <div className="absolute top-16 right-4 w-72 bg-slate-900/95 backdrop-blur-md border border-blue-500/40 rounded-xl p-4 shadow-2xl z-30 animate-in fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Como Navegar</span>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <RotateCw className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Arraste para os lados</strong> para girar a visão em 360 graus.</span>
              </li>
              <li className="flex items-start gap-2">
                <StoreIcon className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Clique nos <strong>pontos flutuantes (Hotspots)</strong> para entrar na vitrine da loja ou mudar de andar.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Aproveite os <strong>cupons exclusivos</strong> vinculados a cada loja visitada!</span>
              </li>
            </ul>
          </div>
        )}

        {/* Center Guide Hint (fades out after interaction) */}
        {isAutoRotating && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none bg-slate-900/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-slate-300 flex items-center gap-2 shadow-lg animate-pulse">
            <RotateCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Giro 360° automático ativo • Arraste com o dedo ou mouse para interagir</span>
          </div>
        )}

        {/* HUD: Right Vertical Action Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            id="tour-auto-rotate-btn"
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors border ${
              isAutoRotating
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
            title={isAutoRotating ? 'Pausar rotação automática' : 'Ativar rotação 360°'}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleZoom('in')}
            id="tour-zoom-in-btn"
            className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center shadow-lg transition-colors"
            title="Aproximar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            id="tour-zoom-out-btn"
            className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center shadow-lg transition-colors"
            title="Afastar Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            id="tour-fullscreen-btn"
            className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center shadow-lg transition-colors"
            title="Modo Tela Cheia"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Scene Switcher Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <div className="bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 shadow-2xl flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-2 pr-1 hidden md:inline">
            Cenários 360°:
          </span>

          {scenes.map((scene) => {
            const isSelected = scene.id === activeScene.id;
            return (
              <button
                key={scene.id}
                onClick={() => onSelectScene(scene)}
                id={`scene-select-${scene.id}`}
                className={`relative group shrink-0 flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-500 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <div className="w-8 h-8 rounded-md overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                  <img
                    src={scene.imageUrl}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight">{scene.title}</p>
                  <p className="text-[10px] text-slate-400">{scene.floorName}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 ml-1 shrink-0" />
                )}
              </button>
            );
          })}

          {/* Quick Form Button in Bar */}
          <button
            onClick={onOpenFormModal}
            className="ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all whitespace-nowrap"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pesquisa &amp; Benefício</span>
            <span className="sm:hidden">Formulário</span>
          </button>
        </div>
      </div>
    </div>
  );
};
