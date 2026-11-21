import React, { useEffect, useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CatalogueSection, SegmentFilter, SortOption } from './components/CatalogueSection';
import { ContactSection, FaqSection, Footer } from './components/ContactAndFooter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import {
  CartDrawer,
  LegalModal,
  QuickViewModal,
  SearchModal,
  WhatsAppEnquiryModal,
  WishlistDrawer,
} from './components/Overlays';
import { ProductDetailView } from './components/ProductDetailView';
import {
  CategoryGridSection,
  FeaturedProductsSection,
  HomeAndOfficeSection,
  InspirationGallerySection,
  LightingFavoritesSection,
  ShopBySpaceSection,
  WhyChooseSection,
} from './components/ShowcaseSections';
import { BRAND_CONFIG, buildWhatsAppUrl, formatPKR } from './config/brand';
import { PRODUCTS } from './data/catalogue';
import { CartItem, CategorySlug, Product, SpaceSlug } from './types/lighting';

const CART_STORAGE_KEY = 'ab_fancy_lights_cart_v1';
const WISHLIST_STORAGE_KEY = 'ab_fancy_lights_wishlist_v1';

export default function App() {
  const shouldReduceMotion = useReducedMotion();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  // Catalogue & view navigation state
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [selectedSpace, setSelectedSpace] = useState<SpaceSlug | 'all'>('all');
  const [selectedSegment, setSelectedSegment] = useState<SegmentFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [whatsAppModalMessage, setWhatsAppModalMessage] = useState<string | null>(null);
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);

  // Toast & Back-to-top
  const [toast, setToast] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 2600);
  };

  const scrollToElement = (id: string) => {
    window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  };

  const handleNavigateHome = () => {
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  const handleOpenShopAll = () => {
    setActiveProduct(null);
    setSelectedCategory('all');
    setSelectedSpace('all');
    setSelectedSegment('all');
    setSearchQuery('');
    scrollToElement('catalogue');
  };

  const handleSelectCategory = (slug: CategorySlug | 'all') => {
    setActiveProduct(null);
    setSelectedCategory(slug);
    setSelectedSpace('all');
    setSelectedSegment('all');
    scrollToElement('catalogue');
  };

  const handleSelectSpace = (space: SpaceSlug | 'all') => {
    setActiveProduct(null);
    setSelectedSpace(space);
    setSelectedCategory('all');
    setSelectedSegment('all');
    scrollToElement('catalogue');
  };

  const handleSelectSegment = (segment: 'home' | 'office') => {
    setActiveProduct(null);
    setSelectedSegment(segment);
    setSelectedCategory('all');
    setSelectedSpace('all');
    scrollToElement('catalogue');
  };

  const handleNavigateSection = (sectionId: string) => {
    if (activeProduct) {
      setActiveProduct(null);
      window.setTimeout(() => scrollToElement(sectionId), 60);
    } else {
      scrollToElement(sectionId);
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      if (product) {
        showToast(
          exists
            ? `Removed ${product.name} from wishlist`
            : `Saved ${product.name} to wishlist`
        );
      }
      return next;
    });
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    finish?: string,
    colorTemp?: string
  ) => {
    const selectedFinish = finish || product.finishes[0];
    const selectedColorTemp = colorTemp || product.colorTemperatures?.[0];
    const key = `${product.id}__${selectedFinish}__${selectedColorTemp ?? 'default'}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          quantity,
          selectedFinish,
          selectedColorTemp,
        },
      ];
    });

    showToast(`Added ${product.name} to cart`);
  };

  const handleUpdateCartQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const triggerWhatsApp = (message: string) => {
    const url = buildWhatsAppUrl(BRAND_CONFIG.whatsappNumber, message);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    } else {
      setWhatsAppModalMessage(message);
    }
  };

  const handleProductWhatsAppEnquiry = (
    product: Product,
    qty = 1,
    finish?: string,
    colorTemp?: string
  ) => {
    const f = finish || product.finishes[0];
    const c = colorTemp || product.colorTemperatures?.[0];
    const optionDetails = [
      `Finish: ${f}`,
      c ? `Light Temperature: ${c}` : null,
      `Quantity: ${qty}`,
      `Sample Price: ${formatPKR(product.pricePKR)}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const message = `Assalam-o-Alaikum, I am interested in the ${product.name} listed on ${BRAND_CONFIG.businessName}. Please share its availability, dimensions, specifications and price.\n\nSelected Details: ${optionDetails}`;
    triggerWhatsApp(message);
  };

  const handleCartWhatsAppEnquiry = () => {
    const enriched = cartItems
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((x): x is CartItem & { product: Product } => x !== null);

    if (enriched.length === 0) return;

    const lines = enriched.map((item, idx) => {
      const opts = [
        item.selectedFinish,
        item.selectedColorTemp ? item.selectedColorTemp : null,
      ]
        .filter(Boolean)
        .join(', ');
      return `${idx + 1}. ${item.product.name} (${opts}) × ${item.quantity} — ${formatPKR(
        item.product.pricePKR * item.quantity
      )}`;
    });

    const subtotal = enriched.reduce(
      (sum, item) => sum + item.product.pricePKR * item.quantity,
      0
    );

    const message = `Assalam-o-Alaikum, I would like to enquire / place an order for the following lighting fixtures from ${BRAND_CONFIG.businessName}:\n\n${lines.join(
      '\n'
    )}\n\nEstimated Subtotal: ${formatPKR(
      subtotal
    )}\n\nPlease confirm availability and delivery details.`;

    triggerWhatsApp(message);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#181613]">
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onNavigateHome={handleNavigateHome}
        onOpenShopAll={handleOpenShopAll}
        onSelectCategory={handleSelectCategory}
        onNavigateSection={handleNavigateSection}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWhatsAppGeneral={() =>
          triggerWhatsApp(
            `Assalam-o-Alaikum, I am visiting ${BRAND_CONFIG.businessName} and would like assistance selecting decorative lighting.`
          )
        }
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeProduct ? (
            <motion.div
              key={activeProduct.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <ProductDetailView
                product={activeProduct}
                wishlistIds={wishlistIds}
                onBackToShop={handleOpenShopAll}
                onSelectCategory={handleSelectCategory}
                onViewProduct={(p) => setActiveProduct(p)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={handleAddToCart}
                onEnquireWhatsApp={handleProductWhatsAppEnquiry}
              />
            </motion.div>
          ) : (
            <motion.div
              key="storefront"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HeroSection
                onExploreCollection={handleOpenShopAll}
                onGetInTouch={() => handleNavigateSection('contact')}
                onWhatsAppEnquiry={() =>
                  triggerWhatsApp(
                    `Assalam-o-Alaikum, I would like to enquire about lighting products from ${BRAND_CONFIG.businessName}.`
                  )
                }
              />

              <CategoryGridSection onSelectCategory={handleSelectCategory} />

              <FeaturedProductsSection
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onViewDetails={(p) => setActiveProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onViewAllProducts={handleOpenShopAll}
              />

              <LightingFavoritesSection
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onViewDetails={(p) => setActiveProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
              />

              <ShopBySpaceSection onSelectSpace={handleSelectSpace} />

              <CatalogueSection
                selectedCategory={selectedCategory}
                selectedSpace={selectedSpace}
                selectedSegment={selectedSegment}
                searchQuery={searchQuery}
                sortBy={sortBy}
                wishlistIds={wishlistIds}
                onCategoryChange={setSelectedCategory}
                onSpaceChange={setSelectedSpace}
                onSegmentChange={setSelectedSegment}
                onSearchChange={setSearchQuery}
                onSortChange={setSortBy}
                onResetFilters={() => {
                  setSelectedCategory('all');
                  setSelectedSpace('all');
                  setSelectedSegment('all');
                  setSearchQuery('');
                  setSortBy('featured');
                }}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onViewDetails={(p) => setActiveProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
              />

              <InspirationGallerySection onSelectCategory={handleSelectCategory} />

              <HomeAndOfficeSection onExploreSegment={handleSelectSegment} />

              <WhyChooseSection />

              <FaqSection />

              <ContactSection onOpenWhatsAppWithMessage={triggerWhatsApp} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer
        onSelectCategory={handleSelectCategory}
        onSelectSegment={handleSelectSegment}
        onNavigateContact={() => handleNavigateSection('contact')}
        onOpenWhatsAppGeneral={() =>
          triggerWhatsApp(
            `Assalam-o-Alaikum, I would like to enquire about decorative lighting at ${BRAND_CONFIG.businessName}.`
          )
        }
        onOpenLegal={(doc) => setLegalDoc(doc)}
      />

      {/* Interactive Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onViewDetails={(p) => setActiveProduct(p)}
        onEnquireWhatsApp={handleProductWhatsAppEnquiry}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onEnquireCartWhatsApp={handleCartWhatsAppEnquiry}
        onExploreShop={handleOpenShopAll}
      />

      <WishlistDrawer
        open={wishlistOpen}
        wishlistIds={wishlistIds}
        onClose={() => setWishlistOpen(false)}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onViewDetails={(p) => setActiveProduct(p)}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setActiveProduct(p)}
        onSelectCategory={handleSelectCategory}
      />

      <WhatsAppEnquiryModal
        message={whatsAppModalMessage}
        onClose={() => setWhatsAppModalMessage(null)}
      />

      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />

      {/* Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-[#181613] text-[#FAF8F4] border border-[#B68F48]/60 shadow-xl flex items-center gap-2.5 text-xs font-medium"
          >
            <Check className="w-4 h-4 text-[#D7B674]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Control */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
            }
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#181613] text-[#FAF8F4] border border-[#B68F48]/70 shadow-lg flex items-center justify-center hover:bg-[#8E6C2D] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
