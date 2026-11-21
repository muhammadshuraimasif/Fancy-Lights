export type CategorySlug =
  | 'chandeliers'
  | 'ceiling-lights'
  | 'pendant-lights'
  | 'wall-lights'
  | 'led-strip-lights'
  | 'decorative-table-lamps'
  | 'floor-lamps'
  | 'bedside-lamps'
  | 'mirror-lights'
  | 'outdoor-garden-lights'
  | 'staircase-lighting'
  | 'office-lighting'
  | 'track-lights-spotlights'
  | 'decorative-led-fixtures'
  | 'smart-decorative-lighting';

export type SpaceSlug =
  | 'living-room'
  | 'bedroom'
  | 'dining-room'
  | 'kitchen'
  | 'drawing-room'
  | 'office'
  | 'reception-waiting'
  | 'hallway-staircase'
  | 'outdoor-garden';

export type CollectionGroup =
  | 'Chandeliers'
  | 'Ceiling Lights'
  | 'Pendant Lights'
  | 'Wall Lights'
  | 'Lamps & Decorative Lighting'
  | 'LED & Architectural Lighting'
  | 'Outdoor & Special Lighting';

export interface CategoryItem {
  slug: CategorySlug;
  name: string;
  subtitle: string;
  sceneType:
    | 'chandelier-crystal'
    | 'ceiling-flush'
    | 'pendant-dining'
    | 'wall-sconce'
    | 'led-cove'
    | 'table-lamp'
    | 'floor-lamp'
    | 'bedside-lamp'
    | 'mirror-vanity'
    | 'outdoor-garden'
    | 'staircase'
    | 'office-linear'
    | 'track-spotlight'
    | 'decorative-led'
    | 'smart-ambient';
}

export interface SpaceItem {
  slug: SpaceSlug;
  name: string;
  caption: string;
  sceneType: CategoryItem['sceneType'];
}

export interface ProductSpecs {
  material: string;
  wattage?: string;
  voltage?: string;
  lumenOutput?: string;
  ipRating?: string;
  mounting: string;
}

export type ProductVisualArchetype =
  | 'crystal-tier-chandelier'
  | 'gold-ring-chandelier'
  | 'led-halo-chandelier'
  | 'black-linear-chandelier'
  | 'classic-brass-chandelier'
  | 'multi-tier-grand-chandelier'
  | 'round-flush-ceiling'
  | 'slim-flush-ceiling'
  | 'geometric-ceiling'
  | 'gold-drum-ceiling'
  | 'square-minimal-ceiling'
  | 'hall-medallion-ceiling'
  | 'single-drop-pendant'
  | 'trio-kitchen-pendant'
  | 'opal-globe-pendant'
  | 'modern-brass-pendant'
  | 'linear-dining-pendant'
  | 'black-cone-pendant'
  | 'gold-arch-sconce'
  | 'bedroom-linen-sconce'
  | 'updown-beam-sconce'
  | 'fluted-crystal-sconce'
  | 'black-minimal-sconce'
  | 'corridor-linear-sconce'
  | 'travertine-table-lamp'
  | 'alabaster-bedside-lamp'
  | 'arched-floor-lamp'
  | 'smoked-glass-table-lamp'
  | 'corner-ambient-bar'
  | 'architect-desk-lamp'
  | 'warm-led-strip'
  | 'rgb-led-strip'
  | 'recessed-spotlight'
  | 'track-spot-single'
  | 'magnetic-track-system'
  | 'stair-step-led'
  | 'outdoor-wall-lantern'
  | 'garden-pathway-bollard'
  | 'waterproof-cube-wall'
  | 'balcony-cylindrical-light'
  | 'mirror-vanity-bar'
  | 'office-suspended-linear'
  | 'hallway-double-ring'
  | 'smart-ambient-orb';

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: CollectionGroup;
  primaryCategory: CategorySlug;
  categoryIds: CategorySlug[];
  spaces: SpaceSlug[];
  segment: 'home' | 'office' | 'both';
  pricePKR: number;
  previousPricePKR?: number;
  featured?: boolean;
  bestselling?: boolean;
  newestOrder: number;
  shortDescription: string;
  description: string;
  finishes: string[];
  colorTemperatures?: string[];
  dimensions: string;
  specs: ProductSpecs;
  visualArchetype: ProductVisualArchetype;
}

export interface CartItem {
  key: string;
  productId: string;
  quantity: number;
  selectedFinish: string;
  selectedColorTemp?: string;
}

export interface InspirationScene {
  id: string;
  title: string;
  spaceLabel: string;
  caption: string;
  targetCategory: CategorySlug;
  sceneType: CategoryItem['sceneType'];
}
