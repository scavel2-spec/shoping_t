import React, { useState, useEffect, useCallback } from 'react';
import { 
  Compass, 
  Store as StoreIcon, 
  Gift, 
  MapPin, 
  FileSpreadsheet, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Header } from './components/Header';
import { VirtualTour360 } from './components/VirtualTour360';
import { StoreDirectory } from './components/StoreDirectory';
import { StoreModal } from './components/StoreModal';
import { BenefitsClub } from './components/BenefitsClub';
import { CouponWalletModal } from './components/CouponWalletModal';
import { InteractiveFloorMap } from './components/InteractiveFloorMap';
import { GoogleFormModal } from './components/GoogleFormModal';
import { VisitPassport } from './components/VisitPassport';
import { Footer } from './components/Footer';

import { 
  TOUR_SCENES, 
  BENEFIT_COUPONS, 
  STORES, 
  FLOORS, 
  GOOGLE_FORM_URL 
} from './data/shoppingData';
import { TourScene, BenefitCoupon, SavedCoupon } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tour' | 'stores' | 'benefits' | 'map'>('tour');
  const [activeScene, setActiveScene] = useState<TourScene>(TOUR_SCENES[0]);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local storage state initialization
  const [savedCoupons, setSavedCoupons] = useState<SavedCoupon[]>(() => {
    try {
      const stored = localStorage.getItem('tatuape_saved_coupons');
      if (stored) return JSON.parse(stored);
    } catch {}
    // Seed with 1 initial welcome coupon so the user experiences the wallet immediately!
    return [
      {
        couponId: 'cupom-outback',
        savedAt: Date.now(),
        code: 'TATUAPE-CHOPP-VIP'
      }
    ];
  });

  const [visitedSceneIds, setVisitedSceneIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tatuape_visited_scenes');
      if (stored) return JSON.parse(stored);
    } catch {}
    return ['scene-metro-central'];
  });

  const [isVipGiftClaimed, setIsVipGiftClaimed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tatuape_vip_gift_claimed') === 'true';
    } catch {
      return false;
    }
  });

  // Persist saved coupons
  useEffect(() => {
    try {
      localStorage.setItem('tatuape_saved_coupons', JSON.stringify(savedCoupons));
    } catch {}
  }, [savedCoupons]);

  // Persist visited scenes
  useEffect(() => {
    try {
      localStorage.setItem('tatuape_visited_scenes', JSON.stringify(visitedSceneIds));
    } catch {}
  }, [visitedSceneIds]);

  // Record scene visits for passport
  const handleRecordVisit = useCallback((sceneId: string) => {
    setVisitedSceneIds((prev) => {
      if (prev.includes(sceneId)) return prev;
      return [...prev, sceneId];
    });
  }, []);

  // Show Toast
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Coupon handling
  const handleRedeemCoupon = (coupon: BenefitCoupon) => {
    const exists = savedCoupons.some((c) => c.couponId === coupon.id);
    if (!exists) {
      setSavedCoupons((prev) => [
        ...prev,
        { couponId: coupon.id, savedAt: Date.now(), code: coupon.code }
      ]);
      showToast(`Cupom "${coupon.discountText}" salvo na sua carteira com sucesso!`);
    } else {
      showToast(`Cupom "${coupon.discountText}" já está na sua carteira.`);
    }
    setIsWalletOpen(true);
  };

  const handleRemoveCoupon = (couponId: string) => {
    setSavedCoupons((prev) => prev.filter((c) => c.couponId !== couponId));
    showToast('Cupom removido da sua carteira.');
  };

  const handleClaimVipGift = () => {
    setIsVipGiftClaimed(true);
    try {
      localStorage.setItem('tatuape_vip_gift_claimed', 'true');
    } catch {}

    const vipCoupon = BENEFIT_COUPONS.find((c) => c.id === 'cupom-form-vip');
    if (vipCoupon && !savedCoupons.some((c) => c.couponId === vipCoupon.id)) {
      setSavedCoupons((prev) => [
        ...prev,
        { couponId: vipCoupon.id, savedAt: Date.now(), code: vipCoupon.code }
      ]);
    }
    showToast('Parabéns! Seu voucher de Brinde VIP no Concierge foi gerado!');
  };

  // Navigation helpers
  const handleJumpToTourScene = (sceneId: string, storeId?: string) => {
    const scene = TOUR_SCENES.find((s) => s.id === sceneId);
    if (scene) {
      setActiveScene(scene);
      setActiveTab('tour');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (storeId) {
      setSelectedStoreId(storeId);
    }
  };

  const selectedStore = selectedStoreId
    ? STORES.find((s) => s.id === selectedStoreId) || null
    : null;

  const storeLinkedCoupon = selectedStore?.couponId
    ? BENEFIT_COUPONS.find((c) => c.id === selectedStore.couponId) || null
    : null;

  const isStoreCouponSaved = storeLinkedCoupon
    ? savedCoupons.some((c) => c.couponId === storeLinkedCoupon.id)
    : false;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCouponsCount={savedCoupons.length}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenFormModal={() => setIsFormModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        {/* Quick Welcome Hero & Live Links */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span>Experiência Digital &bull; Complexo Shopping Metrô Tatuapé</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Tour Virtual 360° pelas Lojas &amp; Benefícios Exclusivos
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Passeie interativamente pelos corredores do shopping, conheça as vitrines de suas marcas prediletas e garanta descontos e vantagens reservadas para os clientes da plataforma digital.
              </p>

              {/* Form integration banner button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsFormModalOpen(true)}
                  id="hero-forms-cta-btn"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Acessar Pesquisa Oficial &amp; Ganhar Brinde</span>
                </button>

                <button
                  onClick={() => setActiveTab('benefits')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
                >
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span>Ver Cupons Disponíveis ({BENEFIT_COUPONS.length})</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Bento */}
            <div className="grid grid-cols-2 gap-3 w-full lg:w-72 shrink-0">
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-xl sm:text-2xl font-black text-amber-400 block">5 Pisos</span>
                <span className="text-xs text-slate-400">Totalmente mapeados em 360°</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-xl sm:text-2xl font-black text-blue-400 block">+250 Lojas</span>
                <span className="text-xs text-slate-400">Moda, Tech, Gastronomia &amp; Lazer</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block">Linha 3</span>
                <span className="text-xs text-slate-400">Metrô Tatuapé integrado</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
                <span className="text-xl sm:text-2xl font-black text-purple-400 block">Cinemark</span>
                <span className="text-xs text-slate-400">Salas XD &amp; Poltronas Prime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab 1: Virtual Tour 360° View */}
        {activeTab === 'tour' && (
          <section className="space-y-6">
            <VirtualTour360
              scenes={TOUR_SCENES}
              activeScene={activeScene}
              onSelectScene={(scene) => setActiveScene(scene)}
              onSelectStore={(storeId) => setSelectedStoreId(storeId)}
              onOpenFormModal={() => setIsFormModalOpen(true)}
              stores={STORES}
              onRecordVisit={handleRecordVisit}
            />

            {/* Visit Passport Gamification Card */}
            <VisitPassport
              visitedSceneIds={visitedSceneIds}
              scenes={TOUR_SCENES}
              onOpenFormModal={() => setIsFormModalOpen(true)}
              onJumpToTourScene={handleJumpToTourScene}
            />

            {/* Quick Stores Highlight below Tour */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <StoreIcon className="w-5 h-5 text-blue-400" />
                    Lojas em Destaque neste Cenário
                  </h3>
                  <p className="text-xs text-slate-400">
                    Clique para abrir a vitrine ou resgatar o benefício digital.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('stores')}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>Ver todas as lojas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STORES.slice(0, 4).map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStoreId(st.id)}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3.5 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-800">
                        <img
                          src={st.coverImage}
                          alt={st.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 bg-slate-900/90 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-700">
                          {st.floorName}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.logo}
                          alt={st.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                            {st.name}
                          </h4>
                          <p className="text-[10px] text-slate-400">{st.corridor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 mt-2 flex items-center justify-between text-[11px]">
                      {st.couponId ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          Cupom Ativo
                        </span>
                      ) : (
                        <span className="text-slate-400">Vitrine Digital</span>
                      )}
                      <span className="text-blue-400 font-medium group-hover:underline">
                        Explorar &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Store Directory & Vitrines */}
        {activeTab === 'stores' && (
          <StoreDirectory
            stores={STORES}
            coupons={BENEFIT_COUPONS}
            onSelectStore={(storeId) => setSelectedStoreId(storeId)}
            onJumpToTourScene={handleJumpToTourScene}
            onSelectCoupon={(couponId) => {
              const coupon = BENEFIT_COUPONS.find((c) => c.id === couponId);
              if (coupon) handleRedeemCoupon(coupon);
            }}
          />
        )}

        {/* Tab 3: Benefits & Coupons Club */}
        {activeTab === 'benefits' && (
          <BenefitsClub
            coupons={BENEFIT_COUPONS}
            savedCouponIds={savedCoupons.map((c) => c.couponId)}
            onRedeemCoupon={handleRedeemCoupon}
            onOpenFormModal={() => setIsFormModalOpen(true)}
            onSelectStore={(storeId) => setSelectedStoreId(storeId)}
          />
        )}

        {/* Tab 4: Interactive Floor Map */}
        {activeTab === 'map' && (
          <InteractiveFloorMap
            floors={FLOORS}
            stores={STORES}
            onSelectStore={(storeId) => setSelectedStoreId(storeId)}
            onJumpToTour={(sceneId, storeId) => handleJumpToTourScene(sceneId, storeId)}
          />
        )}
      </main>

      {/* Store Details Modal */}
      <StoreModal
        store={selectedStore}
        coupon={storeLinkedCoupon}
        onClose={() => setSelectedStoreId(null)}
        onJumpToTour={(sceneId, storeId) => {
          setSelectedStoreId(null);
          handleJumpToTourScene(sceneId, storeId);
        }}
        onRedeemCoupon={handleRedeemCoupon}
        isCouponSaved={isStoreCouponSaved}
      />

      {/* Coupon Wallet Modal */}
      <CouponWalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        savedCoupons={savedCoupons}
        coupons={BENEFIT_COUPONS}
        onRemoveCoupon={handleRemoveCoupon}
        onSelectStore={(storeId) => {
          setIsWalletOpen(false);
          setSelectedStoreId(storeId);
        }}
        onOpenFormModal={() => {
          setIsWalletOpen(false);
          setIsFormModalOpen(true);
        }}
      />

      {/* Google Form Modal */}
      <GoogleFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onClaimVipGift={handleClaimVipGift}
        isVipGiftClaimed={isVipGiftClaimed}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenFormModal={() => setIsFormModalOpen(true)}
      />
    </div>
  );
}
