import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Store as StoreIcon, 
  Compass, 
  Gift, 
  Train, 
  Sparkles, 
  ArrowRight,
  Info,
  Car
} from 'lucide-react';
import { FloorInfo, Store, FloorId } from '../types';

interface InteractiveFloorMapProps {
  floors: FloorInfo[];
  stores: Store[];
  onSelectStore: (storeId: string) => void;
  onJumpToTour: (sceneId: string, storeId?: string) => void;
}

export const InteractiveFloorMap: React.FC<InteractiveFloorMapProps> = ({
  floors,
  stores,
  onSelectStore,
  onJumpToTour,
}) => {
  const [selectedFloorId, setSelectedFloorId] = useState<FloorId>('piso-tatuape');
  const [hoveredStore, setHoveredStore] = useState<Store | null>(null);

  const currentFloor = floors.find((f) => f.id === selectedFloorId) || floors[0];
  const floorStores = stores.filter((s) => s.floorId === selectedFloorId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-400" />
              Planta &amp; Mapa dos Pavimentos
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Interativo
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Localize lojas, serviços, elevadores e acesse o tour virtual em cada ponto do shopping.
          </p>
        </div>

        {/* Floor Level Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {floors.map((fl) => (
            <button
              key={fl.id}
              onClick={() => setSelectedFloorId(fl.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedFloorId === fl.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{fl.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floor Details Summary Bar */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-blue-400 font-bold uppercase tracking-wider block text-[10px]">
            {currentFloor.level}
          </span>
          <h3 className="text-base font-bold text-white">{currentFloor.name}</h3>
          <p className="text-slate-300 text-xs mt-0.5">{currentFloor.tagline}</p>
        </div>

        <button
          onClick={() => onJumpToTour(currentFloor.defaultSceneId)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 shrink-0"
        >
          <Compass className="w-4 h-4" />
          <span>Tour 360° deste Piso</span>
        </button>
      </div>

      {/* Interactive Blueprint Canvas & Store Pins */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4 flex items-center justify-center select-none">
        {/* Subtle Blueprint Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Mall Floor Layout Outline Illustration */}
        <div className="relative w-full max-w-2xl h-full border-2 border-slate-700/80 rounded-3xl bg-slate-900/60 p-6 flex flex-col justify-between shadow-inner">
          {/* North and Access Signs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Train className="w-3.5 h-3.5" />
              {selectedFloorId === 'piso-metro' ? 'Catracas do Metrô Tatuapé' : 'Passarela de Ligação Metrô'}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Car className="w-3.5 h-3.5 text-cyan-400" />
              Acesso Estacionamento G1/G2
            </span>
            <span className="text-amber-400 font-mono font-bold">
              {currentFloor.name.toUpperCase()}
            </span>
          </div>

          {/* Central Corridor Representation */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            {/* Corridors Lines */}
            <div className="w-full h-20 border-y-2 border-dashed border-slate-700/50 flex items-center justify-between px-6">
              <div className="text-[10px] text-slate-500 font-mono">ALA OESTE</div>
              <div className="text-[11px] text-slate-400 font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                CORREDOR CENTRAL &bull; ALAMEDA DE LOJAS
              </div>
              <div className="text-[10px] text-slate-500 font-mono">ALA LESTE</div>
            </div>

            {/* Store Pins placed on coordinates */}
            {floorStores.map((store) => {
              const isHovered = hoveredStore?.id === store.id;

              return (
                <div
                  key={store.id}
                  style={{
                    left: `${store.mapCoords.x}%`,
                    top: `${store.mapCoords.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onMouseEnter={() => setHoveredStore(store)}
                  onClick={() => onSelectStore(store.id)}
                >
                  {/* Pin Dot */}
                  <div className={`relative flex items-center justify-center transition-transform duration-200 ${
                    isHovered ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}>
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border-2 border-blue-500 shadow-xl flex items-center justify-center overflow-hidden p-0.5">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {store.couponId && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 border border-slate-950 flex items-center justify-center text-slate-950 text-[9px] font-bold">
                        %
                      </span>
                    )}
                  </div>

                  {/* Pin Label */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white px-2 py-0.5 rounded text-[10px] font-semibold border border-slate-700 shadow-lg pointer-events-none">
                    {store.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floor Amenities Legend */}
          <div className="border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Lojas &amp; Vitrines
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Com Cupom Exclusivo
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                WC &bull; Fraldário &bull; Elevador
              </span>
            </div>

            <span className="text-slate-400 text-[10px]">
              {floorStores.length} lojas mapeadas neste pavimento
            </span>
          </div>
        </div>

        {/* Hovered Store Preview Floating Tooltip */}
        {hoveredStore && (
          <div className="absolute bottom-6 right-6 w-72 bg-slate-900/95 backdrop-blur-md rounded-2xl p-3.5 border border-blue-500/50 shadow-2xl z-30 animate-in fade-in space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={hoveredStore.logo}
                alt={hoveredStore.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div>
                <h4 className="text-xs font-bold text-white">{hoveredStore.name}</h4>
                <p className="text-[10px] text-slate-400">{hoveredStore.corridor}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2">{hoveredStore.description}</p>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
              <button
                onClick={() => onSelectStore(hoveredStore.id)}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold text-center"
              >
                Ver Detalhes
              </button>
              <button
                onClick={() => onJumpToTour(hoveredStore.tourSceneId, hoveredStore.id)}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold text-center flex items-center justify-center gap-1"
              >
                <Compass className="w-3 h-3" />
                <span>Tour 360°</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stores on this Floor Grid list */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <StoreIcon className="w-4 h-4 text-blue-400" />
          Lojas no {currentFloor.name} ({floorStores.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {floorStores.map((st) => (
            <div
              key={st.id}
              onClick={() => onSelectStore(st.id)}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={st.logo}
                  alt={st.name}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    {st.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">{st.corridor}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {st.couponId && (
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                    Cupom
                  </span>
                )}
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
