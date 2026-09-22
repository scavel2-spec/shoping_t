import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Train, 
  Car, 
  FileSpreadsheet, 
  ExternalLink, 
  Compass, 
  Gift, 
  Store as StoreIcon 
} from 'lucide-react';
import { GENERAL_INFO, GOOGLE_FORM_URL } from '../data/shoppingData';

interface FooterProps {
  onNavigateTab: (tab: 'tour' | 'stores' | 'benefits' | 'map') => void;
  onOpenFormModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenFormModal,
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center font-extrabold text-white text-sm">
                ST
              </div>
              <span className="font-bold text-white text-base">Shopping Tatuapé</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Complexo comercial integrado com o Shopping Metrô Tatuapé e Shopping Metrô Boulevard Tatuapé, oferecendo o que há de melhor em compras, gastronomia e entretenimento.
            </p>
            <div className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Train className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conexão direta Estação Metrô Tatuapé</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Navegação Digital
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTab('tour')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-blue-400" />
                  <span>Tour Virtual 360°</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('stores')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <StoreIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Vitrines &amp; Lojas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('benefits')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>Clube de Benefícios &amp; Cupons</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('map')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Planta dos Pavimentos</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Google Form Callout Col */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Pesquisa Oficial &amp; Vantagens
            </h4>
            <p className="text-slate-400 text-xs">
              Participe da pesquisa oficial pelo link disponibilizado pelo shopping e concorra a benefícios extras.
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenFormModal}
                className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-300 font-semibold flex items-center justify-between text-xs transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                  Responder Pesquisa
                </span>
                <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded text-[9px]">
                  VIP
                </span>
              </button>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-[11px]"
              >
                <span>forms.gle/98VL3aV8S9Nop1866</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Location & Contact Col */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Localização &amp; Horários
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{GENERAL_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{GENERAL_INFO.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>SAC: {GENERAL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{GENERAL_INFO.parking}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>&copy; {new Date().getFullYear()} Shopping Metrô Tatuapé &amp; Boulevard Tatuapé. Plataforma Digital &amp; Tour Virtual 360°.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenFormModal} className="hover:text-slate-400">Termos &amp; Formulário</button>
            <span>&bull;</span>
            <button onClick={() => onNavigateTab('benefits')} className="hover:text-slate-400">Regras de Cupons</button>
            <span>&bull;</span>
            <span className="text-slate-400">Zona Leste, São Paulo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
