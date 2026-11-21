import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS, SPACES } from '../data/catalogue';
import { CategorySlug, Product, SpaceSlug } from '../types/lighting';
import { ProductCard } from './ProductCard';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';
export type SegmentFilter = 'all' | 'home' | 'office';

interface CatalogueSectionProps {
  selectedCategory: CategorySlug | 'all';
  selectedSpace: SpaceSlug | 'all';
  selectedSegment: SegmentFilter;
  searchQuery: string;
  sortBy: SortOption;
  wishlistIds: string[];
  onCategoryChange: (cat: CategorySlug | 'all') => void;
  onSpaceChange: (space: SpaceSlug | 'all') => void;
  onSegmentChange: (seg: SegmentFilter) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  selectedCategory,
  selectedSpace,
  selectedSegment,
  searchQuery,
  sortBy,
  wishlistIds,
  onCategoryChange,
  onSpaceChange,
  onSegmentChange,
  onSearchChange,
  onSortChange,
  onResetFilters,
  onToggleWishlist,
  onQuickView,
  onViewDetails,
  onAddToCart,
}) => {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filtered = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all' && !p.categoryIds.includes(selectedCategory)) {
      return false;
    }
    if (selectedSpace !== 'all' && !p.spaces.includes(selectedSpace)) {
      return false;
    }
    if (selectedSegment === 'home' && p.segment !== 'home' && p.segment !== 'both') {
      return false;
    }
    if (selectedSegment === 'office' && p.segment !== 'office' && p.segment !== 'both') {
      return false;
    }
    if (normalizedSearch) {
      const hay = `${p.name} ${p.collection} ${p.shortDescription} ${p.specs.material}`.toLowerCase();
      if (!hay.includes(normalizedSearch)) return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.pricePKR - b.pricePKR;
      case 'price-desc':
        return b.pricePKR - a.pricePKR;
      case 'newest':
        return b.newestOrder - a.newestOrder;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.newestOrder - a.newestOrder;
    }
  });

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);
  const activeSpaceObj = SPACES.find((s) => s.slug === selectedSpace);
  const hasFilters =
    selectedCategory !== 'all' ||
    selectedSpace !== 'all' ||
    selectedSegment !== 'all' ||
    normalizedSearch.length > 0;

  return (
    <section id="catalogue" className="py-20 bg-[#FAF8F4] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#8E6C2D] font-semibold">
              Complete Product Catalogue
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-1.5">
              {activeCategoryObj
                ? activeCategoryObj.name
                : activeSpaceObj
                ? `${activeSpaceObj.name} Lighting`
                : selectedSegment === 'home'
                ? 'Home Lighting Collection'
                : selectedSegment === 'office'
                ? 'Office & Commercial Lighting'
                : 'All Decorative Lighting'}
            </h2>
            <p className="text-sm text-[#5E574D] mt-2">
              Showing <span className="font-semibold tabular-nums text-[#181613]">{filtered.length}</span> of{' '}
              <span className="tabular-nums">{PRODUCTS.length}</span> curated sample lighting fixtures.
            </p>
          </div>

          {/* Search & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:flex-initial min-w-[220px]">
              <Search className="w-4 h-4 text-[#8E6C2D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by fixture name..."
                aria-label="Filter catalogue by name"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#DCD3C4] text-[#181613] placeholder:text-[#8E867B] focus:outline-none focus:border-[#B68F48]"
              />
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#6E675E]" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sort products"
                className="py-2.5 px-3 text-xs bg-white border border-[#DCD3C4] text-[#181613] focus:outline-none focus:border-[#B68F48] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category & Segment Filter Bar */}
        <div className="space-y-4 mb-10 pb-6 border-b border-[#E5DED2]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onCategoryChange('all')}
              className={`px-3.5 py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#181613] text-[#FAF8F4] border-[#181613]'
                  : 'bg-white text-[#3A352E] border-[#E0D7C8] hover:border-[#B68F48]'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onCategoryChange(cat.slug)}
                className={`px-3.5 py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-[#181613] text-[#FAF8F4] border-[#181613]'
                    : 'bg-white text-[#3A352E] border-[#E0D7C8] hover:border-[#B68F48]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#6E675E] mr-1">Space:</span>
              <select
                value={selectedSpace}
                onChange={(e) => onSpaceChange(e.target.value as SpaceSlug | 'all')}
                aria-label="Filter by space"
                className="py-1.5 px-3 text-xs bg-white border border-[#DCD3C4] text-[#181613] focus:outline-none focus:border-[#B68F48] cursor-pointer"
              >
                <option value="all">All Rooms &amp; Spaces</option>
                {SPACES.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>

              <div className="inline-flex border border-[#DCD3C4] bg-white p-0.5 ml-1">
                {(
                  [
                    { id: 'all', label: 'All Uses' },
                    { id: 'home', label: 'Home' },
                    { id: 'office', label: 'Office & Commercial' },
                  ] as const
                ).map((seg) => (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => onSegmentChange(seg.id)}
                    className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedSegment === seg.id
                        ? 'bg-[#B68F48] text-[#14120F]'
                        : 'text-[#4A443C] hover:text-[#181613]'
                    }`}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8E6C2D] hover:text-[#181613] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Active Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#E5DED2]">
            <h3 className="font-display text-2xl font-semibold text-[#181613]">
              No matching fixtures found
            </h3>
            <p className="text-sm text-[#6E675E] mt-2">
              Try clearing one of your category, space, or search filters to view the full collection.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 px-6 py-2.5 bg-[#181613] text-white text-xs font-semibold hover:bg-[#8E6C2D] transition-colors cursor-pointer"
            >
              Show All {PRODUCTS.length} Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
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
        )}
      </div>
    </section>
  );
};
