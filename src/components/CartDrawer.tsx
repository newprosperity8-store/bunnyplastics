import { X, Plus, Minus, ShoppingCart, Send, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { generateMailtoUrl, generateGmailWebUrl, RECIPIENT_EMAIL } from '../utils/quoteEmail';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartCount } = useCart();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [sentStatus, setSentStatus] = useState(false);

  const handleSendMailto = () => {
    const mailtoUrl = generateMailtoUrl(items, { name, contact, location, notes });
    window.location.href = mailtoUrl;
    setSentStatus(true);
  };

  const handleSendGmailWeb = () => {
    const gmailUrl = generateGmailWebUrl(items, { name, contact, location, notes });
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSentStatus(true);
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-90 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setIsCartOpen(false);
          setShowQuoteModal(false);
        }}
      />
      
      {/* Main Drawer */}
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
            onClick={() => {
              setIsCartOpen(false);
              setShowQuoteModal(false);
            }}
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
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 -mr-2 -mt-1 cursor-pointer"
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
                        className="text-slate-500 hover:text-[#1A1A1A] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty as number + 1)}
                        className="text-slate-500 hover:text-[#1A1A1A] transition-colors cursor-pointer"
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
            <Button 
              onClick={() => setShowQuoteModal(true)}
              className="w-full h-14 text-lg rounded-full shadow-md bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-5 h-5" />
              Request Quote ({cartCount})
            </Button>
          </div>
        )}
      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/60 z-110 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-subtle-fade flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">Send Quote Request</h3>
                <p className="text-xs text-slate-500">Will be sent directly to {RECIPIENT_EMAIL}</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-700 pb-1 border-b border-slate-200">
                <span>Selected Items ({cartCount}):</span>
                <span className="text-primary font-semibold">Ready for Email</span>
              </div>
              <ul className="max-h-32 overflow-y-auto divide-y divide-slate-100">
                {items.map((item) => (
                  <li key={item.id} className="py-1.5 flex justify-between text-slate-600">
                    <span className="font-medium line-clamp-1">{item.name} ({item.color})</span>
                    <span className="font-bold text-slate-800 ml-2">x{item.qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional Customer Inputs */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Name (Optional)</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Santos" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contact Number / Email (Optional)</label>
                <input 
                  type="text" 
                  value={contact} 
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. 09171234567 or email@domain.com" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Location (Optional)</label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Quezon City, Metro Manila" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Additional Notes (Optional)</label>
                <input 
                  type="text" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Inquiring for wholesale volume discount" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Inputs are sanitized & protected against header injection and spam.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleSendGmailWeb}
                className="w-full py-3.5 px-6 bg-primary text-white font-bold rounded-full text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Mail className="w-4 h-4" />
                Open & Send in Gmail
              </button>

              <button
                onClick={handleSendMailto}
                className="w-full py-3 px-6 bg-slate-100 text-slate-800 font-bold rounded-full text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send via Default Email App
              </button>
            </div>

            {sentStatus && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Quote template prepared! Check your email client to send.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
