import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Cpu, CheckCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Vehicles } from './pages/Vehicles';
import { Energy } from './pages/Energy';
import { Shop } from './pages/Shop';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  details: string;
  quantity: number;
}

function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shopCategory, setShopCategory] = useState<string>('All');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('plug_it_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('plug_it_cart', JSON.stringify(newCart));
  };

  const addToCart = (newItem: { id: string; name: string; price: number; image: string; details: string }) => {
    const existingIdx = cart.findIndex((item) => item.id === newItem.id);
    if (existingIdx > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIdx].quantity += 1;
      saveCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...newItem, quantity: 1 }];
      saveCart(updatedCart);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updatedCart);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setCheckoutStep(0);

    // Simulate multi-step futuristic checkout process
    const steps = [
      'Securing vehicle quota allocation...',
      'Verifying power grid node configuration...',
      'Encrypting payment via decentralized keys...',
      'Finalizing delivery contract...',
      'Order Complete!',
    ];

    const timer = setInterval(() => {
      setCheckoutStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          // Empty cart
          saveCart([]);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setShopCategory={setShopCategory} />;
      case 'vehicles':
        return <Vehicles addToCart={addToCart} setActivePage={setActivePage} />;
      case 'energy':
        return <Energy setActivePage={setActivePage} />;
      case 'shop':
        return <Shop addToCart={addToCart} setIsCartOpen={setIsCartOpen} initialCategory={shopCategory} setInitialCategory={setShopCategory} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Navbar component */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Page Transition Layer */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="flex-grow w-full"
        >
          {renderActivePage()}
        </motion.main>
      </AnimatePresence>

      {/* Footer (Only on sub-pages) */}
      {activePage !== 'home' && <Footer setActivePage={setActivePage} />}

      {/* Global Cart Slideout Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Drawer Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Cart Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-black/95 backdrop-blur-2xl border-l border-white/5 z-50 p-8 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-[0.2em] text-sm">YOUR CART</span>
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/60">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items Container */}
              <div className="flex-grow overflow-y-auto py-6 flex flex-col gap-6 scrollbar-none">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-white/40">
                    <Trash2 className="h-10 w-10 text-white/20" />
                    <p className="text-sm font-light tracking-wide">Your cart is currently empty</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActivePage('shop');
                      }}
                      className="px-6 py-2 border border-white/15 hover:border-white text-xs font-semibold tracking-wider rounded-xl hover:bg-white/5 text-white transition-all duration-300 cursor-pointer"
                    >
                      BROWSE GEAR
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-xl bg-white/3 border border-white/5 relative group hover:border-white/10 transition-all duration-300"
                    >
                      {/* Product Placeholder Graphic */}
                      <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center text-white/20 border border-white/5 font-semibold text-xs flex-shrink-0">
                        {item.name.split(' ').slice(0, 2).join(' ')}
                      </div>

                      {/* Detail Info */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-sm tracking-wide text-white">
                              {item.name}
                            </span>
                            <span className="font-bold text-sm text-white/90">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/40 font-light mt-1 max-w-[200px] truncate">
                            {item.details}
                          </p>
                        </div>

                        {/* Increment / Decrement Counter */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-6 w-6 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-medium text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-6 w-6 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute right-4 bottom-4 p-1.5 text-white/30 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-300 cursor-pointer focus:outline-none"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Order Footer & Price Summary */}
              {cart.length > 0 && (
                <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5 text-xs text-white/50">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery & Setup</span>
                      <span className="text-emerald-400 font-semibold uppercase">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regulatory Taxes</span>
                      <span className="text-white font-medium">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline py-2 border-t border-white/5">
                    <span className="font-bold text-sm">TOTAL</span>
                    <span className="text-2xl font-bold text-white tracking-tight">
                      ${cartSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="btn-glow w-full py-4 rounded-xl text-xs font-bold tracking-widest bg-white text-black hover:bg-white/95 transition-all duration-300 focus:outline-none cursor-pointer"
                  >
                    PLACE ORDER
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Screen Overlay */}
      <AnimatePresence>
        {isCheckingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center text-center p-8"
          >
            {checkoutStep < 4 ? (
              <div className="flex flex-col items-center gap-6">
                {/* Custom futuristic loading circle */}
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <span className="absolute inset-0 border-4 border-white/10 rounded-full"></span>
                  <span className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                  <Cpu className="h-6 w-6 text-white/80 animate-pulse" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold tracking-[0.2em] text-white/90">TRANSACTING</h3>
                  <p className="text-xs font-light text-white/40 tracking-wider h-4">
                    {checkoutStep === 0 && 'Securing vehicle quota allocation...'}
                    {checkoutStep === 1 && 'Verifying power grid node configuration...'}
                    {checkoutStep === 2 && 'Encrypting payment via decentralized keys...'}
                    {checkoutStep === 3 && 'Finalizing delivery contract...'}
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center gap-6 max-w-md"
              >
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-bounce">
                  <CheckCircle className="h-12 w-12 text-emerald-400" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold tracking-[0.1em] text-white">ORDER PROCESSED</h3>
                  <span className="text-xs tracking-[0.2em] text-white/40 uppercase font-semibold">
                    Congratulations
                  </span>
                  <p className="text-sm font-light text-white/60 leading-relaxed mt-4">
                    Thank you for ordering with **PLUG IT**. We have secured your quota and sent a configuration contract to your email. Together, we are accelerating the transition to sustainable energy.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCheckingOut(false);
                    setIsCartOpen(false);
                    setActivePage('home');
                  }}
                  className="btn-glow mt-8 px-8 py-3 rounded-xl text-xs font-bold tracking-wider bg-white text-black hover:bg-white/90 transition-all duration-300 focus:outline-none cursor-pointer"
                >
                  RETURN TO HOME
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
