import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Heart,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BRAND_CONFIG } from '../config/brand';
import { CATEGORIES } from '../data/catalogue';
import { CategorySlug } from '../types/lighting';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onNavigateHome: () => void;
  onOpenShopAll: () => void;
  onSelectCategory: (slug: CategorySlug) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenWhatsAppGeneral: () => void;
}

const FEATURED_DROPDOWN_SLUGS: CategorySlug[] = [
  'ceiling-lights',
  'chandeliers',
  'wall-lights',
  'pendant-lights',
  'decorative-led-fixtures',
];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onNavigateHome,
  onOpenShopAll,
  onSelectCategory,
  onNavigateSection,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenWhatsAppGeneral,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleCategoryClick = (slug: CategorySlug) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    onSelectCategory(slug);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
          scrolled
            ? 'bg-[#FAF8F4]/95 backdrop-blur-md border-[#E5DED2] shadow-[0_1px_12px_rgba(24,22,19,0.05)]'
            : 'bg-[#FAF8F4] border-[#ECE5D9]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#181613] hover:text-[#8E6C2D] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onNavigateHome();
              }}
              className="font-display text-2xl md:text-[26px] font-semibold tracking-tight text-[#181613] whitespace-nowrap shrink-0 cursor-pointer hover:text-[#8E6C2D] transition-colors focus-visible:outline-2 focus-visible:outline-[#B68F48]"
            >
              {BRAND_CONFIG.businessName}
            </button>
          </div>

          {/* Zone 2: Clean Single-Line Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3A352E]"
          >
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onNavigateHome();
              }}
              className="whitespace-nowrap shrink-0 hover:text-[#181613] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B68F48] hover:after:w-full after:transition-all"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onOpenShopAll();
              }}
              className="whitespace-nowrap shrink-0 hover:text-[#181613] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B68F48] hover:after:w-full after:transition-all"
            >
              Shop All
            </button>

            {/* Categories Animated Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
                className="flex items-center gap-1 whitespace-nowrap shrink-0 hover:text-[#181613] transition-colors py-2"
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#8E6C2D] transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[580px] z-50"
                  >
                    <div className="bg-[#FAF8F4] border border-[#E5DED2] shadow-xl p-6 grid grid-cols-12 gap-6">
                      <div className="col-span-5 border-r border-[#E8E1D5] pr-5">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold mb-3">
                          Signature Lighting
                        </p>
                        <ul className="space-y-2">
                          {FEATURED_DROPDOWN_SLUGS.map((slug) => {
                            const cat = CATEGORIES.find((c) => c.slug === slug);
                            if (!cat) return null;
                            return (
                              <li key={cat.slug}>
                                <button
                                  type="button"
                                  onClick={() => handleCategoryClick(cat.slug)}
                                  className="text-left w-full py-1 text-sm font-medium text-[#181613] hover:text-[#8E6C2D] transition-colors"
                                >
                                  {cat.slug === 'decorative-led-fixtures'
                                    ? 'Decorative Lighting'
                                    : cat.name}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                        <button
                          type="button"
                          onClick={() => {
                            setDropdownOpen(false);
                            onOpenShopAll();
                          }}
                          className="mt-4 pt-3 border-t border-[#E8E1D5] text-xs font-semibold uppercase tracking-wider text-[#8E6C2D] hover:text-[#181613] transition-colors block"
                        >
                          View All 44 Fixtures →
                        </button>
                      </div>

                      <div className="col-span-7">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#6E675E] font-semibold mb-3">
                          All Categories
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat.slug}
                              type="button"
                              onClick={() => handleCategoryClick(cat.slug)}
                              className="text-left py-1 text-[13px] text-[#49433B] hover:text-[#8E6C2D] transition-colors truncate"
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onNavigateSection('inspiration');
              }}
              className="whitespace-nowrap shrink-0 hover:text-[#181613] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B68F48] hover:after:w-full after:transition-all"
            >
              Room Inspiration
            </button>

            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onNavigateSection('contact');
              }}
              className="whitespace-nowrap shrink-0 hover:text-[#181613] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B68F48] hover:after:w-full after:transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Utility Icons & Primary WhatsApp Action */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search lighting products"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#2D2924] hover:text-[#8E6C2D] transition-colors cursor-pointer"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Open wishlist (${wishlistCount} saved)`}
              className="relative min-w-[40px] min-h-[40px] flex items-center justify-center text-[#2D2924] hover:text-[#8E6C2D] transition-colors cursor-pointer"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[16px] h-[16px] px-1 bg-[#B68F48] text-white text-[10px] font-semibold tabular-nums flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping cart (${cartCount} items)`}
              className="relative min-w-[40px] min-h-[40px] flex items-center justify-center text-[#2D2924] hover:text-[#8E6C2D] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[16px] h-[16px] px-1 bg-[#181613] text-white text-[10px] font-semibold tabular-nums flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenWhatsAppGeneral}
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-4 py-2 bg-[#181613] text-[#FAF8F4] text-xs font-medium tracking-wide hover:bg-[#8E6C2D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.aside
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '-100%' }}
              animate={{ x: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-[#FAF8F4] border-r border-[#E5DED2] z-50 flex flex-col overflow-y-auto"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5DED2]">
                <span className="font-display text-2xl font-semibold text-[#181613]">
                  {BRAND_CONFIG.businessName}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#181613]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 py-6 space-y-6 flex-1">
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateHome();
                    }}
                    className="w-full text-left py-2.5 text-base font-medium text-[#181613] border-b border-[#ECE5D9]"
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenShopAll();
                    }}
                    className="w-full text-left py-2.5 text-base font-medium text-[#181613] border-b border-[#ECE5D9]"
                  >
                    Shop All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateSection('inspiration');
                    }}
                    className="w-full text-left py-2.5 text-base font-medium text-[#181613] border-b border-[#ECE5D9]"
                  >
                    Room Inspiration
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateSection('contact');
                    }}
                    className="w-full text-left py-2.5 text-base font-medium text-[#181613] border-b border-[#ECE5D9]"
                  >
                    Contact
                  </button>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold mb-3">
                    Lighting Categories
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="text-left py-2 text-sm text-[#3A352E] hover:text-[#8E6C2D] transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#E5DED2] bg-[#F3EEE5]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhatsAppGeneral();
                  }}
                  className="w-full py-3 px-4 bg-[#181613] text-[#FAF8F4] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#8E6C2D] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Us on WhatsApp</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
