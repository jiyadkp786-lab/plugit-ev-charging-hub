import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Eye, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  desc: string;
  specs: string[];
  graphic: string; // Tailwind gradient & representation
}

interface ShopProps {
  addToCart: (item: { id: string; name: string; price: number; image: string; details: string }) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  initialCategory?: string;
  setInitialCategory?: (category: string) => void;
}

export const Shop: React.FC<ShopProps> = ({
  addToCart,
  initialCategory = 'All',
  setInitialCategory,
}) => {
  const products: Product[] = [
    {
      id: 'wall-connector',
      name: 'Plug It Wall Connector',
      price: 450,
      category: 'Charging',
      desc: 'The ultimate home charging solution. Up to 44 miles of range added per hour, featuring a clean glass-face design and smart auto-power sharing features.',
      specs: ['Up to 48A output', 'Wi-Fi enabled for updates', '24-foot cable length', 'Indoor/outdoor rated'],
      graphic: 'from-sky-700 to-indigo-900',
    },
    {
      id: 'mobile-connector',
      name: 'Mobile Connector Bundle',
      price: 250,
      category: 'Charging',
      desc: 'Sleek travel companion for charging from standard wall outlets. Includes adapters for household 120V NEMA 5-15 and high-power 240V NEMA 14-50 outlets.',
      specs: ['Up to 32A charging output', 'Compact carrying bag included', 'Dual adapter plugs'],
      graphic: 'from-slate-700 to-slate-900',
    },
    {
      id: 'cybermug',
      name: 'Stainless Steel CyberMug',
      price: 90,
      category: 'Lifestyle',
      desc: 'Inspired by the sharp geometric contours of the Cybertruck. Built from dual-wall vacuum-insulated industrial stainless steel with a sleek matte finish.',
      specs: ['16 oz capacity', 'Vacuum-insulated thermal retention', 'Dishwasher safe', 'Ergonomic structural handle'],
      graphic: 'from-neutral-700 to-zinc-900',
    },
    {
      id: 'plaid-jacket',
      name: 'Plaid Track Jacket',
      price: 180,
      category: 'Lifestyle',
      desc: 'Premium athletic jacket commemorating the Plaid launch. Made from waterproof tech-shell materials with carbon-weave patterns and high-performance zippers.',
      specs: ['Wind/Water-resistant shell', 'Ventilated mesh underarms', 'Carbon fiber design print', 'Hidden interior pockets'],
      graphic: 'from-rose-950 to-neutral-900',
    },
    {
      id: 'all-weather-mats',
      name: 'Model Y All-Weather Mats',
      price: 190,
      category: 'Accessories',
      desc: 'Extreme-durability thermoplastic elastomer floor liners customized specifically for Model Y contours. Engineered to capture mud, snow, and spills.',
      specs: ['100% recyclable material', 'High-wall spill protection', 'Non-slip backing cleats', 'Set of 3 liners'],
      graphic: 'from-amber-950 to-neutral-900',
    },
    {
      id: 'cybertent',
      name: 'Cybertruck CyberTent',
      price: 2800,
      category: 'Accessories',
      desc: 'Integrated rooftop camping tent tailored to mount seamlessly over the Cybertruck vault. Includes a dense memory foam mattress and self-expanding frame.',
      specs: ['Self-expanding gas struts', 'Ultra-breathable canvas fabric', 'Fits 2 adults comfortably', 'Folds flat under vault cover'],
      graphic: 'from-yellow-800 to-zinc-800',
    },
  ];

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [successItem, setSuccessItem] = useState<string | null>(null);

  React.useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const categories = ['All', 'Charging', 'Lifestyle', 'Accessories'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: '', // Represent empty image for custom visual container in cart
      details: `${product.category} Equipment`,
    });
    setSuccessItem(product.id);
    setTimeout(() => {
      setSuccessItem(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-6 mb-12 gap-6">
        <div>
          <span className="text-xs tracking-[0.25em] text-white/50 uppercase font-semibold">
            Premium Gear & Hardware
          </span>
          <h1 className="text-4xl font-extrabold tracking-wide uppercase text-white mt-1">
            PLUG IT SHOP
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-full py-2.5 pl-11 pr-5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors duration-300"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto flex justify-start items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              if (setInitialCategory) {
                setInitialCategory(cat);
              }
            }}
            className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none ${
              activeCategory === cat
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-white/15 transition-all duration-500 flex flex-col justify-between group"
          >
            {/* Visual Header */}
            <div className={`h-48 bg-gradient-to-tr ${product.graphic} relative flex items-center justify-center p-6 transition-transform duration-500`}>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Abstract Representation Box */}
              <div className="w-28 h-28 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="h-8 w-8 text-white/80 mb-2" />
                <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase">
                  {product.category}
                </span>
              </div>

              {/* Float Hover Actions */}
              <div className="absolute bottom-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="p-2 bg-black/80 hover:bg-black text-white rounded-full border border-white/10 cursor-pointer focus:outline-none"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-lg tracking-wide text-white group-hover:text-white transition-colors duration-300">
                    {product.name}
                  </h3>
                  <span className="text-md font-bold text-white/90">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-white/50 font-light line-clamp-2 leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 border focus:outline-none cursor-pointer ${
                    successItem === product.id
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white hover:text-black hover:border-white'
                  }`}
                >
                  {successItem === product.id ? 'ADDED TO ORDER' : 'ADD TO CART'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className={`h-40 bg-gradient-to-tr ${selectedProduct.graphic} flex items-center justify-center`}>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white">
                  {selectedProduct.name}
                </h3>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-[10px] uppercase font-bold tracking-widest">
                    {selectedProduct.category}
                  </span>
                  <span className="text-2xl font-extrabold text-white">
                    ${selectedProduct.price.toLocaleString()}
                  </span>
                </div>

                <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                  {selectedProduct.desc}
                </p>

                <h4 className="text-xs uppercase font-bold tracking-widest text-white/40 mb-3">
                  Specifications
                </h4>
                <ul className="flex flex-col gap-2 mb-8">
                  {selectedProduct.specs.map((spec, i) => (
                    <li key={i} className="text-xs text-white/60 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="btn-glow flex-grow py-3.5 rounded-xl text-xs font-semibold tracking-wider bg-white text-black hover:bg-white/95 transition-all duration-300 cursor-pointer"
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300 cursor-pointer"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
