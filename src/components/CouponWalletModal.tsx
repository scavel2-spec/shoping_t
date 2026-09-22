import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  Store as StoreIcon, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { BenefitCoupon, SavedCoupon } from '../types';

interface CouponWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCoupons: SavedCoupon[];
  coupons: BenefitCoupon[];
  onRemoveCoupon: (couponId: string) => void;
  onSelectStore: (storeId: string) => void;
  onOpenFormModal: () => void;
}

export const CouponWalletModal: React.FC<CouponWalletModalProps> = ({
  isOpen,
  onClose,
  savedCoupons,
  coupons,
  onRemoveCoupon,
  onSelectStore,
  onOpenFormModal,
}) => {
  const [selectedActiveCouponId, setSelectedActiveCouponId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const userCouponsWithDetails = savedCoupons
    .map((sc) => {
      const details = coupons.find((c) => c.id === sc.couponId);
      return details ? { ...details, savedAt: sc.savedAt } : null;
    })
    .filter(Boolean) as (BenefitCoupon & { savedAt: number })[];

  const activeCouponForQr = selectedActiveCouponId
    ? userCouponsWithDetails.find((c) => c.id === selectedActiveCouponId) || userCouponsWithDetails[0]
    : userCouponsWithDetails[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                Minha Carteira de Cupons Digitais
              </h2>
              <p className="text-xs text-slate-400">
                Apresente os vouchers diretamente no caixa ou terminal do Shopping Tatuapé
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {userCouponsWithDetails.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                <Ticket className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Nenhum cupom salvo ainda</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Navegue pelo Tour Virtual 360° ou pelo Clube de Benefícios e resgate descontos imperdíveis nas lojas do shopping!
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all"
              >
                Explorar Benefícios Disponíveis
              </button>
            </div>
          ) : (
            <>
              {/* Active QR Code Pass Viewer */}
              {activeCouponForQr && (
                <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-center space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-amber-400 uppercase tracking-wider">
                      Voucher Pronto para Apresentar
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Ativo no Celular
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{activeCouponForQr.title}</h3>
                    <p className="text-xs text-amber-300 font-semibold">{activeCouponForQr.storeName}</p>
                  </div>

                  {/* QR Code Presentation Simulation */}
                  <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center shadow-lg border-4 border-slate-800">
                    <QrCode className="w-36 h-36 text-slate-950" />
                    <span className="text-[10px] font-mono font-bold text-slate-900 mt-1">
                      {activeCouponForQr.code}
                    </span>
                  </div>

                  {/* Code & Copy Box */}
                  <div className="max-w-xs mx-auto flex items-center justify-between bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
                    <span className="font-mono text-sm font-bold text-white tracking-widest">
                      {activeCouponForQr.code}
                    </span>
                    <button
                      onClick={() => handleCopy(activeCouponForQr.code)}
                      className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      {copiedCode === activeCouponForQr.code ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    Apresente este código ou o QR Code ao atendente no momento do pagamento na loja participante.
                  </p>
                </div>
              )}

              {/* List of other saved coupons */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Seus Cupons Salvos ({userCouponsWithDetails.length})
                </h4>

                {userCouponsWithDetails.map((c) => {
                  const isSelected = activeCouponForQr?.id === c.id;

                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedActiveCouponId(c.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-950/40 border-blue-500 shadow-md'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={c.storeLogo}
                          alt={c.storeName}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{c.storeName}</span>
                            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                              {c.discountText}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-1">{c.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveCoupon(c.id);
                          }}
                          className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Remover cupom"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onOpenFormModal}
            className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ganhar brinde respondendo à pesquisa</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Fechar Carteira
          </button>
        </div>
      </div>
    </div>
  );
};
