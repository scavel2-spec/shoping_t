import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Store as StoreIcon, 
  Gift, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Compass, 
  Star, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { Store, StoreCategory, FloorId, BenefitCoupon } from '../types';

interface StoreDirectoryProps {
  stores: Store[];
  coupons: BenefitCoupon[];
  onSelectStore: (storeId: string) => void;
  onJumpToTourScene: (sceneId: string, storeId?: string) => void;
  onSelectCoupon: (couponId: string) => void;
}

export const StoreDirectory: React.FC<StoreDirectoryProps> = ({
  stores,
  coupons,
  onSelectStore,
  onJumpToTourScene,
  onSelectCoupon,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('todas');
  const [selectedFloor, setSelectedFloor] = useState<FloorId | 'todos'>('todos');
  const [onlyWithCoupon, setOnlyWithCoupon] = useState<boolean>(false);

  const categories: { id: StoreCategory; label: string }[] = [
    { id: 'todas', label: 'Todas as Lojas' },
    { id: 'gastronomia', label: 'Gastronomia & Cafés' },
    { id: 'moda', label: 'Moda & Acessórios' },
    { id: 'tecnologia', label: 'Tecnologia & Games' },
    { id: 'beleza', label: 'Beleza & Joalherias' },
    { id: 'lazer', label: 'Cinema & Lazer' },
    { id: 'servicos', label: 'Serviços & Conveniência' },
  ];

  const floors: { id: FloorId | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos os Pisos' },
    { id: 'piso-metro', label: 'Piso Metrô' },
    { id: 'piso-tatuape', label: 'Piso Tatuapé' },
    { id: 'piso-superior', label: 'Piso Superior' },
    { id: 'praca-alimentacao', label: 'Praça de Alimentação' },
    { id: 'boulevard', label: 'Boulevard & Cinema' },
  ];

  // Filtered stores list
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      // Search term
      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        store.name.toLowerCase().includes(search) ||
        store.description.toLowerCase().includes(search) ||
        store.tags.some((t) => t.toLowerCase().includes(search)) ||
        store.highlightProducts.some((p) => p.name.toLowerCase().includes(search));

      // Category
      const matchesCategory = selectedCategory === 'todas' || store.category === selectedCategory;

      // Floor
      const matchesFloor = selectedFloor === 'todos' || store.floorId === selectedFloor;

      // Coupon requirement
      const matchesCoupon = !onlyWithCoupon || !!store.couponId;

      return matchesSearch && matchesCategory && matchesFloor && matchesCoupon;
    });
  }, [stores, searchTerm, selectedCategory, selectedFloor, onlyWithCoupon]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <StoreIcon className="w-6 h-6 text-blue-400" />
              Lojas &amp; Vitrines Virtuais
            </h2>
            <p className="text-sm text-slate-400">
              Explore o guia completo das melhores marcas do Complexo Shopping Tatuapé com benefícios online.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              id="store-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar loja, produto, comida..."
              className="w-full bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filters Bar: Floors and Coupon toggle */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Floor selection */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Filtrar por Piso:
            </span>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value as FloorId | 'todos')}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
            >
              {floors.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle with coupon */}
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
            <input
              type="checkbox"
              checked={onlyWithCoupon}
              onChange={(e) => setOnlyWithCoupon(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-900 w-4 h-4"
            />
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Apenas lojas com Cupom Digital Ativo
            </span>
          </label>
        </div>
      </div>

      {/* Stores Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Exibindo <strong>{filteredStores.length}</strong> de {stores.length} lojas
        </span>
        {(searchTerm || selectedCategory !== 'todas' || selectedFloor !== 'todos' || onlyWithCoupon) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
              setSelectedFloor('todos');
              setOnlyWithCoupon(false);
            }}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Redefinir filtros
          </button>
        )}
      </div>

      {/* Store Cards Grid */}
      {filteredStores.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
          <StoreIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">Nenhuma loja encontrada</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            Tente buscar com outros termos ou redefinir os filtros de piso e categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStores.map((store) => {
            const linkedCoupon = store.couponId
              ? coupons.find((c) => c.id === store.couponId)
              : null;

            return (
              <div
                key={store.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Store Cover Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                  <img
                    src={store.coverImage}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Floor Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-300 border border-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    {store.floorName}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-amber-400 border border-slate-700 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {store.rating.toFixed(1)}
                  </div>

                  {/* Store Logo floating over bottom */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 p-1 border-2 border-slate-700 shadow-md overflow-hidden shrink-0">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight drop-shadow-md">
                        {store.name}
                      </h3>
                      <p className="text-[11px] text-slate-300 line-clamp-1">{store.corridor}</p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Exclusive Digital Benefit Banner if available */}
                    {linkedCoupon && (
                      <div
                        onClick={() => onSelectCoupon(linkedCoupon.id)}
                        className="mb-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-500/40 text-amber-300 hover:border-amber-400 transition-colors cursor-pointer flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-amber-300 block leading-tight">
                              {linkedCoupon.discountText}
                            </span>
                            <span className="text-[10px] text-slate-300 block line-clamp-1">
                              {linkedCoupon.title}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md whitespace-nowrap">
                          Ver Cupom
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {store.description}
                    </p>

                    {/* Product highlights / Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {store.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    {/* View in 360 Tour */}
                    <button
                      onClick={() => onJumpToTourScene(store.tourSceneId, store.id)}
                      id={`jump-tour-${store.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all hover:border-blue-400"
                      title="Abrir no Tour Virtual 360°"
                    >
                      <Compass className="w-3.5 h-3.5 text-blue-400" />
                      <span>Tour 360°</span>
                    </button>

                    {/* Store details */}
                    <button
                      onClick={() => onSelectStore(store.id)}
                      id={`open-store-${store.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold transition-all"
                    >
                      <span>Ver Vitrine</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
