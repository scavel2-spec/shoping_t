import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Ticket, 
  Info, 
  Store as StoreIcon,
  ShieldCheck,
  Award
} from 'lucide-react';
import { BenefitCoupon, StoreCategory } from '../types';
import { GOOGLE_FORM_URL } from '../data/shoppingData';

interface BenefitsClubProps {
  coupons: BenefitCoupon[];
  savedCouponIds: string[];
  onRedeemCoupon: (coupon: BenefitCoupon) => void;
  onOpenFormModal: () => void;
  onSelectStore: (storeId: string) => void;
}

export const BenefitsClub: React.FC<BenefitsClubProps> = ({
  coupons,
  savedCouponIds,
  onRedeemCoupon,
  onOpenFormModal,
  onSelectStore,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory | 'todas'>('todas');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories: { id: StoreCategory | 'todas'; label: string }[] = [
    { id: 'todas', label: 'Todos os Benefícios' },
    { id: 'gastronomia', label: 'Gastronomia & Chopp' },
    { id: 'beleza', label: 'Joias & Cosméticos' },
    { id: 'tecnologia', label: 'Eletrônicos & Áudio' },
    { id: 'lazer', label: 'Cinema & Pipoca' },
    { id: 'servicos', label: 'Estacionamento & SAC' },
  ];

  const filteredCoupons = coupons.filter(
    (c) => selectedCategory === 'todas' || c.category === selectedCategory
  );

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner for Digital Benefits */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Clube de Vantagens da Plataforma Digital</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Benefícios Exclusivos para Clientes que Navegam no Shopping Tatuapé
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Economize em suas marcas preferidas, ganhe cortesias em restaurantes renomados e desfrute de vantagens especiais no estacionamento e no cinema ao apresentar seus vouchers digitais.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Gratuito e sem mensalidades
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Resgate imediato na tela do seu celular
            </span>
          </div>
        </div>

        {/* Decorative Watermark Background */}
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Featured Google Forms Survey Callout Box */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-purple-500/20 border-2 border-amber-500/50 p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-lg shadow-amber-500/30">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                Pesquisa Oficial Shopping Tatuapé
              </span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Link Oficial
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">
              Responda ao Formulário e Ganhe um Brinde VIP no Concierge
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Sua opinião ajuda a aprimorar nosso shopping e serviços. Quem responder ao formulário oficial ganha brinde exclusivo e concorre a vales-compras nas lojas parceiras!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={onOpenFormModal}
            id="open-form-modal-btn"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Responder no App</span>
          </button>

          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <span>Abrir no Google Forms</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Category Pills Scroller */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 hidden sm:block shrink-0">
          <strong>{filteredCoupons.length}</strong> cupons ativos
        </div>
      </div>

      {/* Coupon Cards Grid with Ticket Motif */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCoupons.map((coupon) => {
          const isSaved = savedCouponIds.includes(coupon.id);

          return (
            <div
              key={coupon.id}
              className="relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Ticket Top Ribbon */}
              <div className="p-5 flex items-start justify-between gap-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 p-1 border border-slate-700 overflow-hidden shrink-0">
                    <img
                      src={coupon.storeLogo}
                      alt={coupon.storeName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                      {coupon.storeName}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors leading-tight">
                      {coupon.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-block bg-amber-500 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    {coupon.discountText}
                  </span>
                </div>
              </div>

              {/* Ticket Middle: Perforation / Notches Graphic */}
              <div className="relative py-2 px-5 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400 border-y border-dashed border-slate-800">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800" />
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 pl-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {coupon.expiryDate}
                </span>
                <span className="text-[11px] text-blue-300 pr-2 font-mono font-medium">
                  {coupon.code}
                </span>
              </div>

              {/* Ticket Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed">{coupon.description}</p>

                  {/* Rules preview */}
                  <div className="mt-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <span className="font-semibold text-slate-300 block text-[10px] uppercase">
                      Regras de Utilização:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {coupon.rules.slice(0, 2).map((rule, idx) => (
                        <li key={idx} className="line-clamp-1">
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="pt-2 flex items-center gap-2">
                  {/* Redeem / Save button */}
                  <button
                    onClick={() => onRedeemCoupon(coupon)}
                    id={`redeem-btn-${coupon.id}`}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md ${
                      isSaved
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/20'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Salvo na Minha Carteira</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        <span>Resgatar Cupom</span>
                      </>
                    )}
                  </button>

                  {/* Copy Code */}
                  <button
                    onClick={(e) => handleCopyCode(coupon.code, e)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Copiar Código"
                  >
                    {copiedCode === coupon.code ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Quick Store link */}
                  {coupon.storeId && !coupon.formBonus && (
                    <button
                      onClick={() => onSelectStore(coupon.storeId)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-blue-200 border border-slate-700 transition-colors"
                      title="Ver vitrine da loja"
                    >
                      <StoreIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
