import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, ArrowRight, Megaphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import { Button } from '../components/ui/Button';
export default function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isQuotePage = location.pathname === '/quote';
  const isWhiteBgPage = location.pathname.startsWith('/distributors') || location.pathname.startsWith('/products') || location.pathname.startsWith('/about');

  return (
    <div className={`min-h-screen flex flex-col relative ${isWhiteBgPage ? 'bg-white' : 'bg-background'}`}>
      <style>{`
        .notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 140px;
          height: 110px;
          background-color: white;
          border-bottom-left-radius: 70px;
          border-bottom-right-radius: 70px;
          z-index: -1;
        }
        .notch::before, .notch::after {
          content: '';
          position: absolute;
          top: 0;
          width: 30px;
          height: 30px;
          background-color: transparent;
        }
        .notch::before {
          left: -30px;
          border-top-right-radius: 30px;
          box-shadow: 15px -15px 0 0 white;
        }
        .notch::after {
          right: -30px;
          border-top-left-radius: 30px;
          box-shadow: -15px -15px 0 0 white;
        }
      `}</style>

      {!isQuotePage && (
        <>
          <header className="sticky top-0 z-50 w-full flex flex-col">
            {/* Announcement Strip */}
            <div className="w-full bg-primary text-white py-2 flex items-center justify-center text-[10px] md:text-xs font-bold tracking-widest uppercase relative z-50">
              <Megaphone size={14} className="mr-2 inline-block" />
              <span>
                We're looking for distributors{' '}
                <Link to="/distributors" className="underline hover:text-slate-200 transition-colors">
                  Apply Here
                </Link>
              </span>
            </div>
            <div className="w-full bg-white h-20 relative flex items-center justify-between px-6 md:px-12 xl:px-24">
              
              {/* The Notch Background */}
              <div className="notch hidden md:block"></div>

              {/* Universal Left Navigation (Hamburger Menu) */}
              <div className="flex-1 flex justify-start items-center">
                <button 
                  className="min-h-11 min-w-11 flex items-center gap-3 text-foreground hover:text-primary transition-colors group cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open Menu"
                >
                  <Menu className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                  <span className="hidden md:block text-sm font-bold tracking-widest uppercase mt-1">Menu</span>
                </button>
              </div>

              {/* Logo inside the notch */}
              <div className="shrink-0 flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2 top-0 h-27.5 w-35 pointer-events-auto z-10 pt-2 pb-4">
                <Link to="/" className="w-full h-full flex items-center justify-center">
                  <img src="/images/brand/bunnylogo.webp" alt="BunnyPlastics Logo" className="h-full w-auto max-w-full object-contain mix-blend-multiply rounded-full" />
                </Link>
              </div>

              {/* Universal Right Navigation (Cart) */}
              <div className="flex flex-1 items-center justify-end">
                <button 
                  onClick={() => setIsCartOpen(true)} 
                  className="relative p-2 text-foreground hover:text-primary transition-colors cursor-pointer group flex items-center gap-3"
                  aria-label="Open Cart"
                >
                  <span className="hidden md:block text-sm font-bold tracking-widest uppercase mt-1">Cart</span>
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* Menu Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/60 z-90 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Side Drawer Menu */}
          <div 
            className={`fixed top-0 left-0 h-full w-[85vw] max-w-100 bg-white z-100 shadow-2xl flex flex-col px-8 md:px-10 py-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-6 md:right-8 text-slate-400 hover:text-primary transition-colors p-2 cursor-pointer z-50"
            >
              <X className="w-8 h-8 pointer-events-none" strokeWidth={1.5} />
            </button>

            {/* Centered Content Wrapper */}
            <div className="flex-1 flex flex-col justify-center mb-8">
              {/* Header */}
              <div className="flex justify-center items-center mb-12 relative">
                <div className="flex items-center gap-3">
                  <img src="/images/brand/bunnylogo.webp" alt="BunnyPlastics Logo" className="h-12 w-auto mix-blend-multiply" />
                  <span className="text-3xl font-logo tracking-widest uppercase text-foreground">Menu</span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-8 items-center text-center">
                {[
                  { path: '/', label: 'HOME' },
                  { path: '/products', label: 'PRODUCTS' },
                  { path: '/about', label: 'ABOUT US' },
                  { path: '/distributors', label: 'RESELLERS' }
                ].map((item, i) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className="relative text-3xl md:text-4xl font-bold text-foreground uppercase tracking-widest hover:text-primary flex items-center group w-max transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${i * 50 + 100}ms` : '0ms',
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)'
                    }}
                  >
                    <span className="absolute -left-6 md:-left-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-primary flex items-center">
                      <ArrowRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
                    </span>
                    <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-3 md:group-hover:translate-x-4">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Menu Footer CTA */}
            <div className="mt-auto w-full">
              <div className="bg-[#1A1A1A] rounded-2xl p-6 relative overflow-hidden w-full h-40 flex flex-col justify-center group shadow-lg">
                <div className="relative z-10 w-3/4">
                  <h4 className="text-2xl font-logo text-white leading-none mb-2 tracking-wide uppercase drop-shadow-md">
                    Interested in Reselling?
                  </h4>
                  <Link 
                    to="/distributors" 
                    className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:text-primary flex items-center mt-3 w-max transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                {/* Image */}
                <div className="absolute -right-8 -bottom-4 h-[130%] w-3/5 z-0 pointer-events-none">
                  <img src="/images/Drawers%20&%20Cabinets/Drawers%20and%20Cabinets/Mega%20Bunny%203L/MEGA%20White.webp" alt="White Cabinet" className="w-full h-full object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isQuotePage && (
        <header className="w-full bg-white h-20 flex items-center justify-center px-4">
           <Link to="/">
             <img src="/images/brand/bunnylogo.webp" alt="BunnyPlastics Logo" className="h-12 object-contain mix-blend-multiply" />
           </Link>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="relative bg-[#1A1A1A] pt-32 pb-12 mt-32 text-white rounded-t-[40px] md:rounded-t-[80px]">
        {/* Popping out logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 md:w-40 aspect-square bg-white rounded-full flex items-center justify-center p-2 shadow-2xl overflow-hidden">
          <Link to="/" className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
            <img src="/images/brand/bunnylogo.webp" alt="BunnyPlastics Logo" className="w-full h-full object-cover scale-110" />
          </Link>
        </div>

        <div className="container mx-auto px-6 md:px-12 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {/* Left Column */}
            <div className="flex flex-col h-full md:border-r border-white/20 md:pr-12 lg:pr-16 py-4">
              <div className="flex flex-col gap-6 font-logo text-2xl md:text-3xl tracking-widest uppercase mb-12">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                <Link to="/distributors" className="hover:text-primary transition-colors">Distributors</Link>
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <h4 className="font-sans text-sm font-bold tracking-widest uppercase text-white">Contact Us</h4>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="flex items-center justify-center hover:scale-110 transition-transform">
                    <img src="/images/icons/facebook_icon.webp" alt="Facebook" className="w-10 h-10 object-contain" />
                  </a>
                  <a href="tel:283638924" className="flex items-center justify-center hover:scale-110 transition-transform">
                    <img src="/images/icons/phone_icon.webp" alt="Phone" className="w-10 h-10 object-contain" />
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col justify-center h-full md:px-12 lg:px-16 text-center py-4">
              <h3 className="text-4xl md:text-5xl font-logo mb-4 tracking-wide">Ready to get started?</h3>
              <p className="text-slate-300 mb-10 max-w-sm mx-auto leading-relaxed">
                Register your store today and gain access to exclusive reseller benefits and new products!
              </p>
              <div className="flex justify-center w-full max-w-sm mx-auto">
                <Button href="/distributors" className="w-full uppercase tracking-wider group text-sm">
                  APPLY NOW <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col h-full md:border-l border-white/20 md:pl-12 lg:pl-16 text-right items-end py-4">
              <a 
                href="https://maps.google.com/?q=54B+B.+Serrano+Street+corner+7th+Avenue,+Caloocan+City+1400,+Metro+Manila,+Philippines" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative w-72 h-48 rounded-3xl overflow-hidden shadow-lg group border-2 border-white/10 hover:border-primary transition-all mb-8"
              >
                 <iframe 
                   src="https://maps.google.com/maps?q=54B%20B.%20Serrano%20Street%20corner%207th%20Avenue,%20Caloocan%20City,%20Philippines&t=m&z=15&output=embed&iwloc=near" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen={false} 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="pointer-events-none scale-125 origin-center"
                 ></iframe>
                 <div className="absolute inset-0 bg-[#1A1A1A]/30 group-hover:bg-transparent transition-colors"></div>
              </a>

              <div className="mt-auto flex flex-col items-end gap-3 text-slate-300 font-medium">
                <h4 className="font-logo text-2xl md:text-3xl tracking-widest uppercase text-white">Visit Us At:</h4>
                <div className="text-right leading-relaxed max-w-70">
                  <p>54B B. Serrano Street corner 7th Avenue, Caloocan City 1400, Metro Manila, Philippines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <CartDrawer />
    </div>
  );
}
