import { useState, useRef } from 'react';
import { ChevronRight, Quote, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const CHAIR_VARIANTS = [
  { name: 'Black', src: '/images/Chairs/Chairs/Rattan Chair 890/890 black.webp' },
  { name: 'Brown', src: '/images/Chairs/Chairs/Rattan Chair 890/890 brown.webp' },
  { name: 'Red', src: '/images/Chairs/Chairs/Rattan Chair 890/890 red.webp' }
];

const MEGA_BUNNY_VARIANTS = [
  { name: 'Brown', src: '/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Brown.webp' },
  { name: 'Blue', src: '/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Blue.webp' },
  { name: 'Green', src: '/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA green.webp' },
  { name: 'Pink', src: '/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Pink.webp' },
  { name: 'White', src: '/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA White.webp' }
];

const categoryMap = [
  { id: 'dish-cabinets', name: 'Dish Cabinets' },
  { id: 'drawers', name: 'Drawers' },
  { id: 'storage-box', name: 'Storage Box' },
  { id: 'chairs', name: 'Chairs' },
  { id: 'tables', name: 'Tables' },
];

const CATEGORIES = categoryMap.map(cat => {
  let src = PRODUCTS.find(p => p.category === cat.id)?.mainImage || '';
  if (cat.id === 'chairs') src = '/images/Chairs/Chairs/Rattan Chair 890/890 brown.webp';
  if (cat.id === 'tables') src = '/images/Tables/Tables/8824/8824 beige.webp';
  
  return {
    id: cat.id,
    name: cat.name,
    src,
  };
});

const BESTSELLERS = [
  {
    number: "01",
    img: "/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Brown.webp",
    name: "Mega Bunny 3L",
    category: "Drawers & Cabinets",
    productId: "drawers-mega-bunny-3l"
  },
  {
    number: "02",
    img: "/images/Chairs/Chairs/101/101A beige.webp",
    name: "Dimple Chair",
    category: "Chairs",
    productId: "chairs-101-dimple-chair"
  },
  {
    number: "03",
    img: "/images/Tables/Tables/8824/8824 white.webp",
    name: "Rectangular Table",
    category: "Tables",
    productId: "tables-8824-rectangular-table"
  },
  {
    number: "04",
    img: "/images/Dish Cabinet/Dish Cabinet/8000/8000 blue3.webp",
    name: "Dish Cabinet",
    category: "Dish Cabinets",
    productId: "dish-cabinets-8000"
  },
  {
    number: "05",
    img: "/images/Storage Box/Storage Box/Colored/111-L green.webp",
    name: "Storage Box",
    category: "Storage Boxes",
    productId: "storage-box-111-l"
  }
];

export default function Home() {
  const [selectedVariant, setSelectedVariant] = useState(CHAIR_VARIANTS[0]);
  const [selectedMegaBunny, setSelectedMegaBunny] = useState(MEGA_BUNNY_VARIANTS[0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const [catScrollIdx, setCatScrollIdx] = useState(0);
  const [bestsellersScrollIdx, setBestsellersScrollIdx] = useState(0);
  const [drawersScrollIdx, setDrawersScrollIdx] = useState(0);
  const [chairsScrollIdx, setChairsScrollIdx] = useState(0);

  const testimonials = [
    {
      text: "Maliit lang yung dorm ko pero ang dami kong nailagay dahil sa drawer ng Bunny. Space-saver at hindi masyadong mahal. Love it!",
      name: "Divine C.",
      location: "Meycauayan"
    },
    {
      text: "Simula nung nag-reseller ako ng Bunny, tuloy-tuloy ang orders. Matibay kaya walang reklamo ang mga suki ko. Sulit ang puhunan!",
      name: "Mark Anthony R.",
      location: "Valenzuela"
    },
    {
      text: "Dati kinakabahan ako mag-simula kasi first business ko, natatakot ako baka hindi mabenta. Pero sobrang supportive ng team at matibay ang products, kaya walang reklamo ang mga customer ko. Salamat Bunny!",
      name: "Ken D.",
      location: "Davao City"
    },
    {
      text: "Ang ganda ng mga kulay at design ng dish cabinets nila. Bagay na bagay sa aesthetic ng kusina namin. Solid ang quality!",
      name: "Sarah L.",
      location: "Quezon City"
    },
    {
      text: "Nag-invest ako sa mga upuan nila para sa karinderya ko. Kahit araw-araw gamitin at minsan naiinitan, hindi madaling masira at hindi kumukupas ang kulay.",
      name: "Jason P.",
      location: "Cebu City"
    }
  ];

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (!testimonialsRef.current) return;
    const scrollAmount = 340;
    if (direction === 'left') {
      const newIndex = Math.max(0, activeTestimonial - 1);
      setActiveTestimonial(newIndex);
      testimonialsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      const newIndex = Math.min(testimonials.length - 1, activeTestimonial + 1);
      setActiveTestimonial(newIndex);
      testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleTestimonialScroll = () => {
    if (!testimonialsRef.current) return;
    const scrollPosition = testimonialsRef.current.scrollLeft;
    const cardWidth = testimonialsRef.current.clientWidth * 0.8;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex !== activeTestimonial && newIndex >= 0 && newIndex < testimonials.length) {
      setActiveTestimonial(newIndex);
    }
  };

  return (
    <div className="flex flex-col w-full bg-background">
      <section 
        className="relative w-full min-h-[90vh] bg-cover bg-center -mt-20 pt-32 pb-16 flex items-center" 
        style={{ backgroundImage: "url('/images/banners/banner1.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
        
        <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-6 z-20 -mt-10 text-center">
          <h1 className="text-[4.5rem] sm:text-[8rem] md:text-[11rem] leading-[0.85] font-logo text-background tracking-wide text-center mb-4 drop-shadow-md">
            BUNNY
          </h1>
          <h2 className="text-background text-lg sm:text-xl md:text-2xl font-sans mb-6 font-bold text-center drop-shadow-md">
            What's on your mind today?
          </h2>
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

        <div className="absolute bottom-0 left-0 w-full leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block transform translate-y-px">
            <path fill="#f8f9fa" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,64C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <section className="pt-4 md:pt-8 pb-24 md:pb-32 relative">
        <div className="w-full relative pt-4 md:pt-8 pb-8 z-20 bg-background overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10">
            <h2 className="text-4xl md:text-5xl font-logo uppercase text-center text-[#1A1A1A] mb-8 md:mb-16 tracking-widest">
              Shop by Category
            </h2>
            
            <div 
              onScroll={(e) => {
                const container = e.currentTarget;
                const idx = Math.min(CATEGORIES.length - 1, Math.max(0, Math.round(container.scrollLeft / (container.clientWidth * 0.44))));
                setCatScrollIdx(idx);
              }}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 md:gap-8 w-full md:grid md:grid-cols-3 lg:grid-cols-5 pb-4 px-2 -mx-2"
            >
              {CATEGORIES.map((cat, idx) => (
                <Link 
                  to={`/products?category=${cat.id}`} 
                  key={idx} 
                  className="w-[44vw] md:w-auto shrink-0 snap-start snap-always bg-white p-4 md:p-0 rounded-3xl md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-full h-36 md:h-48 flex items-center justify-center p-2 md:p-3 mb-2 md:mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                    <img src={cat.src} alt={cat.name} className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply drop-shadow-sm" />
                  </div>
                  <h4 className="text-lg md:text-2xl font-logo tracking-wider text-center text-[#1A1A1A] group-hover:text-primary transition-colors">{cat.name}</h4>
                </Link>
              ))}
            </div>

            {/* Mobile Swipe Indicator */}
            <div className="flex flex-col items-center gap-2 mt-4 md:hidden">
              <div className="flex items-center gap-1.5">
                {CATEGORIES.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`transition-all duration-300 rounded-full ${idx === catScrollIdx ? 'w-6 h-2 bg-[#1A1A1A]' : 'w-2 h-2 bg-slate-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-400 tracking-widest flex items-center gap-1 uppercase">
                &lt; Swipe &gt;
              </span>
            </div>

            {/* View All Products Button */}
            <div className="mt-12 md:mt-16 mb-12 md:mb-20 flex justify-center">
              <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group">
                View All Products
                <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Scattered Polaroid Gallery */}
          <div className="w-full relative pt-12 md:pt-16 -mb-4 flex justify-center items-center -space-x-6 sm:-space-x-10 md:-space-x-14 lg:-space-x-20 z-10">
            {[
              { src: '/images/Chairs/Chairs/101/101A beige.webp', rotate: '-rotate-12', translateY: 'translate-y-10 md:translate-y-16', zIndex: 'z-10', widthClass: 'w-24 sm:w-32 md:w-48 lg:w-60' },
              { src: '/images/Storage Box/Storage Box/Black/111-L black.webp', rotate: 'rotate-6', translateY: '-translate-y-2 md:-translate-y-4', zIndex: 'z-20', widthClass: 'w-24 sm:w-32 md:w-48 lg:w-60' },
              { src: '/images/Drawers & Cabinets/Drawers and Cabinets/Mega Bunny 3L/MEGA Brown.webp', rotate: 'rotate-0', translateY: '-translate-y-8 md:-translate-y-12', zIndex: 'z-50', widthClass: 'w-32 sm:w-48 md:w-64 lg:w-80' },
              { src: '/images/Dish Cabinet/Dish Cabinet/8000/8000 blue3.webp', rotate: '-rotate-6', translateY: 'translate-y-0 md:translate-y-2', zIndex: 'z-30', widthClass: 'w-24 sm:w-32 md:w-48 lg:w-60' },
              { src: '/images/Tables/Tables/1011 Bingo Rattan Table/1011 beige.webp', rotate: 'rotate-12', translateY: 'translate-y-8 md:translate-y-12', zIndex: 'z-20', widthClass: 'w-24 sm:w-32 md:w-48 lg:w-60' },
            ].map((item, index) => (
              <div 
                key={index}
                className={`${item.widthClass} bg-white p-1.5 sm:p-2 md:p-3 pb-6 sm:pb-8 md:pb-12 border border-[#E5E5E5] shrink-0 ${item.rotate} ${item.translateY} ${item.zIndex}`}
              >
                <div className="w-full aspect-square bg-[#F5F2F0] flex items-center justify-center overflow-hidden">
                  <img src={item.src} alt={`Gallery ${index}`} className="w-[90%] h-auto object-contain drop-shadow-sm" />
                </div>
              </div>
            ))}
          </div>

          {/* WAVY SVG BOTTOM CUTOUT */}
          <div className="absolute bottom-0 left-0 w-full leading-none z-20 pointer-events-none">
            <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block transform translate-y-px">
              <path fill="var(--color-primary)" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,64C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        {/* Latest Furniture Collection (OUR BESTSELLERS) */}
        <div className="relative overflow-hidden w-full bg-primary pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="container mx-auto px-6 md:px-12 xl:px-24">
          
          {/* Centered Massive Header */}
          <div className="flex flex-col items-center justify-center mb-10 text-center relative">
            <h2 className="text-5xl sm:text-7xl md:text-8xl xl:text-[10rem] font-logo tracking-wider uppercase text-center text-white pb-2 md:pb-8 leading-[0.9]">
              <span className="block">OUR</span>
              <span className="block">BESTSELLERS</span>
            </h2>
          </div>

          {/* Swipeable Bestseller Cards Layout */}
          <div 
            onScroll={(e) => {
              const container = e.currentTarget;
              const idx = Math.min(BESTSELLERS.length - 1, Math.max(0, Math.round(container.scrollLeft / (container.clientWidth * 0.8))));
              setBestsellersScrollIdx(idx);
            }}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-5 md:gap-8 pb-8 pt-4 w-full items-stretch"
          >
            {BESTSELLERS.map((item, idx) => (
              <Link 
                to={`/products/${item.productId}`}
                key={idx} 
                className="w-[80vw] sm:w-[320px] shrink-0 snap-center snap-always flex flex-col cursor-pointer group"
              >
                {/* External Number */}
                <span className="text-2xl font-logo text-white mb-3 ml-4">{item.number}</span>
                
                {/* The Card */}
                <div className="w-full bg-white rounded-[2.5rem] p-4 flex flex-col items-center group overflow-hidden relative shadow-sm aspect-4/5 transition-all duration-300 border-2 border-transparent group-hover:border-slate-200">
                  
                  {/* Image Container */}
                  <div className="w-full bg-[#F5F5F5] rounded-3xl grow flex items-center justify-center mb-4 overflow-hidden relative transition-all duration-300">
                    <img src={item.img} alt={item.name} className="object-contain w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  {/* Text Container */}
                  <div className="w-full flex flex-col items-start px-2 pb-2">
                    <h3 className="text-xl md:text-2xl font-logo tracking-widest text-[#1A1A1A] mb-1 uppercase line-clamp-1">{item.name}</h3>
                    <p className="text-xs md:text-sm text-slate-400 capitalize">{item.category}</p>
                    <div className="w-full mt-4">
                      <div className="w-full bg-transparent border-2 border-[#1A1A1A] text-[#1A1A1A] py-2.5 rounded-full font-bold uppercase tracking-widest text-xs group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">
                        View Details
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bestsellers Mobile Swipe Indicator */}
          <div className="flex flex-col items-center gap-2 mt-4 md:hidden">
            <div className="flex items-center gap-1.5">
              {BESTSELLERS.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`transition-all duration-300 rounded-full ${idx === bestsellersScrollIdx ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-white/80 tracking-widest flex items-center gap-1 uppercase">
              &lt; Swipe &gt;
            </span>
          </div>

          </div>

          {/* WAVY SVG BOTTOM CUTOUT RESTORED */}
          <div className="absolute bottom-0 left-0 w-full leading-none z-20 pointer-events-none">
            <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block transform translate-y-px">
              <path fill="#f8f9fa" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,64C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Feature Section (Mega Bunny 3L) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          
          {/* Image Composition */}
          <div className="relative w-full aspect-square max-h-72 sm:max-h-96 lg:max-h-none flex items-center justify-center my-2 lg:my-0 order-1 lg:order-2">
            <img 
              key={selectedMegaBunny.name}
              src={selectedMegaBunny.src} 
              alt={`Mega Bunny ${selectedMegaBunny.name}`} 
              className="relative z-10 h-[95%] sm:h-[110%] md:h-[130%] lg:h-[150%] w-auto max-w-none object-contain drop-shadow-2xl animate-subtle-fade" 
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-start max-w-lg order-2 lg:order-1">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2 md:mb-4 block">FEATURED PRODUCT</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-logo text-[#212529] mb-4 leading-[1.05] tracking-wide">
              Mega Bunny 3L
            </h2>
            
            {/* Color Selection */}
            <div className="mb-6 md:mb-8 w-full">
              <h3 className="text-[#1A1A1A] font-bold text-base md:text-lg mb-3">Color</h3>
              
              {/* Mobile View: 2 Colors + Explore More Link */}
              <div className="flex flex-wrap items-center gap-2 sm:hidden">
                {MEGA_BUNNY_VARIANTS.slice(0, 2).map((variant) => {
                  const isSelected = selectedMegaBunny.name === variant.name;
                  const bgClass = variant.name === 'Blue' ? 'bg-[#3B82F6]' 
                                : variant.name === 'Brown' ? 'bg-[#8B4513]'
                                : 'bg-[#F8F9FA]';
                  return (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedMegaBunny(variant)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all bg-white text-[#1A1A1A] font-medium text-xs ${isSelected ? 'border-primary shadow-sm scale-105' : 'border-slate-100'}`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${bgClass}`}></span>
                      {variant.name}
                    </button>
                  );
                })}
                <Link
                  to="/products/drawers-mega-bunny-3l"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-dashed border-slate-300 text-slate-600 font-bold text-xs hover:border-primary hover:text-primary transition-colors bg-white"
                >
                  + explore more colors
                </Link>
              </div>

              {/* Desktop View: All 5 Colors */}
              <div className="hidden sm:flex flex-wrap gap-3 md:gap-4">
                {MEGA_BUNNY_VARIANTS.map((variant) => {
                  const isSelected = selectedMegaBunny.name === variant.name;
                  const bgClass = variant.name === 'Blue' ? 'bg-[#3B82F6]' 
                                : variant.name === 'Green' ? 'bg-[#84CC16]' 
                                : variant.name === 'Pink' ? 'bg-[#ec4899]'
                                : variant.name === 'Brown' ? 'bg-[#8B4513]'
                                : 'bg-[#F8F9FA]';
                  return (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedMegaBunny(variant)}
                      className={`flex items-center gap-2.5 md:gap-3 px-5 md:px-6 py-2 md:py-2.5 rounded-full border-2 transition-all bg-white text-[#1A1A1A] font-medium text-sm md:text-base ${isSelected ? 'border-primary shadow-sm scale-105' : 'border-slate-100 hover:border-slate-200 hover:scale-105'}`}
                    >
                      <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${bgClass} ${variant.name === 'White' ? 'border border-gray-200' : ''}`}></span>
                      {variant.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-10 leading-relaxed font-medium">
              Brighten up any room with our Mega Bunny 3L series drawers. Combining a playful design with sturdy construction, these cabinets offer spacious and stylish storage solutions. Easy to clean and incredibly durable, they're the perfect addition to organize your home.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <Link to="/products/drawers-mega-bunny-3l" className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group">
                View Details
                <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="my-12 md:my-24 py-10 md:py-16 container mx-auto px-6 md:px-12 xl:px-24 bg-background">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-logo text-[#1A1A1A] mb-4">Explore More Drawers</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Discover our wide range of durable, stylish, and comfortable drawers perfect for any setting.
          </p>
        </div>
        
        <div 
          onScroll={(e) => {
            const container = e.currentTarget;
            const idx = Math.min(3, Math.max(0, Math.round(container.scrollLeft / (container.clientWidth * 0.8))));
            setDrawersScrollIdx(idx);
          }}
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 pb-4 snap-x snap-mandatory scrollbar-none px-2 -mx-2"
        >
          {[
            ...PRODUCTS.filter(p => p.id === 'drawers-golden-bunny-8828' || p.id === 'drawers-lucky-charm-5088'),
            ...PRODUCTS.filter(p => p.category === 'drawers' && p.id !== 'drawers-golden-bunny-8828' && p.id !== 'drawers-lucky-charm-5088').slice(0, 2)
          ].map((product) => {
            const displayImage = product.mainImage;
            return (
            <Link key={product.id} to={`/products/${product.id}`} className="group w-[82vw] sm:w-auto shrink-0 snap-center snap-always bg-white rounded-[2.5rem] p-4 flex flex-col items-center overflow-hidden relative shadow-sm aspect-4/5 transition-all duration-300 border-2 border-transparent hover:border-primary">
              <div className="w-full bg-[#F5F5F5] rounded-3xl grow flex items-center justify-center mb-4 overflow-hidden relative transition-all duration-300">
                <img 
                  src={displayImage} 
                  alt={product.name} 
                  className="object-contain w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="w-full flex flex-col items-start px-2 pb-2">
                <h3 className="text-xl md:text-2xl font-logo tracking-widest text-[#1A1A1A] mb-1 uppercase line-clamp-1">{product.name}</h3>
                {product.code && <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{product.code}</p>}
                <p className="text-xs md:text-sm text-slate-400 capitalize">{product.category}</p>
                <div className="w-full overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 mt-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-4">
                  <div className="w-full bg-transparent border-2 border-[#1A1A1A] text-[#1A1A1A] py-2.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:border-primary hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          )})}
        </div>

        <div className="flex flex-col items-center gap-2 mt-4 lg:hidden">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((idx) => (
              <span 
                key={idx} 
                className={`transition-all duration-300 rounded-full ${idx === drawersScrollIdx ? 'w-6 h-2 bg-[#1A1A1A]' : 'w-2 h-2 bg-slate-300'}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-400 tracking-widest flex items-center gap-1 uppercase">
            &lt; Swipe &gt;
          </span>
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/products?category=drawers" className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group">
            View All Drawers
            <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="relative w-full aspect-square flex items-center justify-center my-6 lg:my-0">
            <img 
              key={selectedVariant.name}
              src={selectedVariant.src} 
              alt={`890 ${selectedVariant.name}`} 
              className="relative z-10 h-full md:h-[110%] w-auto max-w-none object-contain drop-shadow-2xl scale-[1.1] translate-x-[-15%] translate-y-[10%] animate-subtle-fade" 
            />

            <svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              preserveAspectRatio="none"
            >
              <path 
                d="M 82 18 Q 108 50 82 82" 
                stroke="#1A1A1A" 
                strokeWidth="0.5" 
                fill="none" 
              />
            </svg>

            {CHAIR_VARIANTS.map((variant, index) => {
              const pos = [
                { left: '82%', top: '18%' },
                { left: '95%', top: '50%' },
                { left: '82%', top: '82%' },
              ][index];
              const isSelected = selectedVariant.name === variant.name;
              
              return (
                <div 
                  key={variant.name}
                  className={`absolute w-[20%] aspect-square -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center transition-all duration-300 rounded-full border-[3px] bg-white z-30 ${isSelected ? 'border-primary shadow-xl scale-110' : 'border-[#1A1A1A] shadow-md hover:scale-105'}`}
                  style={{ left: pos.left, top: pos.top }}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <img src={variant.src} alt={variant.name} className="w-[110%] max-w-none h-auto object-contain drop-shadow-sm transition-transform duration-300" />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-start max-w-lg">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">FEATURED PRODUCT</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-logo text-[#212529] mb-6 leading-[1.05] tracking-wide">
              Rattan 890 series
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Our classic 890 series features a highly resilient thermoplastic composition, engineered to withstand heavy use while maintaining its vibrant color. The chairs are perfectly stackable, incredibly easy to clean, and designed to incorporate seamless comfort into any space.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <Link to="/products/chairs-rattan-chair-890" className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group">
                View Details
                <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 container mx-auto px-6 md:px-12 xl:px-24">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-logo text-[#1A1A1A] mb-4">Explore More Chairs</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Discover our wide range of durable, stylish, and comfortable seating options perfect for any setting.
          </p>
        </div>
        
        <div 
          onScroll={(e) => {
            const container = e.currentTarget;
            const idx = Math.min(3, Math.max(0, Math.round(container.scrollLeft / (container.clientWidth * 0.8))));
            setChairsScrollIdx(idx);
          }}
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 pb-4 snap-x snap-mandatory scrollbar-none px-2 -mx-2"
        >
          {PRODUCTS.filter(p => p.category === 'chairs' && p.id !== 'chairs-198-diamond-stool').slice(0, 4).map((product, idx) => {
            const colors = ['green', 'white', 'beige', 'orange'];
            const displayImage = product.images.find(img => img.toLowerCase().includes(colors[idx])) || product.mainImage;
            return (
            <Link key={product.id} to={`/products/${product.id}`} className="group w-[82vw] sm:w-auto shrink-0 snap-center snap-always bg-white rounded-[2.5rem] p-4 flex flex-col items-center overflow-hidden relative shadow-sm aspect-4/5 transition-all duration-300 border-2 border-transparent hover:border-primary">
              <div className="w-full bg-[#F5F5F5] rounded-3xl grow flex items-center justify-center mb-4 overflow-hidden relative transition-all duration-300">
                <img 
                  src={displayImage} 
                  alt={product.name} 
                  className="object-contain w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="w-full flex flex-col items-start px-2 pb-2">
                <h3 className="text-xl md:text-2xl font-logo tracking-widest text-[#1A1A1A] mb-1 uppercase line-clamp-1">{product.name}</h3>
                  {product.code && <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{product.code}</p>}
                  <p className="text-xs md:text-sm text-slate-400 capitalize">{product.category}</p>
                <div className="w-full overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 mt-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-4">
                  <button className="w-full bg-transparent border-2 border-[#1A1A1A] text-[#1A1A1A] py-2.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:border-primary hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Link>
          )})}
        </div>

        <div className="flex flex-col items-center gap-2 mt-4 lg:hidden">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((idx) => (
              <span 
                key={idx} 
                className={`transition-all duration-300 rounded-full ${idx === chairsScrollIdx ? 'w-6 h-2 bg-[#1A1A1A]' : 'w-2 h-2 bg-slate-300'}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-400 tracking-widest flex items-center gap-1 uppercase">
            &lt; Swipe &gt;
          </span>
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group">
            View All Chairs
            <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="w-full bg-primary pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full leading-none z-20 pointer-events-none rotate-180">
          <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block transform translate-y-px">
            <path fill="#f8f9fa" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,64C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-30">
          
          <div className="w-full mb-12 max-w-5xl">
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-white mb-6 fill-current" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-logo text-white tracking-wide mb-4">
              Pinagkakatiwalaan ng Bawat Pamilya
            </h2>
            <p className="text-slate-100 text-sm md:text-base max-w-lg leading-relaxed">
              Specializing in delivering exceptional seating and storage solutions, we advocate for comfort, quality, and timeless design in every space.
            </p>
          </div>

          <div 
            ref={testimonialsRef}
            onScroll={handleTestimonialScroll}
            className="flex overflow-x-auto gap-5 md:gap-8 pb-8 snap-x snap-mandatory scrollbar-none w-full scroll-smooth"
          >
            {testimonials.map((t, i) => {
              return (
              <div 
                key={i} 
                className="group shrink-0 w-[82vw] sm:w-100 md:w-112.5 p-6 md:p-12 rounded-3xl snap-center flex flex-col justify-between min-h-72 md:min-h-87.5 transition-colors duration-500 bg-white hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-slate-100 shadow-sm hover:shadow-xl"
              >
                <p className="text-lg md:text-3xl leading-snug tracking-tight mb-8 md:mb-12 transition-colors duration-500 text-[#1A1A1A] group-hover:text-white">
                  {t.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t.name}</span>
                    <span className="text-xs transition-colors duration-500 text-slate-500 group-hover:text-gray-400">{t.location}</span>
                  </div>
                </div>
              </div>
            )})}
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex gap-2">
              <button 
                onClick={() => scrollTestimonials('left')}
                disabled={activeTestimonial === 0}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white text-primary rounded-full transition-colors ${activeTestimonial === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button 
                onClick={() => scrollTestimonials('right')}
                disabled={activeTestimonial === testimonials.length - 1}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white text-primary rounded-full transition-colors ${activeTestimonial === testimonials.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 sm:hidden">
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`transition-all duration-300 rounded-full ${idx === activeTestimonial ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-white/80 tracking-widest flex items-center gap-1 uppercase">
                &lt; Swipe &gt;
              </span>
            </div>

            <div className="flex-1 max-w-sm ml-8 h-1 bg-black/20 rounded-full overflow-hidden hidden sm:block relative">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${((activeTestimonial + 1) / testimonials.length) * 100}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Wavy SVG Bottom Cutout */}
        <div className="absolute bottom-0 left-0 w-full leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block transform translate-y-px">
            <path fill="#f8f9fa" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,64C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </div>
  );
}
