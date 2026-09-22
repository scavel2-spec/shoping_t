export type StoreCategory = 
  | 'todas'
  | 'moda'
  | 'gastronomia'
  | 'tecnologia'
  | 'beleza'
  | 'lazer'
  | 'servicos';

export type FloorId = 'piso-metro' | 'piso-tatuape' | 'piso-superior' | 'praca-alimentacao' | 'boulevard';

export interface Hotspot {
  id: string;
  x: number; // 0 - 100 (%)
  y: number; // 0 - 100 (%)
  title: string;
  type: 'store' | 'floor_change' | 'coupon' | 'info';
  storeId?: string;
  targetSceneId?: string;
  description?: string;
  discountBadge?: string;
}

export interface TourScene {
  id: string;
  title: string;
  subtitle: string;
  floorId: FloorId;
  floorName: string;
  imageUrl: string;
  initialYaw?: number;
  hotspots: Hotspot[];
  highlights: string[];
}

export interface BenefitCoupon {
  id: string;
  storeId: string;
  storeName: string;
  storeLogo: string;
  title: string;
  discountText: string;
  category: StoreCategory;
  description: string;
  rules: string[];
  code: string;
  expiryDate: string;
  badge: string;
  color: string;
  formBonus?: boolean;
}

export interface StoreProduct {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  tag?: string;
}

export interface Store {
  id: string;
  name: string;
  category: StoreCategory;
  floorId: FloorId;
  floorName: string;
  corridor: string;
  logo: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  tags: string[];
  hours: string;
  phone: string;
  whatsapp: string;
  website?: string;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  couponId?: string;
  tourSceneId: string;
  mapCoords: { x: number; y: number };
  highlightProducts: StoreProduct[];
}

export interface FloorInfo {
  id: FloorId;
  name: string;
  tagline: string;
  level: string;
  description: string;
  defaultSceneId: string;
  storesCount: number;
  keyHighlights: string[];
}

export interface SavedCoupon {
  couponId: string;
  savedAt: number;
  code: string;
}
