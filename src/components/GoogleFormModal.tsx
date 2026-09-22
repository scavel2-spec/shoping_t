import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Gift,
  RefreshCw
} from 'lucide-react';
import { GOOGLE_FORM_URL } from '../data/shoppingData';

interface GoogleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimVipGift: () => void;
  isVipGiftClaimed: boolean;
}

export const GoogleFormModal: React.FC<GoogleFormModalProps> = ({
  isOpen,
  onClose,
  onClaimVipGift,
  isVipGiftClaimed,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                  Pesquisa Oficial &amp; Benefício VIP
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.2 rounded-full">
                  Google Forms
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Shopping Metrô Tatuapé • Plataforma Digital &amp; Tour Virtual
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 transition-colors"
              title="Abrir formulário em uma nova aba do navegador"
            >
              <span>Abrir em Nova Aba</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* VIP Instructions Banner */}
        <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-blue-500/15 border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <Gift className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Preencha suas respostas e clique no botão abaixo para <strong>desbloquear seu voucher de Brinde no Concierge</strong>!
            </span>
          </div>

          <button
            onClick={onClaimVipGift}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md ${
              isVipGiftClaimed
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
            }`}
          >
            {isVipGiftClaimed ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Brinde VIP Resgatado</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confirmar Resposta &amp; Ganhar Brinde</span>
              </>
            )}
          </button>
        </div>

        {/* Embedded Iframe Container */}
        <div className="relative flex-1 min-h-[420px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
          {/* Fallback & Direct link bar */}
          <div className="w-full bg-slate-900/90 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Conexão segura com formulário oficial ({GOOGLE_FORM_URL})
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIframeKey((prev) => prev + 1)}
                className="hover:text-white flex items-center gap-1"
                title="Recarregar formulário"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Recarregar</span>
              </button>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Link Direto</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Iframe View */}
          <iframe
            key={iframeKey}
            src={GOOGLE_FORM_URL}
            title="Formulário Shopping Tatuapé"
            className="w-full h-full min-h-[460px] border-0 bg-white"
            onLoad={() => setIframeLoaded(true)}
          />

          {/* Fallback Box shown underneath or if user prefers */}
          {!iframeLoaded && (
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs text-slate-300">Carregando formulário oficial...</p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
              >
                <span>Clique para Abrir em Nova Aba</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">
            * Seus dados são protegidos e utilizados exclusivamente para melhorias nos serviços do Complexo Shopping Tatuapé.
          </p>

          <div className="flex items-center gap-2">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden px-3 py-2 rounded-xl bg-slate-800 text-amber-300 text-xs font-semibold"
            >
              Abrir Fora
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Concluir &amp; Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
