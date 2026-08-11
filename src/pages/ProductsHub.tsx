import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COLOR_MAP } from '../constants/colors';

export default function ProductsHub() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'chairs');
  const [selectedColor, setSelectedColor] = useState('All Colors');
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'A-Z' | 'Z-A'>('A-Z');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const categoryProducts = PRODUCTS.filter(p => p.category === activeCategory);
  const availableColors = ['All Colors', ...new Set(categoryProducts.flatMap(p => p.colors || []))].filter(c => c.toLowerCase() !== 'platinum').sort();
  const filteredProducts = categoryProducts
    .filter(p => selectedColor === 'All Colors' || p.colors?.includes(selectedColor))
    .sort((a, b) => sortBy === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">

      
      {/* Hero Section */}
      <section 
        className="relative w-full min-h-[50vh] md:min-h-[60vh] bg-cover bg-center flex flex-col items-center justify-center pt-20 -mt-20" 
        style={{ backgroundImage: "url('/images/banners/banner2.webp')" }}
      >
        <div className="flex flex-col items-center z-30 w-full text-center mt-10">
          <h2 className="text-[5rem] sm:text-[8rem] md:text-[11rem] leading-[0.8] font-logo text-white tracking-tighter -mb-6 md:-mb-10 relative z-0">BUNNY</h2>
          
          <div className="w-full max-w-xl px-6 relative z-10">
            <div className="relative flex items-center w-full h-14 md:h-16 rounded-full focus-within:shadow-xl bg-white overflow-hidden shadow-lg ring-2 ring-transparent hover:ring-[#1A1A1A] transition-all duration-300">
              <div className="grid place-items-center h-full w-16 text-gray-300">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                className="peer h-full w-full outline-none text-sm md:text-base text-gray-700 pr-6 font-medium"
                type="text"
                id="search"
                placeholder="Search for furniture, collections..." 
              />
            </div>
          </div>
        </div>
      </section>



      {/* Top Categories Navigation */}
      <div className="w-full bg-background border-b border-slate-200 pt-8 pb-0 overflow-x-auto scrollbar-none">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-center min-w-max gap-4 md:gap-10">
            <button 
              onClick={() => { setActiveCategory('storage-box'); setSelectedColor('All Colors'); }}
              className={`flex flex-col items-center justify-center w-32 md:w-40 pb-6 border-b-2 transition-colors group ${activeCategory === 'storage-box' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <img src="https://img.icons8.com/ios/50/box--v1.webp" alt="Storage Box" className="w-7 h-7 md:w-8 md:h-8 mb-3 opacity-60 group-hover:opacity-100 transition-opacity" style={{ filter: activeCategory === 'storage-box' ? 'opacity(1) brightness(0)' : 'brightness(0) opacity(0.6)' }} />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">Storage Box</span>
            </button>
            <button 
              onClick={() => { setActiveCategory('chairs'); setSelectedColor('All Colors'); }}
              className={`flex flex-col items-center justify-center w-32 md:w-40 pb-6 border-b-2 transition-colors group ${activeCategory === 'chairs' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <img src="https://img.icons8.com/ios/50/chair.webp" alt="Chairs" className="w-7 h-7 md:w-8 md:h-8 mb-3 opacity-60 group-hover:opacity-100 transition-opacity" style={{ filter: activeCategory === 'chairs' ? 'opacity(1) brightness(0)' : 'brightness(0) opacity(0.6)' }} />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">Chairs</span>
            </button>
            <button 
              onClick={() => { setActiveCategory('dish-cabinets'); setSelectedColor('All Colors'); }}
              className={`flex flex-col items-center justify-center w-32 md:w-40 pb-6 border-b-2 transition-colors group ${activeCategory === 'dish-cabinets' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <img src="https://img.icons8.com/ios/50/meal.webp" alt="Dish Cabinets" className="w-7 h-7 md:w-8 md:h-8 mb-3 opacity-60 group-hover:opacity-100 transition-opacity" style={{ filter: activeCategory === 'dish-cabinets' ? 'opacity(1) brightness(0)' : 'brightness(0) opacity(0.6)' }} />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">Dish Cabinets</span>
            </button>
            <button 
              onClick={() => { setActiveCategory('drawers'); setSelectedColor('All Colors'); }}
              className={`flex flex-col items-center justify-center w-32 md:w-40 pb-6 border-b-2 transition-colors group ${activeCategory === 'drawers' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <img src="https://img.icons8.com/ios/50/bureau.webp" alt="Drawers" className="w-7 h-7 md:w-8 md:h-8 mb-3 opacity-60 group-hover:opacity-100 transition-opacity" style={{ filter: activeCategory === 'drawers' ? 'opacity(1) brightness(0)' : 'brightness(0) opacity(0.6)' }} />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">Drawers</span>
            </button>
            <button 
              onClick={() => { setActiveCategory('tables'); setSelectedColor('All Colors'); }}
              className={`flex flex-col items-center justify-center w-32 md:w-40 pb-6 border-b-2 transition-colors group ${activeCategory === 'tables' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <img src="https://img.icons8.com/ios/50/table.webp" alt="Tables" className="w-7 h-7 md:w-8 md:h-8 mb-3 opacity-60 group-hover:opacity-100 transition-opacity" style={{ filter: activeCategory === 'tables' ? 'opacity(1) brightness(0)' : 'brightness(0) opacity(0.6)' }} />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">Tables</span>
            </button>
          </div>
        </div>
      </div>



      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-12 xl:px-24 py-16">

        
        {/* Header row */}
        <div className="flex flex-col items-center justify-center mb-6 gap-2">
          {activeCategory === 'storage-box' && <img src="https://img.icons8.com/ios/50/box--v1.webp" alt="Storage Box" className="w-12 h-12 md:w-16 md:h-16" style={{ filter: 'brightness(0)' }} />}
          {activeCategory === 'chairs' && <img src="https://img.icons8.com/ios/50/chair.webp" alt="Chairs" className="w-12 h-12 md:w-16 md:h-16" style={{ filter: 'brightness(0)' }} />}
          {activeCategory === 'dish-cabinets' && <img src="https://img.icons8.com/ios/50/meal.webp" alt="Dish Cabinets" className="w-12 h-12 md:w-16 md:h-16" style={{ filter: 'brightness(0)' }} />}
          {activeCategory === 'drawers' && <img src="https://img.icons8.com/ios/50/bureau.webp" alt="Drawers" className="w-12 h-12 md:w-16 md:h-16" style={{ filter: 'brightness(0)' }} />}
          {activeCategory === 'tables' && <img src="https://img.icons8.com/ios/50/table.webp" alt="Tables" className="w-12 h-12 md:w-16 md:h-16" style={{ filter: 'brightness(0)' }} />}
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-logo tracking-widest text-[#1A1A1A] uppercase text-center mt-4">
            {activeCategory.replace('-', ' ')}
          </h1>
        </div>


      {/* Filters Bar */}
      <div className="w-full py-4 mb-16 bg-white hidden md:block z-30 relative">
        <div className="container mx-auto px-6 md:px-12 xl:px-24">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#1A1A1A] font-medium">
            
            {/* Color Filter */}
            <div className="flex items-center gap-2 relative">
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
              >
                <span>{selectedColor === 'All Colors' ? 'Choose Colors' : `Color: ${selectedColor}`}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-[#1A1A1A] transition-transform ${isColorDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isColorDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsColorDropdownOpen(false)}></div>
                  <div className="absolute top-full right-0 md:left-0 md:right-auto mt-3 w-[320px] md:w-100 bg-white border border-slate-100 shadow-xl rounded-2xl p-5 z-50">
                    <h4 className="text-base font-bold text-[#1A1A1A] mb-4">Colors</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {availableColors.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            setIsColorDropdownOpen(false);
                          }}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${selectedColor === color ? 'bg-slate-100 ring-1 ring-slate-200 shadow-sm' : 'bg-[#f4f5f7] hover:bg-slate-100 text-slate-700'}`}
                        >
                          {color !== 'All Colors' && (
                            <div 
                              className="w-3.5 h-3.5 rounded-full shadow-inner ring-1 ring-black/5" 
                              style={{ backgroundColor: COLOR_MAP[color] || '#e5e7eb' }} 
                            />
                          )}
                          {color === 'All Colors' ? 'Any Colors' : color}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="h-6 w-px bg-slate-200"></div>
            
            {/* Sort Filter */}
            <div className="flex items-center gap-2 relative">
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                <span className="text-[#1A1A1A]">Sort: Model ({sortBy})</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-[#1A1A1A] transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isSortDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSortDropdownOpen(false)}></div>
                  <div className="absolute top-full right-0 mt-3 w-50 bg-white border border-slate-100 shadow-xl rounded-xl py-2 z-50">
                    <button
                      onClick={() => { setSortBy('A-Z'); setIsSortDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${sortBy === 'A-Z' ? 'bg-slate-50 text-[#1A1A1A]' : 'text-slate-500 hover:bg-slate-50 hover:text-[#1A1A1A]'}`}
                    >
                      Model (A-Z)
                    </button>
                    <button
                      onClick={() => { setSortBy('Z-A'); setIsSortDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${sortBy === 'Z-A' ? 'bg-slate-50 text-[#1A1A1A]' : 'text-slate-500 hover:bg-slate-50 hover:text-[#1A1A1A]'}`}
                    >
                      Model (Z-A)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>



        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map(product => {
            const defaultImageIndex = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % (product.images.length || 1);
            const randomDefaultImage = product.images.length > 0 ? product.images[defaultImageIndex] : product.mainImage;

            const displayImage = selectedColor === 'All Colors' 
              ? randomDefaultImage 
              : (product.images.find(img => img.toLowerCase().includes(selectedColor.toLowerCase())) || product.mainImage);

            return (
              <Link key={product.id} to={`/products/${product.id}`} className="group flex flex-col items-center cursor-pointer">
                <div className="w-full h-52 md:h-60 mb-6 flex items-center justify-center p-3 bg-[#F8F9FA]/80 rounded-2xl border border-slate-100/50">
                  <img 
                    src={displayImage} 
                    alt={product.name || product.code} 
                    className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm" 
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-logo tracking-widest uppercase text-[#1A1A1A] group-hover:text-primary transition-colors mb-1 text-center">{product.name || product.code}</h3>
                {product.code && <p className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center">{product.code}</p>}
              </Link>
            );
          })}
        </div>

      </div>

    </div>
  );
}

function ChevronDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
