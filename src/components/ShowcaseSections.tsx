import React from 'react';
import { ArrowRight, Compass, Lamp, Layers, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BRAND_CONFIG } from '../config/brand';
import {
  CATEGORIES,
  INSPIRATION_SCENES,
  PRODUCTS,
  SPACES,
} from '../data/catalogue';
import { CategorySlug, Product, SpaceSlug } from '../types/lighting';
import { ArchitecturalSceneVisual } from './LightingArtwork';
import { ProductCard } from './ProductCard';

/* ==================== 1. SHOP BY CATEGORY (15 CATEGORIES) ==================== */
interface CategoryGridSectionProps {
  onSelectCategory: (slug: CategorySlug) => void;
}

export const CategoryGridSection: React.FC<CategoryGridSectionProps> = ({
  onSelectCategory,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="categories" className="py-20 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#8E6C2D] font-semibold">
              Curated Categories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-1.5">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-[#5E574D] max-w-md">
            Explore fifteen specialized lighting collections tailored for ceilings, walls, tables, gardens, and architectural details.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category.slug}
              type="button"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25) }}
              onClick={() => onSelectCategory(category.slug)}
              className="group relative aspect-[4/3] w-full overflow-hidden border border-[#E5DED2] bg-[#EAE1D3] text-left cursor-pointer"
            >
              <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                <ArchitecturalSceneVisual sceneType={category.sceneType} />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#14120F]/88 via-[#14120F]/30 to-transparent transition-opacity duration-300 group-hover:from-[#14120F]/95" />

              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                <h3 className="font-sans text-sm sm:text-[15px] font-semibold text-[#FAF8F4] leading-snug transition-transform duration-300 group-hover:-translate-y-0.5">
                  {category.name}
                </h3>
                <p className="text-[11px] text-[#D7CEBE] mt-0.5 line-clamp-1 opacity-90">
                  {category.subtitle}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================== 2. FEATURED PRODUCTS (12+ ITEMS) ==================== */
interface FeaturedProductsSectionProps {
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAllProducts: () => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onViewDetails,
  onAddToCart,
  onViewAllProducts,
}) => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 12);

  return (
    <section className="py-20 bg-[#F3EEE5] border-t border-[#E5DED2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#8E6C2D] font-semibold">
              Showroom Highlights
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-1.5">
              Featured Collection
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#181613] text-xs font-semibold uppercase tracking-wider text-[#181613] hover:bg-[#181613] hover:text-[#FAF8F4] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================== 3. BESTSELLING COLLECTION: LIGHTING FAVORITES ==================== */
interface LightingFavoritesSectionProps {
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const LightingFavoritesSection: React.FC<LightingFavoritesSectionProps> = ({
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onViewDetails,
  onAddToCart,
}) => {
  const favorites = PRODUCTS.filter((p) => p.bestselling).slice(0, 6);

  return (
    <section className="py-20 bg-[#161513] text-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#D7B674] font-semibold">
              Bestselling Showcase
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAF8F4] mt-1.5">
              Lighting Favorites
            </h2>
          </div>
          <p className="text-sm text-[#BEB6A8] max-w-md">
            Six signature fixtures across chandeliers, ceiling lights, pendants, wall sconces, lamps, and vanity illumination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              darkSurface
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================== 4. SHOP BY SPACE (9 SPACES) ==================== */
interface ShopBySpaceSectionProps {
  onSelectSpace: (space: SpaceSlug) => void;
}

export const ShopBySpaceSection: React.FC<ShopBySpaceSectionProps> = ({
  onSelectSpace,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#8E6C2D] font-semibold">
              Curated by Room
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-1.5">
              Shop by Space
            </h2>
          </div>
          <p className="text-sm text-[#5E574D] max-w-md">
            Choose the room or exterior zone you are illuminating to view fixtures suited to its scale and ambience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPACES.map((space, idx) => (
            <motion.button
              key={space.slug}
              type="button"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.25) }}
              onClick={() => onSelectSpace(space.slug)}
              className="group relative aspect-[4/3] w-full overflow-hidden border border-[#E5DED2] text-left cursor-pointer"
            >
              <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                <ArchitecturalSceneVisual sceneType={space.sceneType} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#14120F]/90 via-[#14120F]/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#FAF8F4]">
                    {space.name}
                  </h3>
                  <p className="text-xs text-[#DCD4C6] mt-1">{space.caption}</p>
                </div>
                <span className="w-9 h-9 shrink-0 border border-[#FAF8F4]/35 flex items-center justify-center text-[#FAF8F4] group-hover:bg-[#B68F48] group-hover:border-[#B68F48] group-hover:text-[#14120F] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================== 5. INTERIOR LIGHTING INSPIRATION ==================== */
interface InspirationGallerySectionProps {
  onSelectCategory: (slug: CategorySlug) => void;
}

export const InspirationGallerySection: React.FC<InspirationGallerySectionProps> = ({
  onSelectCategory,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="inspiration" className="py-20 bg-[#F3EEE5] border-t border-[#E5DED2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.16em] text-[#8E6C2D] font-semibold">
            Editorial Lookbook
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-1.5">
            Interior Lighting Inspiration
          </h2>
          <p className="text-sm text-[#5A534A] mt-2 leading-relaxed">
            See how thoughtful lighting transforms living rooms, bedrooms, dining areas, executive offices, staircases, and foyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSPIRATION_SCENES.map((scene, idx) => (
            <motion.div
              key={scene.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.25) }}
              className="group bg-white border border-[#E5DED2] overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => onSelectCategory(scene.targetCategory)}
                className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer block"
              >
                <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                  <ArchitecturalSceneVisual sceneType={scene.sceneType} />
                </div>
              </button>
              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold">
                    {scene.spaceLabel}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[#181613] mt-1">
                    {scene.title}
                  </h3>
                  <p className="text-xs text-[#5E574D] mt-1.5 leading-relaxed">
                    {scene.caption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory(scene.targetCategory)}
                  className="text-xs font-semibold text-[#181613] hover:text-[#8E6C2D] inline-flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <span>Shop This Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================== 6. HOME & OFFICE SOLUTIONS ==================== */
interface HomeAndOfficeSectionProps {
  onExploreSegment: (segment: 'home' | 'office') => void;
}

export const HomeAndOfficeSection: React.FC<HomeAndOfficeSectionProps> = ({
  onExploreSegment,
}) => {
  return (
    <section className="py-20 bg-[#FAF8F4] border-t border-[#E5DED2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Home Lighting Panel */}
          <div className="group border border-[#E5DED2] bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                <ArchitecturalSceneVisual sceneType="chandelier-crystal" />
              </div>
            </div>
            <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold">
                  Residential Collections
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#181613] mt-1.5">
                  Home Lighting
                </h3>
                <p className="text-sm text-[#5A534A] mt-2 leading-relaxed">
                  Decorative lighting for living rooms, bedrooms, dining areas and other personal spaces.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onExploreSegment('home')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#181613] text-[#FAF8F4] text-xs font-semibold uppercase tracking-wider hover:bg-[#8E6C2D] transition-colors self-start cursor-pointer"
              >
                <span>Explore Home Lighting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Office & Commercial Lighting Panel */}
          <div className="group border border-[#E5DED2] bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                <ArchitecturalSceneVisual sceneType="office-linear" />
              </div>
            </div>
            <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold">
                  Commercial Collections
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#181613] mt-1.5">
                  Office &amp; Commercial Lighting
                </h3>
                <p className="text-sm text-[#5A534A] mt-2 leading-relaxed">
                  Modern lighting for offices, reception areas, meeting rooms and commercial interiors.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onExploreSegment('office')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#181613] text-[#FAF8F4] text-xs font-semibold uppercase tracking-wider hover:bg-[#8E6C2D] transition-colors self-start cursor-pointer"
              >
                <span>Explore Office Lighting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==================== 7. WHY CHOOSE AB FANCY LIGHTS. ==================== */
export const WhyChooseSection: React.FC = () => {
  const pillars = [
    {
      icon: Lamp,
      title: 'Stylish Designs',
      description:
        'Curated silhouettes in champagne gold, brushed brass, crystal, and matte charcoal suited to contemporary interiors.',
    },
    {
      icon: Layers,
      title: 'Options for Different Spaces',
      description:
        'Dedicated fixtures across living rooms, bedrooms, kitchens, corridors, outdoor facades, and modern offices.',
    },
    {
      icon: Compass,
      title: 'Modern and Decorative Lighting',
      description:
        'A balanced selection spanning statement chandeliers, minimalist flush mounts, track systems, and ambient lamps.',
    },
    {
      icon: MessageCircle,
      title: 'Easy Product Enquiries',
      description:
        'Direct WhatsApp enquiry support with prefilled product details, finishes, and itemized cart summaries.',
    },
  ];

  return (
    <section className="py-16 bg-[#1C1A17] text-[#FAF8F4] border-t border-[#2E2A24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.16em] text-[#D7B674] font-semibold">
            Our Approach
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAF8F4] mt-1.5">
            Why Choose {BRAND_CONFIG.businessName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="border border-[#302B25] bg-[#221F1B] p-6 space-y-3"
              >
                <div className="w-10 h-10 border border-[#453D32] flex items-center justify-center text-[#D7B674]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[#FAF8F4]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#BFB7A9] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
