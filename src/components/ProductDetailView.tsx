import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { formatPKR } from '../config/brand';
import { CATEGORIES, PRODUCTS } from '../data/catalogue';
import { CategorySlug, Product } from '../types/lighting';
import { ProductLightingVisual } from './LightingArtwork';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  wishlistIds: string[];
  onBackToShop: () => void;
  onSelectCategory: (slug: CategorySlug) => void;
  onViewProduct: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedFinish: string,
    selectedColorTemp?: string
  ) => void;
  onEnquireWhatsApp: (
    product: Product,
    quantity: number,
    selectedFinish: string,
    selectedColorTemp?: string
  ) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  wishlistIds,
  onBackToShop,
  onSelectCategory,
  onViewProduct,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onEnquireWhatsApp,
}) => {
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]);
  const [selectedColorTemp, setSelectedColorTemp] = useState(
    product.colorTemperatures?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeGallery, setActiveGallery] = useState<'studio' | 'lit' | 'dimensions'>('studio');

  useEffect(() => {
    setSelectedFinish(product.finishes[0]);
    setSelectedColorTemp(product.colorTemperatures?.[0]);
    setQuantity(1);
    setActiveGallery('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const category = CATEGORIES.find((c) => c.slug === product.primaryCategory);
  const isWishlisted = wishlistIds.includes(product.id);

  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.primaryCategory === product.primaryCategory ||
        p.collection === product.collection)
  ).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-[#6E675E] mb-8"
      >
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-1.5 text-[#181613] font-medium hover:text-[#8E6C2D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Catalogue</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#B4AA9B]" />
        {category && (
          <>
            <button
              type="button"
              onClick={() => onSelectCategory(category.slug)}
              className="hover:text-[#181613] transition-colors cursor-pointer"
            >
              {category.name}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B4AA9B]" />
          </>
        )}
        <span className="text-[#181613] font-medium">{product.name}</span>
      </nav>

      {/* Main Split Gallery + Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
          <div className="aspect-[4/3] w-full border border-[#E5DED2] bg-[#F4EFE7] overflow-hidden">
            <ProductLightingVisual
              archetype={product.visualArchetype}
              finish={selectedFinish}
              colorTemp={selectedColorTemp}
              viewMode={activeGallery}
              dimensions={product.dimensions}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: 'studio', label: 'Studio View' },
                { id: 'lit', label: 'Evening Illumination' },
                { id: 'dimensions', label: 'Dimension Spec' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGallery(tab.id)}
                className={`border transition-all cursor-pointer text-left overflow-hidden ${
                  activeGallery === tab.id
                    ? 'border-[#B68F48] ring-1 ring-[#B68F48]'
                    : 'border-[#E5DED2] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="aspect-[4/3] w-full">
                  <ProductLightingVisual
                    archetype={product.visualArchetype}
                    finish={selectedFinish}
                    colorTemp={selectedColorTemp}
                    viewMode={tab.id}
                    dimensions={product.dimensions}
                  />
                </div>
                <p className="px-2.5 py-2 text-[11px] font-medium text-[#2E2924] bg-white border-t border-[#ECE5D9] truncate">
                  {tab.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contiguous Purchase & Specification Module */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold">
              {product.collection} · {category?.name}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-2 leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3 tabular-nums">
              <span className="text-2xl font-semibold text-[#181613]">
                {formatPKR(product.pricePKR)}
              </span>
              {product.previousPricePKR && (
                <span className="text-base line-through text-[#8A8277]">
                  {formatPKR(product.previousPricePKR)}
                </span>
              )}
            </div>
            <p className="text-xs text-[#736B60] mt-1">
              Sample showroom catalogue pricing · Contact via WhatsApp for current availability
            </p>
          </div>

          <p className="text-[15px] text-[#3F3A33] leading-relaxed border-t border-[#E8E1D5] pt-5">
            {product.description}
          </p>

          {/* Finish / Color Options */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-[0.12em] font-semibold text-[#4A443C]">
                Finish
              </span>
              <span className="text-xs font-medium text-[#181613]">{selectedFinish}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.finishes.map((finish) => (
                <button
                  key={finish}
                  type="button"
                  onClick={() => setSelectedFinish(finish)}
                  className={`px-3.5 py-2 text-xs font-medium border transition-colors cursor-pointer ${
                    selectedFinish === finish
                      ? 'bg-[#181613] text-[#FAF8F4] border-[#181613]'
                      : 'bg-white text-[#2E2924] border-[#DCD3C4] hover:border-[#8E6C2D]'
                  }`}
                >
                  {finish}
                </button>
              ))}
            </div>
          </div>

          {/* Color Temperature Options */}
          {product.colorTemperatures && product.colorTemperatures.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs uppercase tracking-[0.12em] font-semibold text-[#4A443C] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B68F48]" />
                  <span>Light Temperature</span>
                </span>
                <span className="text-xs font-medium text-[#181613]">{selectedColorTemp}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colorTemperatures.map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setSelectedColorTemp(temp)}
                    className={`px-3.5 py-2 text-xs font-medium border transition-colors cursor-pointer ${
                      selectedColorTemp === temp
                        ? 'bg-[#B68F48] text-[#14120F] border-[#B68F48] font-semibold'
                        : 'bg-white text-[#2E2924] border-[#DCD3C4] hover:border-[#8E6C2D]'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Primary Actions */}
          <div className="pt-2 space-y-3">
            <div className="flex items-stretch gap-3">
              <div className="inline-flex items-center border border-[#D8CFC0] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-12 flex items-center justify-center text-[#2D2924] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-12 flex items-center justify-center text-[#2D2924] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  onAddToCart(product, quantity, selectedFinish, selectedColorTemp)
                }
                className="flex-1 h-12 px-6 bg-[#181613] text-[#FAF8F4] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#8E6C2D] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`w-12 h-12 border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#B68F48] border-[#B68F48] text-white'
                    : 'bg-white border-[#D8CFC0] text-[#2D2924] hover:border-[#8E6C2D]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                onEnquireWhatsApp(product, quantity, selectedFinish, selectedColorTemp)
              }
              className="w-full h-12 px-6 border border-[#B68F48] bg-[#FAF5EB] text-[#181613] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#B68F48] hover:text-[#14120F] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire or Order on WhatsApp</span>
            </button>
          </div>

          {/* Dimensions & Technical Specifications */}
          <div className="border border-[#E5DED2] bg-white p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] font-semibold text-[#8E6C2D]">
              <Ruler className="w-4 h-4" />
              <span>Dimensions &amp; Specifications</span>
            </div>

            <dl className="divide-y divide-[#F0E9DC] text-sm">
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#6E675E]">Dimensions</dt>
                <dd className="text-right font-medium text-[#181613]">{product.dimensions}</dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#6E675E]">Material</dt>
                <dd className="text-right font-medium text-[#181613]">{product.specs.material}</dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#6E675E]">Mounting</dt>
                <dd className="text-right font-medium text-[#181613]">{product.specs.mounting}</dd>
              </div>
              {product.specs.wattage && (
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#6E675E]">Wattage</dt>
                  <dd className="text-right font-medium text-[#181613] tabular-nums">
                    {product.specs.wattage}
                  </dd>
                </div>
              )}
              {product.specs.lumenOutput && (
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#6E675E]">Lumen Output</dt>
                  <dd className="text-right font-medium text-[#181613] tabular-nums">
                    {product.specs.lumenOutput}
                  </dd>
                </div>
              )}
              {product.specs.voltage && (
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#6E675E]">Input Voltage</dt>
                  <dd className="text-right font-medium text-[#181613] tabular-nums">
                    {product.specs.voltage}
                  </dd>
                </div>
              )}
              {product.specs.ipRating && (
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#6E675E]">Protection Rating</dt>
                  <dd className="text-right font-medium text-[#181613]">
                    {product.specs.ipRating}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-14 border-t border-[#E5DED2]">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold">
                Complementary Fixtures
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#181613] mt-1">
                Related Lighting
              </h2>
            </div>
            <button
              type="button"
              onClick={onBackToShop}
              className="text-sm font-medium text-[#181613] hover:text-[#8E6C2D] transition-colors cursor-pointer"
            >
              Browse Full Catalogue →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                isWishlisted={wishlistIds.includes(rel.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onViewDetails={onViewProduct}
                onAddToCart={(p) =>
                  onAddToCart(p, 1, p.finishes[0], p.colorTemperatures?.[0])
                }
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
