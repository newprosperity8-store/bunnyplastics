import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartCount } = useCart();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-90 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-100 bg-white shadow-2xl z-100 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Shopping Cart ({cartCount})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-slate-400 hover:text-primary transition-colors p-2 cursor-pointer"
          >
            <X className="w-8 h-8 pointer-events-none" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4">
              <ShoppingCart className="w-16 h-16 opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center justify-center px-10 py-4 mt-4 border-2 border-[#1A1A1A] rounded-full text-[#1A1A1A] font-bold text-sm tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors group cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 border border-slate-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-[#1A1A1A] line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 -mr-2 -mt-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span>Color: {item.color}</span>
                    {item.size && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>Size: {item.size}</span>
                      </>
                    )}
                  </div>
                  
                  {typeof item.qty === 'number' ? (
                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-3 py-1 w-fit mt-auto">
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty as number - 1)}
                        className="text-slate-500 hover:text-[#1A1A1A] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty as number + 1)}
                        className="text-slate-500 hover:text-[#1A1A1A] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 w-fit mt-auto">
                      <span className="font-bold text-sm text-slate-700">{item.qty} units</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white">
            <Button className="w-full h-14 text-lg rounded-full shadow-md bg-primary hover:bg-primary/90 text-white">
              Request Quote
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
