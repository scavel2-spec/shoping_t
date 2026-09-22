import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Globe, 
  Compass, 
  Gift, 
  Star, 
  ShoppingBag, 
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Store, BenefitCoupon } from '../types';

interface StoreModalProps {
  store: Store | null;
  coupon: BenefitCoupon | null;
  onClose: () => void;
  onJumpToTour: (sceneId: string, storeId?: string) => void;
  onRedeemCoupon: (coupon: BenefitCoupon) => void;
  isCouponSaved: boolean;
}

export const StoreModal: React.FC<StoreModalProps> = ({
  store,
  coupon,
  onClose,
  onJumpToTour,
  onRedeemCoupon,
  isCouponSaved,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!store) return null;

  const allImages = [store.coverImage, ...(store.galleryImages || [])];
  const activeImage = allImages[activeImageIndex] || store.coverImage;

  const whatsappMessage = encodeURIComponent(
    `Olá! Vi a vitrine digital da ${store.name} no Tour Virtual do Shopping Tatuapé e gostaria de saber mais informações.`
  );
  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Close */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-950 overflow-hidden shrink-0">
          <img
            src={activeImage}
            alt={store.name}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-store-modal-btn"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center shadow-lg transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Quick Tour shortcut */}
          <button
            onClick={() => {
              onClose();
              onJumpToTour(store.tourSceneId, store.id);
            }}
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition-all border border-blue-400/40"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ver no Tour 360°</span>
          </button>

          {/* Store identity bottom overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-slate-950 p-1 border-2 border-slate-700 shadow-xl overflow-hidden shrink-0">
                <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
                  {store.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                  <span className="flex items-center gap-1 text-blue-300">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    {store.floorName} • {store.corridor}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{store.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400 font-normal">({store.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Exclusive Benefit Banner in Modal */}
          {coupon && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/10 border border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Benefício Exclusivo Digital
                    </span>
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.2 rounded-full">
                      {coupon.discountText}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{coupon.title}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{coupon.description}</p>
                </div>
              </div>

              <button
                onClick={() => onRedeemCoupon(coupon)}
                id="modal-redeem-coupon-btn"
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md ${
                  isCouponSaved
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-400/30'
                }`}
              >
                {isCouponSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Salvo na Carteira</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Resgatar Cupom</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Sobre a Loja
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{store.description}</p>
          </div>

          {/* Highlight Products Vitrine */}
          {store.highlightProducts && store.highlightProducts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-blue-400" />
                Vitrine Digital em Destaque
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {store.highlightProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
                  >
                    <div className="h-28 w-full rounded-lg overflow-hidden bg-slate-800 mb-2 relative">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      {prod.tag && (
                        <span className="absolute top-1.5 left-1.5 bg-blue-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {prod.tag}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white line-clamp-1">{prod.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-amber-400">{prod.price}</span>
                        {prod.originalPrice && (
                          <span className="text-[10px] text-slate-500 line-through">
                            {prod.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Info & Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{store.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{store.phone}</span>
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl flex flex-col justify-center gap-2">
              {/* WhatsApp direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Atendimento via WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-emerald-400 ml-auto" />
              </a>

              {store.website && (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Site Oficial da Marca</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onJumpToTour(store.tourSceneId, store.id);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/20"
          >
            <Compass className="w-4 h-4" />
            <span>Navegar no Tour 360°</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
