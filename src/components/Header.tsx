import React from 'react';
import { 
  Compass, 
  Store as StoreIcon, 
  Gift, 
  MapPin, 
  FileSpreadsheet, 
  Ticket, 
  Clock, 
  Train
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'tour' | 'stores' | 'benefits' | 'map';
  setActiveTab: (tab: 'tour' | 'stores' | 'benefits' | 'map') => void;
  savedCouponsCount: number;
  onOpenWallet: () => void;
  onOpenFormModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCouponsCount,
  onOpenWallet,
  onOpenFormModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Status & Metro Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 px-4 py-1.5 text-xs text-slate-300 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-blue-300">
              <Train className="w-3.5 h-3.5 text-emerald-400" />
              Acesso Direto à Estação Tatuapé (Linha 3-Vermelha & CPTM)
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-amber-400" />
              Hoje aberto até às 22h
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onOpenFormModal}
              id="header-forms-link-btn"
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 text-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Pesquisa Oficial &amp; Brindes VIP</span>
              <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                NOVO
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('tour')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                ST
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">Shopping Tatuapé</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Digital
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Tour Virtual 360° &amp; Clube de Benefícios Exclusivos</p>
          </div>
        </div>

        {/* Primary Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('tour')}
            id="nav-tab-tour"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'tour'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            Tour Virtual 360°
          </button>

          <button
            onClick={() => setActiveTab('stores')}
            id="nav-tab-stores"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'stores'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <StoreIcon className="w-4 h-4" />
            Lojas &amp; Vitrines
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            id="nav-tab-benefits"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'benefits'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Gift className="w-4 h-4" />
            Benefícios Exclusivos
          </button>

          <button
            onClick={() => setActiveTab('map')}
            id="nav-tab-map"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'map'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Mapa dos Pisos
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Saved Coupons Wallet Button */}
          <button
            onClick={onOpenWallet}
            id="header-wallet-btn"
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium transition-all"
            title="Minha Carteira de Cupons Salvos"
          >
            <Ticket className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Meus Cupons</span>
            {savedCouponsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center animate-pulse">
                {savedCouponsCount}
              </span>
            )}
          </button>

          {/* Form CTA */}
          <button
            onClick={onOpenFormModal}
            id="header-cta-forms"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-950" />
            <span>Formulário &amp; Vantagens</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden border-t border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('tour')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
            activeTab === 'tour' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Tour 360°
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
            activeTab === 'stores' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          <StoreIcon className="w-3.5 h-3.5" />
          Lojas &amp; Vitrines
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeTab === 'benefits'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'bg-slate-800 text-amber-300'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          Benefícios VIP
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
            activeTab === 'map' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          Mapa dos Pisos
        </button>
        <button
          onClick={onOpenFormModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-amber-500/20 text-amber-300 border border-amber-500/40"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          Formulário VIP
        </button>
      </div>
    </header>
  );
};
