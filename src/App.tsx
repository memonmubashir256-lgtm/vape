import { useMemo, useState } from 'react';
import { OXVA_PRODUCTS, type OxvaProduct, type ProductCategory } from './data/oxvaCatalog';
import {
  addItemToCart,
  calculateCartTotals,
  filterOxvaProducts,
  updateCartItemQuantity,
  type CartItem,
} from './utils/storeLogic';
import { AgeGateModal } from './components/AgeGateModal';
import { Navbar } from './components/Navbar';
import { HeroShowcase } from './components/HeroShowcase';
import { ProductGrid } from './components/ProductGrid';
import { UnitechEngineering } from './components/UnitechEngineering';
import { AuthenticityVerifier } from './components/AuthenticityVerifier';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

function getInitialAgeVerified(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('autostart') === '1') return true;
  try {
    return window.sessionStorage.getItem('oxva_age_verified') === 'true';
  } catch {
    return false;
  }
}

export default function App() {
  const [ageVerified, setAgeVerified] = useState<boolean>(getInitialAgeVerified);
  const [ageDeclined, setAgeDeclined] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeProduct, setActiveProduct] = useState<OxvaProduct | null>(null);
  const [activeInitialColor, setActiveInitialColor] = useState<string | undefined>(undefined);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const flagshipProduct = OXVA_PRODUCTS[0];
  const filteredProducts = useMemo(
    () => filterOxvaProducts(OXVA_PRODUCTS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const totals = useMemo(() => calculateCartTotals(cart), [cart]);

  const handleConfirmAge = () => {
    setAgeDeclined(false);
    setAgeVerified(true);
    try {
      window.sessionStorage.setItem('oxva_age_verified', 'true');
    } catch {
      // Ignore storage failures in restricted browsers
    }
  };

  const handleConfigureProduct = (product: OxvaProduct, colorName?: string) => {
    setActiveProduct(product);
    setActiveInitialColor(colorName);
  };

  const handleQuickAdd = (product: OxvaProduct) => {
    const defaultColor = product.colors[0];
    const defaultPod = product.podOptions[0];
    setCart((prev) =>
      addItemToCart(prev, {
        productId: product.id,
        name: product.name,
        image: product.image,
        colorName: defaultColor.name,
        colorHex: defaultColor.hex,
        podResistance: defaultPod.resistance,
        unitPrice: product.price,
        quantity: 1,
      })
    );
    setIsBagOpen(true);
  };

  const handleModalAddToBag = (payload: {
    product: OxvaProduct;
    colorName: string;
    colorHex: string;
    podResistance: string;
    quantity: number;
  }) => {
    setCart((prev) =>
      addItemToCart(prev, {
        productId: payload.product.id,
        name: payload.product.name,
        image: payload.product.image,
        colorName: payload.colorName,
        colorHex: payload.colorHex,
        podResistance: payload.podResistance,
        unitPrice: payload.product.price,
        quantity: payload.quantity,
      })
    );
    setActiveProduct(null);
    setIsBagOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F4F4F5]">
      {!ageVerified && (
        <AgeGateModal
          onConfirm={handleConfirmAge}
          onDecline={() => setAgeDeclined(true)}
          declined={ageDeclined}
        />
      )}

      <Navbar
        bagCount={totals.itemCount}
        onOpenBag={() => setIsBagOpen(true)}
        onNavigateCategory={(cat) => setSelectedCategory(cat)}
      />

      <main className="flex-1">
        <HeroShowcase
          flagship={flagshipProduct}
          onConfigureFlagship={(colorName) =>
            handleConfigureProduct(flagshipProduct, colorName)
          }
        />

        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onSelectProduct={(product) => handleConfigureProduct(product)}
          onQuickAdd={handleQuickAdd}
        />

        <UnitechEngineering
          products={OXVA_PRODUCTS}
          onSelectProduct={(product) => handleConfigureProduct(product)}
        />

        <AuthenticityVerifier />
      </main>

      <Footer />

      <ProductDetailModal
        product={activeProduct}
        initialColorName={activeInitialColor}
        onClose={() => setActiveProduct(null)}
        onAddToBag={handleModalAddToBag}
      />

      <CartDrawer
        isOpen={isBagOpen}
        items={cart}
        onClose={() => setIsBagOpen(false)}
        onUpdateQuantity={(key, delta) =>
          setCart((prev) => updateCartItemQuantity(prev, key, delta))
        }
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
