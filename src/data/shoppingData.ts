import { FloorInfo, TourScene, BenefitCoupon, Store } from '../types';

export const GOOGLE_FORM_URL = 'https://forms.gle/98VL3aV8S9Nop1866';

export const FLOORS: FloorInfo[] = [
  {
    id: 'piso-metro',
    name: 'Piso Metrô',
    tagline: 'Conexão direta à Estação Tatuapé e conveniência ágil',
    level: 'Subsolo / Nível Estação',
    description: 'Acesso rápido pelo metrô Linha 3-Vermelha e Terminal de Ônibus. Concentra grandes lojas de departamentos, cafés, farmácias, serviços expressos e alta circulação.',
    defaultSceneId: 'scene-metro-central',
    storesCount: 48,
    keyHighlights: ['Acesso direto Linha Vermelha', 'Cafeterias & Lanches Rápidos', 'Serviços Financeiros & Telefonia', 'Lojas Âncoras']
  },
  {
    id: 'piso-tatuape',
    name: 'Piso Tatuapé',
    tagline: 'O coração da moda, perfumaria e joalherias nobres',
    level: 'Térreo Principal',
    description: 'Alamedas arborizadas com as principais marcas nacionais e internacionais de moda feminina, masculina, joias finas, óticas e cosméticos.',
    defaultSceneId: 'scene-alameda-grifes',
    storesCount: 65,
    keyHighlights: ['Alameda de Grifes', 'Joalherias Renomadas', 'Perfumaria Internacional', 'Lounge VIP']
  },
  {
    id: 'piso-superior',
    name: 'Piso Superior',
    tagline: 'Tecnologia, eletrônicos, calçados e moda jovem',
    level: '1º Pavimento',
    description: 'Espaço dedicado à inovação tecnológica, eletroeletrônicos premium, lojas especializadas de calçados esportivos, vestuário casual e livrarias.',
    defaultSceneId: 'scene-tech-hall',
    storesCount: 52,
    keyHighlights: ['Mega Lojas de Tecnologia', 'Moda Esportiva & Streetwear', 'Livraria & Papelaria', 'Espaço Gamer']
  },
  {
    id: 'praca-alimentacao',
    name: 'Praça de Alimentação',
    tagline: 'Experiências gastronômicas para todos os paladares',
    level: '2º Pavimento',
    description: 'Ampla área gourmet climatizada com mais de 30 opções gastronômicas, desde os favoritos do fast food até refeições completas, grelhados e sobremesas artesanais.',
    defaultSceneId: 'scene-gourmet-hub',
    storesCount: 38,
    keyHighlights: ['Culinária Internacional', 'Grelhados & Carnes Nobres', 'Sobremesas & Gelaterias', 'Mais de 1.200 lugares']
  },
  {
    id: 'boulevard',
    name: 'Boulevard & Cinema',
    tagline: 'Lazer completo, Cinemark XD e restaurantes temáticos',
    level: 'Complexo Boulevard / 3º Pavimento',
    description: 'Atmosfera descontraída com salas de cinema Cinemark de última geração (XD e Prime), restaurantes temáticos exclusivos, área infantil e teatro.',
    defaultSceneId: 'scene-boulevard-cinemark',
    storesCount: 22,
    keyHighlights: ['Cinemark com Salas XD & Prime', 'Outback Steakhouse & Madero', 'Teatro & Espaço Kids', 'Varanda Panorâmica']
  }
];

export const TOUR_SCENES: TourScene[] = [
  {
    id: 'scene-metro-central',
    title: 'Átrio Central Metrô',
    subtitle: 'Conexão direta com a Linha 3-Vermelha',
    floorId: 'piso-metro',
    floorName: 'Piso Metrô',
    // Wide panoramic architectural perspective of modern shopping corridor
    imageUrl: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2000&auto=format&fit=crop',
    initialYaw: 0,
    highlights: ['Renner Mega Store', 'Starbucks Café', 'Acesso Linha 3 do Metrô', 'Quiosque de Atendimento'],
    hotspots: [
      {
        id: 'hs-renner',
        x: 24,
        y: 45,
        title: 'Lojas Renner',
        type: 'store',
        storeId: 'renner-metro',
        description: '3 andares com as últimas tendências em moda e acessórios.',
        discountBadge: '15% OFF Plataforma'
      },
      {
        id: 'hs-starbucks',
        x: 58,
        y: 52,
        title: 'Starbucks Coffee',
        type: 'store',
        storeId: 'starbucks-metro',
        description: 'Frappuccinos, cafés especiais e pastries frescos.',
        discountBadge: 'Upgrade de Tamanho Grátis'
      },
      {
        id: 'hs-trans-tatuape',
        x: 82,
        y: 42,
        title: 'Escadas Rolantes → Piso Tatuapé',
        type: 'floor_change',
        targetSceneId: 'scene-alameda-grifes',
        description: 'Subir para o Piso Tatuapé e Alameda das Grifes'
      },
      {
        id: 'hs-form-promo-1',
        x: 42,
        y: 65,
        title: 'Totem Digital: Formulário & Benefício VIP',
        type: 'coupon',
        description: 'Responda a pesquisa oficial do Shopping e desbloqueie brinde exclusivo.',
        discountBadge: 'Benefício VIP'
      }
    ]
  },
  {
    id: 'scene-alameda-grifes',
    title: 'Alameda das Grifes & Joalherias',
    subtitle: 'Piso Tatuapé - Elegância e Alta Perfumaria',
    floorId: 'piso-tatuape',
    floorName: 'Piso Tatuapé',
    imageUrl: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=2000&auto=format&fit=crop',
    initialYaw: 15,
    highlights: ['Vivara Joias', 'Zara', 'Sephora Cosméticos', 'Lounge de Conforto'],
    hotspots: [
      {
        id: 'hs-vivara',
        x: 32,
        y: 48,
        title: 'Vivara Joalheria',
        type: 'store',
        storeId: 'vivara-tatuape',
        description: 'Joias icônicas em ouro, prata e a linha Life by Vivara.',
        discountBadge: '20% OFF Joias Selecionadas'
      },
      {
        id: 'hs-zara',
        x: 68,
        y: 44,
        title: 'Zara Flagship',
        type: 'store',
        storeId: 'zara-tatuape',
        description: 'Coleção internacional contemporânea masculina, feminina e kids.',
        discountBadge: 'Voucher R$ 40 OFF'
      },
      {
        id: 'hs-sephora',
        x: 85,
        y: 54,
        title: 'Sephora Beauty',
        type: 'store',
        storeId: 'sephora-tatuape',
        description: 'Perfumaria, maquiagens e marcas importadas consagradas.',
        discountBadge: 'Brinde Especial em Compras'
      },
      {
        id: 'hs-trans-superior',
        x: 12,
        y: 40,
        title: 'Acesso Elevador Panorâmico → Piso Superior',
        type: 'floor_change',
        targetSceneId: 'scene-tech-hall',
        description: 'Ir ao Piso Superior de Tecnologia & Esportes'
      }
    ]
  },
  {
    id: 'scene-tech-hall',
    title: 'Hall de Tecnologia & Inovação',
    subtitle: 'Piso Superior - Eletrônicos, Games e Esportes',
    floorId: 'piso-superior',
    floorName: 'Piso Superior',
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2000&auto=format&fit=crop',
    initialYaw: -10,
    highlights: ['Fast Shop', 'Samsung Experience Store', 'Centauro Esportes', 'iPlace Apple Reseller'],
    hotspots: [
      {
        id: 'hs-fastshop',
        x: 28,
        y: 46,
        title: 'Fast Shop',
        type: 'store',
        storeId: 'fast-shop-tatuape',
        description: 'Smart TVs, smartphones, notebooks e eletrodomésticos premium.',
        discountBadge: '15% OFF em Acessórios'
      },
      {
        id: 'hs-samsung',
        x: 64,
        y: 48,
        title: 'Samsung Smart Store',
        type: 'store',
        storeId: 'samsung-tatuape',
        description: 'Linha Galaxy, dobráveis, tablets e Galaxy Watch com experimentação.',
        discountBadge: 'Capa Original Grátis'
      },
      {
        id: 'hs-trans-gourmet',
        x: 88,
        y: 40,
        title: 'Rumo à Praça de Alimentação',
        type: 'floor_change',
        targetSceneId: 'scene-gourmet-hub',
        description: 'Subir ao polo gastronômico'
      }
    ]
  },
  {
    id: 'scene-gourmet-hub',
    title: 'Praça de Alimentação Panorâmica',
    subtitle: 'Mais de 30 opções gastronômicas com vista',
    floorId: 'praca-alimentacao',
    floorName: 'Praça de Alimentação',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop',
    initialYaw: 25,
    highlights: ['Mania de Churrasco', 'Bacio di Latte', 'Spoleto Pasta', 'Madero Burger'],
    hotspots: [
      {
        id: 'hs-baciodilatte',
        x: 26,
        y: 53,
        title: 'Bacio di Latte',
        type: 'store',
        storeId: 'bacio-di-latte',
        description: 'Gelatos italianos artesanais com ingredientes importados.',
        discountBadge: 'Sorvete P Grátis na compra de M'
      },
      {
        id: 'hs-maniachurrasco',
        x: 62,
        y: 46,
        title: 'Mania de Churrasco PRIME',
        type: 'store',
        storeId: 'mania-churrasco',
        description: 'Cortes nobres grelhados no fogo forte e acompanhamentos tradicionais.',
        discountBadge: 'Bebida Refil Grátis no Combo'
      },
      {
        id: 'hs-trans-boulevard',
        x: 85,
        y: 42,
        title: 'Passarela Boulevard & Cinema',
        type: 'floor_change',
        targetSceneId: 'scene-boulevard-cinemark',
        description: 'Acessar Cinemark XD, Outback e Lazer'
      }
    ]
  },
  {
    id: 'scene-boulevard-cinemark',
    title: 'Boulevard de Lazer & Cinemark',
    subtitle: 'Complexo Boulevard - Cinema XD e Gastronomia Casual',
    floorId: 'boulevard',
    floorName: 'Boulevard & Cinema',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop',
    initialYaw: 0,
    highlights: ['Cinemark Salas XD & Prime', 'Outback Steakhouse', 'Teatro Infantil', 'Varanda Lounge'],
    hotspots: [
      {
        id: 'hs-outback',
        x: 30,
        y: 48,
        title: 'Outback Steakhouse',
        type: 'store',
        storeId: 'outback-tatuape',
        description: 'Ribs on the Barbie, Bloomin Onion e chopp na caneca congelada.',
        discountBadge: 'Chopp na Caneca Grátis'
      },
      {
        id: 'hs-cinemark',
        x: 70,
        y: 45,
        title: 'Cinemark Complexo Tatuapé',
        type: 'store',
        storeId: 'cinemark-tatuape',
        description: 'Salas com som Dolby Atmos, telas XD gigantes e poltronas D-BOX.',
        discountBadge: 'Combo Pipoca + Bebida por R$ 32'
      }
    ]
  }
];

export const BENEFIT_COUPONS: BenefitCoupon[] = [
  {
    id: 'cupom-outback',
    storeId: 'outback-tatuape',
    storeName: 'Outback Steakhouse',
    storeLogo: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop',
    title: 'Chopp 340ml na Caneca Congelada de Cortesia',
    discountText: 'Chopp Grátis',
    category: 'gastronomia',
    description: 'Na compra de qualquer aperitivo ou prato principal no Outback Boulevard Tatuapé, ganhe um Chopp Brahma 340ml na tradicional caneca congelada.',
    rules: [
      'Válido de segunda a sexta-feira no Shopping Metrô Boulevard Tatuapé.',
      'Limite de 1 cupom por mesa/CPF cadastrado.',
      'Apresentar este voucher digital diretamente no smartphone ao garçom antes de pedir a conta.',
      'Não cumulativo com horário de Billabong Hour ou outras promoções vigentes.'
    ],
    code: 'TATUAPE-CHOPP-VIP',
    expiryDate: 'Válido até 31/12/2026',
    badge: 'Mais Resgatado',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'cupom-vivara',
    storeId: 'vivara-tatuape',
    storeName: 'Vivara Joias',
    storeLogo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=200&auto=format&fit=crop',
    title: '20% OFF em Joias de Prata & Coleção Life by Vivara',
    discountText: '20% OFF',
    category: 'beleza',
    description: 'Desconto exclusivo da plataforma digital para berloques, pulseiras Life e anéis selecionados na unidade Shopping Metrô Tatuapé.',
    rules: [
      'Válido na loja física do Shopping Tatuapé (Piso Tatuapé).',
      'Desconto aplicável em peças de prata selecionadas e berloques Life.',
      'Necessário apresentar o código gerado no momento do pagamento.',
      'Válido para 1 compra por cliente cadastrado.'
    ],
    code: 'VIVARA20-DIGITAL',
    expiryDate: 'Válido até 31/12/2026',
    badge: 'Exclusivo Digital',
    color: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'cupom-fastshop',
    storeId: 'fast-shop-tatuape',
    storeName: 'Fast Shop',
    storeLogo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=200&auto=format&fit=crop',
    title: '15% OFF em Fones Bluetooth, Caixas de Som e Cabos',
    discountText: '15% OFF Tech',
    category: 'tecnologia',
    description: 'Aproveite descontos especiais em acessórios das melhores marcas de áudio e proteção de celulares (JBL, Samsung, Apple, Sony).',
    rules: [
      'Válido exclusivamente na unidade Shopping Metrô Tatuapé (Piso Superior).',
      'Desconto válido para acessórios participantes identificados com selo.',
      'Pagamento via PIX, Débito ou até 3x no cartão de crédito.'
    ],
    code: 'FAST-TECH15-TAT',
    expiryDate: 'Válido até 31/12/2026',
    badge: 'Tecnologia',
    color: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'cupom-cinemark',
    storeId: 'cinemark-tatuape',
    storeName: 'Cinemark Complexo Tatuapé',
    storeLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200&auto=format&fit=crop',
    title: 'Super Combo Pipoca Média + Bebida por R$ 29,90',
    discountText: 'Preço Especial R$ 29,90',
    category: 'lazer',
    description: 'Pipoca quentinha com manteiga e refrigerante refil na bomboniere do Cinemark Boulevard Tatuapé.',
    rules: [
      'Resgate válido na bomboniere física do Cinemark Boulevard Tatuapé.',
      'Apresentar o QR Code gerado na tela do seu celular no caixa.',
      'Válido para qualquer sessão de cinema de domingo a domingo.'
    ],
    code: 'CINEMARK-COMBO-TAT',
    expiryDate: 'Válido até 31/12/2026',
    badge: 'Cinema & Pipoca',
    color: 'from-rose-600 to-red-800'
  },
  {
    id: 'cupom-bacio',
    storeId: 'bacio-di-latte',
    storeName: 'Bacio di Latte Gelato',
    storeLogo: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=200&auto=format&fit=crop',
    title: 'Copo Pequeno Cortesia na Compra de um Copo Médio',
    discountText: 'Gelato Cortesia',
    category: 'gastronomia',
    description: 'Compre 1 Gelato tamanho Médio (até 3 sabores) e ganhe 1 Gelato tamanho Pequeno para presentear quem está com você!',
    rules: [
      'Válido no quiosque e loja Bacio di Latte no Shopping Metrô Tatuapé.',
      'Válido de segunda a quinta-feira durante o horário de funcionamento.',
      'Apresentar este voucher ativo da plataforma.'
    ],
    code: 'BACIO-DOPPIO-TAT',
    expiryDate: 'Válido até 31/12/2026',
    badge: 'Doçura em Dobro',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'cupom-estacionamento',
    storeId: 'servico-estacionamento',
    storeName: 'Estacionamento Shopping Tatuapé',
    storeLogo: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=200&auto=format&fit=crop',
    title: 'Primeira Hora de Estacionamento Gratuita',
    discountText: '1ª Hora Grátis',
    category: 'servicos',
    description: 'Estacione com conforto nos pisos G1, G2 ou G3 do Complexo Tatuapé e garanta isenção da primeira hora ao validar compras a partir de R$ 80.',
    rules: [
      'Válido no guichê de validação presencial do Piso Tatuapé ou aplicativo oficial.',
      'Apresentar comprovante de compra nas lojas participantes + cupom digital.',
      'Válido para carros de passeio de segunda a sexta-feira.'
    ],
    code: 'ESTAC-1H-GRATIS',
    expiryDate: 'Válido até 31/12/2026',
    badge: 'Mobilidade & Conforto',
    color: 'from-slate-700 to-cyan-900'
  },
  {
    id: 'cupom-form-vip',
    storeId: 'clube-digital-vip',
    storeName: 'Clube VIP Digital & Pesquisa',
    storeLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=200&auto=format&fit=crop',
    title: 'Brinde Especial no SAC / Concierge após preencher formulário',
    discountText: 'Brinde Exclusivo',
    category: 'servicos',
    description: 'Responda ao formulário oficial de avaliação e sugestões do Shopping Tatuapé e retire uma Ecobag personalizada exclusiva ou garrafa térmica no Concierge.',
    rules: [
      'Basta preencher o formulário Google Forms oficial no link disponibilizado.',
      'Apresentar a tela de envio concluído no Concierge (Piso Tatuapé).',
      'Disponível 1 brinde por CPF enquanto durarem os estoques mensais.'
    ],
    code: 'FORMS-VIP-TATUAPE',
    expiryDate: 'Válido até 31/12/2026',
    badge: 'Bônus do Formulário',
    color: 'from-purple-700 to-pink-700',
    formBonus: true
  }
];

export const STORES: Store[] = [
  {
    id: 'outback-tatuape',
    name: 'Outback Steakhouse',
    category: 'gastronomia',
    floorId: 'boulevard',
    floorName: 'Boulevard & Cinema',
    corridor: 'Boulevard Gastronômico, Lj. 410',
    logo: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Restaurante de temática australiana famoso por cortes suculentos como a Ribs on the Barbie, a tradicional cebola gigante Bloomin Onion e chopp super gelado.',
    tags: ['Carnes Nobres', 'Costelinha', 'Chopp', 'Ambiente Familiar', 'Happy Hour'],
    hours: 'Seg a Sex: 11h30 às 23h • Sáb e Dom: 12h às 23h',
    phone: '(11) 2092-4400',
    whatsapp: '5511999994400',
    website: 'https://www.outback.com.br',
    rating: 4.9,
    reviewsCount: 3840,
    featured: true,
    couponId: 'cupom-outback',
    tourSceneId: 'scene-boulevard-cinemark',
    mapCoords: { x: 30, y: 48 },
    highlightProducts: [
      { name: 'Bloomin Onion Tradicional', price: 'R$ 64,90', image: 'https://images.unsplash.com/photo-1625938145744-e380515399b7?q=80&w=400&auto=format&fit=crop', tag: 'Mais Pedido' },
      { name: 'Ribs on the Barbie com Batatas', price: 'R$ 109,90', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', tag: 'Destaque' },
      { name: 'Chopp Brahma Caneca Congelada', price: 'R$ 19,90', originalPrice: 'R$ 19,90', image: 'https://images.unsplash.com/photo-1608270191778-9e67272a831e?q=80&w=400&auto=format&fit=crop', tag: 'Grátis no Cupom' }
    ]
  },
  {
    id: 'vivara-tatuape',
    name: 'Vivara Joalheria',
    category: 'beleza',
    floorId: 'piso-tatuape',
    floorName: 'Piso Tatuapé',
    corridor: 'Alameda Principal, Lj. 214',
    logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A maior rede de joalherias do Brasil com peças atemporais em ouro, diamantes, relógios suíços e a cobiçada linha Life by Vivara com berloques temáticos.',
    tags: ['Joias', 'Alianças', 'Prata', 'Relógios', 'Life by Vivara'],
    hours: 'Seg a Sáb: 10h às 22h • Dom: 14h às 20h',
    phone: '(11) 2092-7711',
    whatsapp: '5511999997711',
    website: 'https://www.vivara.com.br',
    rating: 4.8,
    reviewsCount: 1420,
    featured: true,
    couponId: 'cupom-vivara',
    tourSceneId: 'scene-alameda-grifes',
    mapCoords: { x: 32, y: 48 },
    highlightProducts: [
      { name: 'Pulseira Life Prata 925', price: 'R$ 410,00', originalPrice: 'R$ 510,00', image: 'https://images.unsplash.com/photo-1611591475871-6f4e66299f2e?q=80&w=400&auto=format&fit=crop', tag: '20% OFF' },
      { name: 'Berloque São Paulo / Coração', price: 'R$ 190,00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop' },
      { name: 'Anel Solitário Ouro 18k e Diamante', price: 'R$ 1.890,00', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'fast-shop-tatuape',
    name: 'Fast Shop',
    category: 'tecnologia',
    floorId: 'piso-superior',
    floorName: 'Piso Superior',
    corridor: 'Ala Tech, Lj. 302',
    logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Referência em eletrônicos de ponta, eletrodomésticos de alto padrão, televisores OLED, áudio premium e suporte técnico personalizado para sua casa conectada.',
    tags: ['Smartphones', 'TVs OLED', 'Notebooks', 'Caixas de Som', 'Eletro'],
    hours: 'Seg a Sáb: 10h às 22h • Dom: 14h às 20h',
    phone: '(11) 2092-9100',
    whatsapp: '5511999999100',
    website: 'https://www.fastshop.com.br',
    rating: 4.7,
    reviewsCount: 2190,
    featured: true,
    couponId: 'cupom-fastshop',
    tourSceneId: 'scene-tech-hall',
    mapCoords: { x: 28, y: 46 },
    highlightProducts: [
      { name: 'Fone Noise Cancelling JBL Live Pro 2', price: 'R$ 749,00', originalPrice: 'R$ 880,00', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop', tag: '15% OFF' },
      { name: 'Smart TV OLED 55" 4K 120Hz', price: 'R$ 4.999,00', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400&auto=format&fit=crop' },
      { name: 'Air Fryer Digital Inox 5L', price: 'R$ 599,00', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'cinemark-tatuape',
    name: 'Cinemark Shopping Tatuapé',
    category: 'lazer',
    floorId: 'boulevard',
    floorName: 'Boulevard & Cinema',
    corridor: 'Complexo Boulevard, 3º Andar',
    logo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'O melhor do cinema com projeção a laser em altíssima definição, som imersivo Dolby Atmos nas salas XD e todo conforto das poltronas reclináveis Prime e D-BOX.',
    tags: ['Filmes', 'Salas XD', 'Pipoca Gourmet', 'Poltronas D-BOX', 'Pré-estreias'],
    hours: 'Seg a Dom: 13h às 23h30',
    phone: '(11) 2092-2300',
    whatsapp: '5511999992300',
    website: 'https://www.cinemark.com.br',
    rating: 4.8,
    reviewsCount: 5200,
    featured: true,
    couponId: 'cupom-cinemark',
    tourSceneId: 'scene-boulevard-cinemark',
    mapCoords: { x: 70, y: 45 },
    highlightProducts: [
      { name: 'Combo Pipoca Média + Refrigerante', price: 'R$ 29,90', originalPrice: 'R$ 44,00', image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=400&auto=format&fit=crop', tag: 'Voucher Ativo' },
      { name: 'Ingresso Sala XD Laser 3D', price: 'R$ 42,00', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'zara-tatuape',
    name: 'Zara Flagship',
    category: 'moda',
    floorId: 'piso-tatuape',
    floorName: 'Piso Tatuapé',
    corridor: 'Alameda Principal, Ljs. 220 a 228',
    logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Moda global com novidades semanais em alfaiataria, peças casuais refinadas, calçados e fragrâncias icônicas para todos os estilos.',
    tags: ['Moda Feminina', 'Alfaiataria', 'Moda Masculina', 'Sapatos', 'Bolsas'],
    hours: 'Seg a Sáb: 10h às 22h • Dom: 14h às 20h',
    phone: '(11) 2092-8000',
    whatsapp: '5511999998000',
    website: 'https://www.zara.com/br',
    rating: 4.6,
    reviewsCount: 3100,
    featured: true,
    tourSceneId: 'scene-alameda-grifes',
    mapCoords: { x: 68, y: 44 },
    highlightProducts: [
      { name: 'Blazer Estruturado em Linho', price: 'R$ 379,00', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop' },
      { name: 'Vestido Midi Plissado', price: 'R$ 299,00', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'renner-metro',
    name: 'Lojas Renner',
    category: 'moda',
    floorId: 'piso-metro',
    floorName: 'Piso Metrô',
    corridor: 'Acesso Metrô Tatuapé, Lj. 101',
    logo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Três pavimentos com o melhor da moda urbana, casual, esportiva, lingerie e perfumes com praticidade e ótimo custo-benefício.',
    tags: ['Fast Fashion', 'Denim', 'Infantil', 'Beleza', 'Acessórios'],
    hours: 'Seg a Sáb: 10h às 22h • Dom: 14h às 20h',
    phone: '(11) 2092-3300',
    whatsapp: '5511999993300',
    website: 'https://www.lojasrenner.com.br',
    rating: 4.7,
    reviewsCount: 4600,
    featured: false,
    tourSceneId: 'scene-metro-central',
    mapCoords: { x: 24, y: 45 },
    highlightProducts: [
      { name: 'Jaqueta Jeans Oversized', price: 'R$ 179,90', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'starbucks-metro',
    name: 'Starbucks Café',
    category: 'gastronomia',
    floorId: 'piso-metro',
    floorName: 'Piso Metrô',
    corridor: 'Hall do Metrô, Lj. 140',
    logo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Ponto de encontro ideal para degustar cafés espresso, frappuccinos artesanais, cookies americanos e sanduíches quentes.',
    tags: ['Cafeteria', 'Frappuccino', 'Wi-Fi', 'Espaço Trabalho', 'Doces'],
    hours: 'Seg a Sáb: 07h às 22h • Dom: 08h às 20h',
    phone: '(11) 2092-5500',
    whatsapp: '5511999995500',
    website: 'https://www.starbucks.com.br',
    rating: 4.7,
    reviewsCount: 2890,
    featured: false,
    tourSceneId: 'scene-metro-central',
    mapCoords: { x: 58, y: 52 },
    highlightProducts: [
      { name: 'Caramel Macchiato Grande', price: 'R$ 22,50', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'bacio-di-latte',
    name: 'Bacio di Latte',
    category: 'gastronomia',
    floorId: 'praca-alimentacao',
    floorName: 'Praça de Alimentação',
    corridor: 'Ala Central da Praça, Q-12',
    logo: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Gelateria genuína de inspiração italiana com sabores cremosos como Pistacchio, Bacio di Latte clássico, Gianduia e maracujá refrescante.',
    tags: ['Gelato', 'Sorvete', 'Sobremesa', 'Pistache Artesanal'],
    hours: 'Seg a Dom: 10h às 22h',
    phone: '(11) 2092-1200',
    whatsapp: '5511999991200',
    website: 'https://www.baciodilatte.com.br',
    rating: 4.9,
    reviewsCount: 3940,
    featured: true,
    couponId: 'cupom-bacio',
    tourSceneId: 'scene-gourmet-hub',
    mapCoords: { x: 26, y: 53 },
    highlightProducts: [
      { name: 'Coppetta Média (3 Sabores)', price: 'R$ 24,00', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=400&auto=format&fit=crop', tag: 'Com Cupom Ganha Pequeno' }
    ]
  },
  {
    id: 'mania-churrasco',
    name: 'Mania de Churrasco PRIME',
    category: 'gastronomia',
    floorId: 'praca-alimentacao',
    floorName: 'Praça de Alimentação',
    corridor: 'Praça Gourmet, Lj. 280',
    logo: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'O verdadeiro churrasco gaúcho com picanha nobre, fraldinha fatiada e acompanhamentos lendários como arroz biro-biro e farofa crocante.',
    tags: ['Churrasco', 'Picanha', 'Grelhados', 'Almoço Executivo'],
    hours: 'Seg a Dom: 11h às 22h',
    phone: '(11) 2092-6688',
    whatsapp: '5511999996688',
    website: 'https://www.maniadechurrasco.com.br',
    rating: 4.7,
    reviewsCount: 2750,
    featured: false,
    tourSceneId: 'scene-gourmet-hub',
    mapCoords: { x: 62, y: 46 },
    highlightProducts: [
      { name: 'Prato Picanha Nobre + Biro-Biro', price: 'R$ 54,90', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'sephora-tatuape',
    name: 'Sephora Cosméticos',
    category: 'beleza',
    floorId: 'piso-tatuape',
    floorName: 'Piso Tatuapé',
    corridor: 'Alameda das Grifes, Lj. 235',
    logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'O templo da beleza com marcas consagradas como Dior, Rare Beauty, Fenty Beauty, NARS e estações de teste de maquiagem gratuita com especialistas.',
    tags: ['Maquiagem', 'Perfumaria Importada', 'Skincare', 'Fenty Beauty'],
    hours: 'Seg a Sáb: 10h às 22h • Dom: 14h às 20h',
    phone: '(11) 2092-9900',
    whatsapp: '5511999999900',
    website: 'https://www.sephora.com.br',
    rating: 4.8,
    reviewsCount: 2310,
    featured: true,
    tourSceneId: 'scene-alameda-grifes',
    mapCoords: { x: 85, y: 54 },
    highlightProducts: [
      { name: 'Batom Rouge Velvet Rare Beauty', price: 'R$ 149,00', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'samsung-tatuape',
    name: 'Samsung Smart Store',
    category: 'tecnologia',
    floorId: 'piso-superior',
    floorName: 'Piso Superior',
    corridor: 'Corredor Central, Lj. 318',
    logo: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Experimente na prática os smartphones Galaxy Ultra, a linha de dobráveis Z Fold e Z Flip, relógios inteligentes e o ecossistema Galaxy AI.',
    tags: ['Galaxy AI', 'Smartphones', 'Tablets', 'Smartwatch', 'Trade-In'],
    hours: 'Seg a Sáb: 10h às 22h • Dom: 14h às 20h',
    phone: '(11) 2092-4111',
    whatsapp: '5511999994111',
    website: 'https://www.samsung.com/br',
    rating: 4.8,
    reviewsCount: 1870,
    featured: false,
    tourSceneId: 'scene-tech-hall',
    mapCoords: { x: 64, y: 48 },
    highlightProducts: [
      { name: 'Galaxy Z Flip com Galaxy AI', price: 'R$ 5.499,00', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&auto=format&fit=crop' }
    ]
  }
];

export const GENERAL_INFO = {
  name: 'Complexo Shopping Tatuapé',
  address: 'Rua Domingos Agostim, 91 - Tatuapé, São Paulo - SP, CEP 03306-010',
  metroConnection: 'Conexão direta com a Estação Tatuapé (Linha 3-Vermelha & Linhas 11/12 da CPTM)',
  hours: 'Segunda a Sábado: 10h às 22h • Domingos e Feriados: 14h às 20h (Alimentação e Lazer: 11h às 22h)',
  parking: 'Mais de 3.500 vagas cobertas com sistema inteligente de localização',
  phone: '(11) 2090-7400',
  whatsappSac: '5511999998888',
  email: 'atendimento@shoppingtatuape.com.br'
};
