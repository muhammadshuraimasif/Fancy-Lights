import React from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { formatPKR } from '../config/brand';
import { CATEGORIES } from '../data/catalogue';
import { Product } from '../types/lighting';
import { ProductLightingVisual } from './LightingArtwork';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  darkSurface?: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  darkSurface = false,
  onToggleWishlist,
  onQuickView,
  onViewDetails,
  onAddToCart,
}) => {
  const categoryName =
    CATEGORIES.find((c) => c.slug === product.primaryCategory)?.name ?? product.collection;

  return (
    <article
      className={`group flex flex-col border transition-all duration-200 ${
        darkSurface
          ? 'bg-[#1D1B18] border-[#2E2A24] text-[#FAF8F4] hover:border-[#B68F48]/60'
          : 'bg-white border-[#E7E0D4] text-[#181613] hover:border-[#C7B390] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(24,22,19,0.06)]'
      }`}
    >
      {/* Image Canvas (4:3 uniform aspect ratio) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2ECE1]">
        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="w-full h-full block text-left cursor-pointer"
          aria-label={`View details for ${product.name}`}
        >
          <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <ProductLightingVisual
              archetype={product.visualArchetype}
              finish={product.finishes[0]}
              colorTemp={product.colorTemperatures?.[0]}
              viewMode={darkSurface ? 'lit' : 'studio'}
            />
          </div>
        </button>

        {/* Top-right functional wishlist & quick-view controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className={`w-9 h-9 flex items-center justify-center border transition-colors cursor-pointer ${
              isWishlisted
                ? 'bg-[#B68F48] border-[#B68F48] text-white'
                : 'bg-[#FAF8F4]/92 border-[#E0D7C8] text-[#2B2722] hover:bg-white hover:text-[#8E6C2D]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="w-9 h-9 flex items-center justify-center bg-[#FAF8F4]/92 border border-[#E0D7C8] text-[#2B2722] hover:bg-white hover:text-[#8E6C2D] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <p
            className={`text-[11px] uppercase tracking-[0.12em] font-medium mb-1.5 ${
              darkSurface ? 'text-[#C9A663]' : 'text-[#8E6C2D]'
            }`}
          >
            {categoryName}
          </p>

          <h3 className="font-sans text-[16px] font-semibold leading-snug">
            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="text-left hover:text-[#B68F48] transition-colors cursor-pointer"
            >
              {product.name}
            </button>
          </h3>

          <div className="mt-2 flex items-baseline gap-2.5 tabular-nums">
            <span className="text-[15px] font-semibold">
              {formatPKR(product.pricePKR)}
            </span>
            {product.previousPricePKR && (
              <span
                className={`text-xs line-through ${
                  darkSurface ? 'text-[#8A8277]' : 'text-[#857D72]'
                }`}
              >
                {formatPKR(product.previousPricePKR)}
              </span>
            )}
          </div>
        </div>

        <div
          className={`pt-3.5 border-t flex items-center gap-2 ${
            darkSurface ? 'border-[#2E2A24]' : 'border-[#EFE9DE]'
          }`}
        >
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className={`flex-1 py-2.5 px-3 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
              darkSurface
                ? 'border-[#3C362E] text-[#E9E2D6] hover:border-[#B68F48] hover:text-[#FAF8F4]'
                : 'border-[#DCD3C4] text-[#2D2924] hover:border-[#181613] hover:text-[#181613]'
            }`}
          >
            View Details
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className={`flex-1 py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              darkSurface
                ? 'bg-[#B68F48] text-[#161513] hover:bg-[#CCA65E]'
                : 'bg-[#181613] text-[#FAF8F4] hover:bg-[#8E6C2D]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
