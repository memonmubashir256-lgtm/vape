export type ProductCategory = 'all' | 'xlim' | 'pod-mods' | 'cartridges';

export interface ColorOption {
  name: string;
  hex: string;
  finish: string;
}

export interface PodOption {
  resistance: string;
  range: string;
  style: string;
}

export interface OxvaProduct {
  id: string;
  name: string;
  series: string;
  category: Exclude<ProductCategory, 'all'>;
  tagline: string;
  description: string;
  price: number;
  statusLabel?: string;
  image: string;
  specs: {
    output: string;
    battery: string;
    charging: string;
    capacity: string;
    screen: string;
    airflow: string;
    weight: string;
  };
  colors: ColorOption[];
  podOptions: PodOption[];
  inBox: string[];
}

export const OXVA_HERO_IMAGE = '/src/assets/images/hero_oxva_xlim_pro_2_1795119359967.jpg';

export const OXVA_PRODUCTS: OxvaProduct[] = [
  {
    id: 'xlim-pro-2',
    name: 'OXVA XLIM Pro 2',
    series: 'XLIM Series',
    category: 'xlim',
    tagline: '30W Prosleek DNA with 1300mAh endurance and 0.56" HD color display.',
    description:
      'Engineered with an upgraded 1300mAh high-density battery and 2A Type-C fast charging that reaches 80% in 25 minutes. Paired with leak-resistant top-fill cartridges for crisp MTL and RDL flavor delivery.',
    price: 34.9,
    statusLabel: 'Flagship',
    image: '/src/assets/images/product_xlim_pro_2_1795119360086.jpg',
    specs: {
      output: '5–30W',
      battery: '1300mAh',
      charging: '5V/2A Type-C',
      capacity: '2.0ml Top Fill',
      screen: '0.56" HD Color',
      airflow: 'Side AFC Slider',
      weight: '67g',
    },
    colors: [
      { name: 'Black Carbon', hex: '#1E1E22', finish: 'Woven Carbon & Zinc Alloy' },
      { name: 'Titanium Grey', hex: '#71717A', finish: 'Brushed Anodized Metal' },
      { name: 'Jungle Green', hex: '#14532D', finish: 'Tactile Matte Leather' },
      { name: 'Dream Purple', hex: '#7E22CE', finish: 'Electroplated Gradient' },
    ],
    podOptions: [
      { resistance: '0.6Ω Top Fill', range: '20–25W', style: 'RDL & Rich Vapor' },
      { resistance: '0.8Ω Top Fill', range: '12–16W', style: 'Balanced MTL' },
      { resistance: '0.4Ω Top Fill', range: '26–30W', style: 'High-Output RDL' },
      { resistance: '1.2Ω Top Fill', range: '10–12W', style: 'Tight Nic Salt MTL' },
    ],
    inBox: [
      '1× XLIM Pro 2 Device',
      '1× 0.6Ω Top Fill Cartridge (Pre-installed)',
      '1× 0.8Ω Top Fill Cartridge',
      '1× Type-C Cable & Lanyard',
    ],
  },
  {
    id: 'xlim-go',
    name: 'OXVA XLIM GO',
    series: 'XLIM Series',
    category: 'xlim',
    tagline: 'Ultra-lightweight 41g daily pod kit with auto-draw precision.',
    description:
      'Stripped down to pure flavor essentials. Featuring a textured skin-friendly grip, RGB battery ring indicator, 1000mAh internal battery, and full compatibility with every XLIM cartridge.',
    price: 19.9,
    statusLabel: 'Everyday Carry',
    image: '/src/assets/images/product_xlim_go_1795119359523.jpg',
    specs: {
      output: '5–30W Auto',
      battery: '1000mAh',
      charging: '5V/1A Type-C',
      capacity: '2.0ml Top Fill',
      screen: 'RGB Ring LED',
      airflow: 'Side AFC Slider',
      weight: '41g',
    },
    colors: [
      { name: 'Dark Green', hex: '#166534', finish: 'Pebbled Polymer Grip' },
      { name: 'Matte Black', hex: '#18181B', finish: 'Soft-Touch Charcoal' },
      { name: 'Light Brown', hex: '#92400E', finish: 'Saddle Leather Grain' },
      { name: 'Striped Blue', hex: '#1D4ED8', finish: 'Anodized Alloy' },
    ],
    podOptions: [
      { resistance: '0.8Ω Top Fill', range: '12–16W', style: 'Balanced MTL' },
      { resistance: '0.6Ω Top Fill', range: '20–25W', style: 'Warm RDL' },
      { resistance: '1.2Ω Top Fill', range: '10–12W', style: 'Smooth Nic Salt' },
    ],
    inBox: [
      '1× XLIM GO Device',
      '1× 0.8Ω Top Fill Cartridge (Pre-installed)',
      '1× User Manual',
    ],
  },
  {
    id: 'nexlim',
    name: 'OXVA NeXLIM',
    series: 'Dual Mesh Series',
    category: 'pod-mods',
    tagline: '40W Dual-Mesh Unitech architecture with 4ml cartridge capacity.',
    description:
      'Powered by dual-mesh Unitech heating elements and Boost/Eco switchable modes. Delivers twice the coil lifespan and dense flavor clarity inside a sculpted metallic frame with a 0.85" color screen.',
    price: 42.9,
    statusLabel: 'New Release',
    image: '/src/assets/images/product_nexlim_1795119360421.jpg',
    specs: {
      output: '5–40W',
      battery: '1500mAh',
      charging: '5V/2A Type-C',
      capacity: '4.0ml Dual Mesh',
      screen: '0.85" Color TFT',
      airflow: 'Stepless Side AFC',
      weight: '87.5g',
    },
    colors: [
      { name: 'Dark Brown Bronze', hex: '#78350F', finish: 'Brushed Gunmetal & Bronze' },
      { name: 'Dark Grey', hex: '#3F3F46', finish: 'Bead-Blasted Alloy' },
      { name: 'Pine Green', hex: '#065F46', finish: 'Satin Anodized' },
      { name: 'Shiny Purple', hex: '#6B21A8', finish: 'Mirror PVD Coating' },
    ],
    podOptions: [
      { resistance: '0.6Ω Dual Mesh', range: '20–40W', style: 'Boost RDL Flavor' },
      { resistance: '0.8Ω Dual Mesh', range: '12–32W', style: 'All-Day MTL/RDL' },
      { resistance: '1.2Ω Dual Mesh', range: '10–22W', style: 'Crisp High-Nic MTL' },
    ],
    inBox: [
      '1× NeXLIM Device',
      '1× 0.6Ω 4ml NeXLIM Cartridge',
      '1× 0.8Ω 4ml NeXLIM Cartridge',
      '1× Type-C Charging Cable',
    ],
  },
  {
    id: 'vprime',
    name: 'OXVA VPRIME',
    series: 'DTL Pod Mod',
    category: 'pod-mods',
    tagline: '60W sub-ohm DTL powerhouse with 2600mAh battery & auto-draw.',
    description:
      'Built for dense clouds and unrestricted lung hits without sacrificing pocket portability. Features a 0.96" vivid 3D color display, stitched leather chassis, and Unitech 2.0 5ml cartridges.',
    price: 54.9,
    statusLabel: 'Pro Series',
    image: '/src/assets/images/product_vprime_1795119359948.jpg',
    specs: {
      output: '5–60W',
      battery: '2600mAh',
      charging: '5V/2A Fast Charge',
      capacity: '5.0ml Top Fill',
      screen: '0.96" 3D Color',
      airflow: 'Wide DTL Side AFC',
      weight: '116g',
    },
    colors: [
      { name: 'Black Leather', hex: '#18181B', finish: 'Stitched Leather & Titanium' },
      { name: 'Natural Green', hex: '#14532D', finish: 'Matte Zinc & Grain Leather' },
      { name: 'Blue Leather', hex: '#1E3A8A', finish: 'Cobalt Hide & Brushed Frame' },
      { name: 'Glorious Gold', hex: '#B45309', finish: 'Champagne Alloy Trim' },
    ],
    podOptions: [
      { resistance: '0.2Ω Unitech 2.0', range: '45–60W', style: 'Full DTL Clouds' },
      { resistance: '0.4Ω Unitech 2.0', range: '28–38W', style: 'Balanced RDL' },
      { resistance: '0.6Ω Unitech 2.0', range: '20–25W', style: 'Flavor-Focused RDL' },
    ],
    inBox: [
      '1× VPRIME 60W Device',
      '1× 0.2Ω 5ml VPRIME Cartridge',
      '1× 0.6Ω 5ml VPRIME Cartridge',
      '1× Type-C Cable',
    ],
  },
  {
    id: 'xlim-sq-pro',
    name: 'OXVA XLIM SQ Pro',
    series: 'XLIM Series',
    category: 'xlim',
    tagline: 'Compact square chassis with 0.96" TFT display and 1200mAh battery.',
    description:
      'Iconic geometric form factor featuring smart wattage matching, customizable display themes, puff counter diagnostics, and 30W max power across all XLIM cartridges.',
    price: 36.9,
    statusLabel: 'In Stock',
    image: '/src/assets/images/product_xlim_pro_2_1795119360086.jpg',
    specs: {
      output: '5–30W',
      battery: '1200mAh',
      charging: '5V/2A Type-C',
      capacity: '2.0ml Top Fill',
      screen: '0.96" TFT Color',
      airflow: 'Side AFC Slider',
      weight: '88g',
    },
    colors: [
      { name: 'Black Carbon', hex: '#27272A', finish: 'Carbon Fiber Inlay' },
      { name: 'Gunmetal Wood', hex: '#44403C', finish: 'Walnut & Brushed Alloy' },
      { name: 'Bronze Wood', hex: '#78350F', finish: 'Warm Metallic Grain' },
      { name: 'Gentle Blue', hex: '#0369A1', finish: 'Anodized Aluminum' },
    ],
    podOptions: [
      { resistance: '0.6Ω Top Fill', range: '20–25W', style: 'RDL Flavor' },
      { resistance: '0.8Ω Top Fill', range: '12–16W', style: 'Classic MTL' },
      { resistance: '0.4Ω Top Fill', range: '26–30W', style: 'Warm RDL' },
    ],
    inBox: [
      '1× XLIM SQ Pro Device',
      '1× 0.6Ω & 1× 0.8Ω Top Fill Cartridges',
      '1× Braided Lanyard & Type-C Cable',
    ],
  },
  {
    id: 'xlim-top-fill-pods',
    name: 'XLIM V3 Top-Fill Cartridges (3-Pack)',
    series: 'Unitech Cartridges',
    category: 'cartridges',
    tagline: 'Anti-leak top-fill PCTG pods compatible across the entire XLIM family.',
    description:
      'Precision-molded leak-resistant pods featuring five-layer cotton wicking and Unitech mesh cores. Refill cleanly from the top silicone port without removing the pod from your device.',
    price: 11.9,
    statusLabel: '3-Pack',
    image: '/src/assets/images/product_xlim_cartridges_1795119359967.jpg',
    specs: {
      output: '10–30W Rated',
      battery: 'Universal Fit',
      charging: 'Magnetic Lock',
      capacity: '2.0ml (3 Pods/Box)',
      screen: 'Visible E-Liquid',
      airflow: 'Bottom Dual Slot',
      weight: '18g',
    },
    colors: [
      { name: 'Smoke PCTG', hex: '#3F3F46', finish: 'Translucent Dark Tint' },
    ],
    podOptions: [
      { resistance: '0.6Ω (20–25W)', range: '20–25W', style: 'RDL & Freebase / Salt' },
      { resistance: '0.8Ω (12–16W)', range: '12–16W', style: 'All-Day MTL' },
      { resistance: '0.4Ω (26–30W)', range: '26–30W', style: 'Pro 2 / SQ Pro RDL' },
      { resistance: '1.2Ω (10–12W)', range: '10–12W', style: 'Tight MTL Nic Salt' },
    ],
    inBox: [
      '3× Genuine OXVA XLIM V3 Top-Fill Cartridges',
      '1× Security Scratch Verification Seal',
    ],
  },
];
