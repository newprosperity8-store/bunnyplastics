import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { PRODUCTS } from '../data/products';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COLOR_MAP } from '../constants/colors';

export default function ProductDetail() {
  const { id } = useParams();
  
  const product = PRODUCTS.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(product?.mainImage || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [qty, setQty] = useState<number | string>('0-100');
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      name: product.name,
      color: selectedColor || 'Default',
      size: selectedSize || undefined,
      qty,
      image: activeImage || product.mainImage
    });
  };

  const relatedProducts = PRODUCTS
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  useEffect(() => {
    if (selectedColor && product) {
      let matchingImg = product.images.find(img => img.toLowerCase().includes(selectedColor.toLowerCase()) && (!selectedSize || img.toLowerCase().includes(selectedSize.toLowerCase())));
      
      // If we don't find an exact match for color AND size, fallback to just color
      if (!matchingImg) {
        matchingImg = product.images.find(img => img.toLowerCase().includes(selectedColor.toLowerCase()));
      }
      
      if (matchingImg) {
        setActiveImage(matchingImg);
      }
    } else if (selectedSize && product) {
       // if no color selected but size is selected
       const matchingImg = product.images.find(img => img.toLowerCase().includes(selectedSize.toLowerCase()));
       if (matchingImg) {
          setActiveImage(matchingImg);
       }
    }
  }, [selectedColor, selectedSize, product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePosition({ x, y });
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 min-h-screen">


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Product Images */}
        <div className="space-y-6 lg:col-span-5">
          <Link to={`/products?category=${product.category}`} className="inline-flex items-center justify-center px-6 py-2 border border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group w-max">
            <ChevronLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO PRODUCTS
          </Link>
          <div 
            className={`relative aspect-square bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 lg:p-16 flex items-center justify-center overflow-hidden group ${isZooming ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsZooming(!isZooming)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={activeImage} 
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
              style={{
                transform: isZooming ? 'scale(2.5)' : 'scale(1)',
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transition: isZooming ? 'none' : 'transform 0.3s ease-out'
              }}
            />
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - 1))}
                disabled={thumbnailStartIndex === 0}
                className="p-2 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              
              <div className="flex-1 grid grid-cols-3 gap-4">
                {product.images.slice(thumbnailStartIndex, thumbnailStartIndex + 3).map((img, idx) => (
                  <button 
                    key={thumbnailStartIndex + idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square bg-white rounded-2xl shadow-sm border p-2 flex items-center justify-center transition-all ${activeImage === img ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A]/20' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${thumbnailStartIndex + idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setThumbnailStartIndex(Math.min(product.images.length - 3, thumbnailStartIndex + 1))}
                disabled={thumbnailStartIndex >= product.images.length - 3}
                className="p-2 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col pt-4 lg:pt-0 lg:col-span-7">
          <div className="mb-2">
             <span className="text-sm font-semibold text-slate-600">Bunny Plastics Official Store</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-logo mb-4 text-[#1A1A1A] tracking-wide">{product.name}</h1>
          
          {(product.code || product.spec) && (
            <div className="mb-8 flex flex-col gap-1 text-slate-600">
              {product.code && <p><span className="font-semibold text-slate-800">Code:</span> {product.code}</p>}
              {product.spec && <p><span className="font-semibold text-slate-800">Specs:</span> {product.spec}</p>}
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${selectedSize === size ? 'border-slate-400 bg-slate-50 text-[#1A1A1A] shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Colors */}
          {product.colors && product.colors.filter(c => c.toLowerCase() !== 'platinum').length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.filter(color => color.toLowerCase() !== 'platinum').map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${selectedColor === color ? 'ring-2 ring-slate-400 bg-white shadow-sm' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full shadow-inner ring-1 ring-black/5" 
                      style={{ backgroundColor: COLOR_MAP[color] || '#e5e7eb' }} 
                    />
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Options */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Quantity</h3>
            <div className="flex flex-wrap gap-3">
              {['0-100', '101 - 1000', '1000+'].map(option => (
                <button
                  key={option}
                  onClick={() => setQty(option)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${qty === option ? 'border-slate-400 bg-slate-50 text-[#1A1A1A] shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {qty === 'Custom' && (
              <div className="mt-4 flex items-center">
                <input 
                  type="number" 
                  min="500"
                  defaultValue="500"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) setQty(val);
                  }}
                  className="w-32 border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all shadow-sm"
                  placeholder="e.g. 5000"
                />
                <span className="ml-3 text-sm text-slate-500 font-medium">units</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className="flex-1 shadow-md text-lg h-14 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
            </div>
            <Link to="/contact" className="w-full">
              <Button size="lg" variant="outline" className="w-full text-lg h-14 rounded-full border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700">
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="prose prose-slate text-[#5C4F4A] font-medium leading-relaxed">
            <p>
              Made from high-quality materials, this {product.name.toLowerCase()} is built for everyday utility. 
              Discover the durability and sleek design, carefully manufactured with impact-resistant plastic 
              to ensure long-lasting performance for both indoor and outdoor use. The result is a smooth and solid finish.
            </p>
          </div>

        </div>
      </div>

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 md:mt-32">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-logo text-[#1A1A1A] mb-4 uppercase">Explore More {product.category.replace('-', ' ')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover our wide range of durable, stylish, and high-quality {product.category.replace('-', ' ')} perfect for any setting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(relatedProduct => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`} className="group w-full bg-white rounded-[2.5rem] p-4 flex flex-col items-center overflow-hidden relative shadow-sm aspect-4/5 transition-all duration-300 border-2 border-transparent hover:border-primary">
                <div className="w-full bg-[#F5F5F5] rounded-3xl grow flex items-center justify-center mb-4 overflow-hidden relative transition-all duration-300">
                  <img 
                    src={relatedProduct.mainImage} 
                    alt={relatedProduct.name} 
                    className="object-contain w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply" 
                  />
                </div>
                <div className="w-full flex flex-col items-start px-2 pb-2">
                  <h3 className="text-xl md:text-2xl font-logo tracking-widest text-[#1A1A1A] mb-1 uppercase line-clamp-1">{relatedProduct.name}</h3>
                  {relatedProduct.code && <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{relatedProduct.code}</p>}
                  <p className="text-xs md:text-sm text-slate-400 capitalize">{relatedProduct.category.replace('-', ' ')}</p>
                  <div className="w-full overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 mt-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-4">
                    <button className="w-full bg-transparent border-2 border-[#1A1A1A] text-[#1A1A1A] py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:border-primary hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                      View Details
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/products" className="inline-flex items-center justify-center px-10 py-4 border-2 border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-sm tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group">
              View All {product.category.replace('-', ' ')}
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
