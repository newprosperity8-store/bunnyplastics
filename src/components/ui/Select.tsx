import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Select({ options, value, onChange, placeholder = 'Select an option', disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent transition-all outline-none text-left
          ${disabled ? 'opacity-50 cursor-not-allowed text-slate-400' : 'cursor-pointer hover:bg-[#ebebeb] focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100'}
          ${isOpen && !disabled ? 'bg-white border-primary ring-2 ring-red-100' : ''}
        `}
      >
        <span className={`block truncate ${!selectedOption ? 'text-slate-500' : 'text-slate-800'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
            {options.length === 0 ? (
              <li className="px-4 py-3 text-sm text-slate-500 text-center">No options available</li>
            ) : (
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 flex items-center justify-between cursor-pointer text-sm transition-colors
                    ${option.value === value ? 'bg-red-50 text-primary font-bold' : 'text-slate-700 hover:bg-slate-50'}
                  `}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && <Check className="w-4 h-4 text-primary" />}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
