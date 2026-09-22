import React from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Gift, 
  FileSpreadsheet, 
  ArrowRight 
} from 'lucide-react';
import { TourScene } from '../types';

interface VisitPassportProps {
  visitedSceneIds: string[];
  scenes: TourScene[];
  onOpenFormModal: () => void;
  onJumpToTourScene: (sceneId: string) => void;
}

export const VisitPassport: React.FC<VisitPassportProps> = ({
  visitedSceneIds,
  scenes,
  onOpenFormModal,
  onJumpToTourScene,
}) => {
  const totalScenes = scenes.length;
  const visitedCount = visitedSceneIds.length;
  const progressPercent = Math.min(100, Math.round((visitedCount / totalScenes) * 100));
  const isVipUnlocked = visitedCount >= 3;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left info */}
        <div className="space-y-2 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Passaporte de Exploração 360°
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
            Explore os Cenários Virtuais e Desbloqueie o Selo VIP
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Visite ao menos 3 pavimentos no tour virtual 360° para carimbar seu passaporte e concorrer a benefícios especiais do Shopping Metrô Tatuapé.
          </p>

          {/* Progress Bar */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Progresso: <strong>{visitedCount}</strong> de {totalScenes} ambientes visitados
              </span>
              <span className="font-bold text-amber-400">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scene Stamps List */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {scenes.map((scene) => {
            const isVisited = visitedSceneIds.includes(scene.id);

            return (
              <button
                key={scene.id}
                onClick={() => onJumpToTourScene(scene.id)}
                className={`relative px-3 py-2 rounded-xl text-left border transition-all text-xs flex items-center gap-2 ${
                  isVisited
                    ? 'bg-blue-950/60 border-blue-500/80 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
                title={`Clique para visitar ${scene.title}`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                  isVisited ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                }`}>
                  {isVisited ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Compass className="w-3 h-3" />}
                </div>
                <div className="line-clamp-1">
                  <p className="font-semibold text-[11px] leading-tight">{scene.title}</p>
                  <p className="text-[9px] text-slate-400">{scene.floorName}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-2">
          {isVipUnlocked ? (
            <button
              onClick={onOpenFormModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Resgatar Selo VIP &amp; Pesquisa</span>
            </button>
          ) : (
            <div className="text-center sm:text-right text-xs text-slate-400">
              <span className="text-amber-300 font-semibold block">Faltam {Math.max(0, 3 - visitedCount)} visitas</span>
              <span>para desbloquear o benefício</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
