import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen overflow-hidden">
      {/* Wrapper for Red Background */}
      <div className="w-full bg-primary relative pt-10">
        {/* Our History Section */}
        <section className="relative w-full pb-16 md:pb-24">
          <div className="container mx-auto px-6 md:px-12 xl:px-24">
            
            {/* Giant Title */}
            <div className="w-full flex justify-center relative z-10 overflow-visible pointer-events-none">
              <h2 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] xl:text-[10rem] font-logo text-white leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
                ABOUT US
              </h2>
            </div>
          </div>

          {/* Scattered Polaroid Gallery */}
          <div className="w-full relative pb-4 md:pb-8 flex justify-center items-center -space-x-4 sm:-space-x-6 md:-space-x-10 lg:-space-x-14 z-40 -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4">
            {[
              { src: '/images/gallery/890 black.webp', rotate: '-rotate-12', translateY: 'translate-y-10 md:translate-y-16', zIndex: 'z-10' },
              { src: '/images/gallery/111-M transred3.webp', rotate: 'rotate-12', translateY: '-translate-y-2 md:-translate-y-4', zIndex: 'z-20' },
              { src: '/images/gallery/890 orange3.webp', rotate: '-rotate-6', translateY: 'translate-y-6 md:translate-y-8', zIndex: 'z-30' },
              { src: '/images/gallery/18000 6L Aqua3.webp', rotate: 'rotate-3', translateY: '-translate-y-4 md:-translate-y-6', zIndex: 'z-40' },
              { src: '/images/gallery/0088 Blue2.webp', rotate: '-rotate-6', translateY: 'translate-y-0 md:translate-y-2', zIndex: 'z-30' },
              { src: '/images/gallery/890 green.webp', rotate: 'rotate-12', translateY: 'translate-y-8 md:translate-y-12', zIndex: 'z-20' },
              { src: '/images/gallery/890 red.webp', rotate: '-rotate-6', translateY: 'translate-y-2 md:translate-y-4', zIndex: 'z-10' },
            ].map((item, index) => (
              <div 
                key={index}
                className={`w-16 sm:w-24 md:w-36 lg:w-48 bg-white p-1 sm:p-1.5 md:p-2 pb-4 sm:pb-6 md:pb-10 border border-[#E5E5E5] shrink-0 ${item.rotate} ${item.translateY} ${item.zIndex}`}
              >
                <div className="w-full aspect-square bg-[#F5F2F0] flex items-center justify-center overflow-hidden">
                  <img src={item.src} alt={`Gallery ${index}`} className="w-[90%] h-auto object-contain" />
                </div>
              </div>
            ))}
          </div>

          {/* WAVY SVG BOTTOM CUTOUT */}
          <div className="absolute bottom-0 left-0 w-full leading-none z-20 pointer-events-none">
            <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block transform translate-y-px">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,64C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
      </div>

      {/* New NextSpace / Offer Section */}
      <section className="relative w-full bg-white pt-12 pb-24 md:pt-16 md:pb-32 px-6 md:px-12 xl:px-24">
        <div className="container mx-auto">
          {/* Bottom part: What We Offer (Moved to Top) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Our Mission</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-logo text-[#1A1A1A] leading-tight">What We<br/>Offer</h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6 pt-2">
              <p className="text-xl md:text-2xl font-medium text-[#1A1A1A] leading-relaxed max-w-3xl">
                Three decades later, our mission remains the same: to uplift the standard of daily living through dependable, proudly local plastic products made to last. Because every Filipino home deserves the best, and that's exactly what Bunny is here for. That's what making homes happy means to us.
              </p>
            </div>
          </div>

          {/* Top part: Text & Collage (Moved to Bottom) */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/3">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#1A1A1A] leading-snug font-sans tracking-tight">
                Since 1996, Bunny creates durable, thoughtfully designed plastic products that turn every Filipino house into an organized, beautiful home.
              </h3>
            </div>
            <div className="lg:w-2/3 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
                <div className="rounded-3xl overflow-hidden shadow-md aspect-4/3 border border-slate-100 hover:shadow-xl transition-all">
                  <img src="/images/factory/factory1.webp" alt="BunnyPlastics Manufacturing Facility 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md aspect-4/3 border border-slate-100 hover:shadow-xl transition-all sm:-translate-y-4">
                  <img src="/images/factory/factory2.webp" alt="BunnyPlastics Manufacturing Facility 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md aspect-4/3 border border-slate-100 hover:shadow-xl transition-all">
                  <img src="/images/factory/factory3.webp" alt="BunnyPlastics Manufacturing Facility 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] w-full relative mt-40 md:mt-48">
            {/* Bursting Images on the Right */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ clipPath: 'inset(-100% -100% 0 -100% round 0 0 2.5rem 2.5rem)' }}
            >
              <div className="absolute bottom-0 left-0 w-full h-full flex justify-center items-end">
                 <div className="flex items-end justify-center mx-auto translate-y-24 md:translate-y-40">
                    <img 
                      src="/images/Drawers%20&%20Cabinets/Drawers%20and%20Cabinets/Mega%20Bunny%203L/MEGA%20Brown.webp" 
                      alt="Mega Bunny Brown" 
                      className="w-48 sm:w-64 md:w-80 lg:w-96 drop-shadow-2xl z-10 -mr-24 sm:-mr-36" 
                    />
                    <img 
                      src="/images/Drawers%20&%20Cabinets/Drawers%20and%20Cabinets/Mega%20Bunny%203L/MEGA%20White.webp" 
                      alt="Mega Bunny White" 
                      className="w-56 sm:w-72 md:w-88 lg:w-104 drop-shadow-2xl z-20" 
                    />
                  </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-logo text-white mb-4">Ready to get started?</h3>
                <p className="text-white mb-8 max-w-md text-sm md:text-base leading-relaxed">
                  Register your store today and gain access to exclusive reseller benefits and new products!
                </p>
                <Link 
                  to="/distributors"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1A1A1A] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-slate-200 transition-colors group"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="md:w-1/2 w-full h-64 md:h-auto"></div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
