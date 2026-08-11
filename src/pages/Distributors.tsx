import { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { 
  getAllRegions, 
  getProvincesByRegion, 
  getAllMunicipalities, 
  getMunicipalitiesByProvince, 
  getBarangaysByMunicipality 
} from '@aivangogh/ph-address';
import { Select } from '../components/ui/Select';

export default function Distributors() {
  const [currentStep, setCurrentStep] = useState(0);
  const [partnerCardIdx, setPartnerCardIdx] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    landline: '',
    mobile: '',
    storeName: '',
    regionCode: '',
    provinceCode: '',
    cityCode: '',
    barangayCode: '',
    storeAddress: '',
    zipCode: '',
    mayorsPermit: null as File | null,
    dtiRegistration: null as File | null,
    businessPermit: null as File | null,
  });

  // Anti-Bot & Security State
  const [honeypot, setHoneypot] = useState('');
  const [userCaptchaAnswer, setUserCaptchaAnswer] = useState('');
  const [captchaNum1] = useState(() => Math.floor(Math.random() * 7) + 3);
  const [captchaNum2] = useState(() => Math.floor(Math.random() * 7) + 2);

  const regions = useMemo(() => getAllRegions(), []);
  const provinces = useMemo(() => formData.regionCode ? getProvincesByRegion(formData.regionCode) : [], [formData.regionCode]);
  const cities = useMemo(() => {
    if (formData.provinceCode) {
      return getMunicipalitiesByProvince(formData.provinceCode);
    }
    if (formData.regionCode && provinces.length === 0) {
      // e.g. NCR where there are no provinces
      return getAllMunicipalities().filter(m => m.provinceCode === formData.regionCode || (m as any).regionCode === formData.regionCode);
    }
    return [];
  }, [formData.provinceCode, formData.regionCode, provinces.length]);
  const barangays = useMemo(() => formData.cityCode ? getBarangaysByMunicipality(formData.cityCode) : [], [formData.cityCode]);

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.storeName) {
        setError('Please fill in all required fields.');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address.');
        return false;
      }
      const phoneRegex = /^[0-9\-\+\s\(\)]+$/;
      if (formData.landline && !phoneRegex.test(formData.landline)) {
        setError('Landline number must be numeric (dashes and spaces allowed).');
        return false;
      }
      if (!phoneRegex.test(formData.mobile)) {
        setError('Mobile number must be numeric (dashes and spaces allowed).');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.regionCode || (provinces.length > 0 && !formData.provinceCode) || (cities.length > 0 && !formData.cityCode) || (barangays.length > 0 && !formData.barangayCode) || !formData.storeAddress || !formData.zipCode) {
        setError('Please fill in all required location fields.');
        return false;
      }
    }
    if (step === 3) {
      if (!formData.mayorsPermit || !formData.dtiRegistration || !formData.businessPermit) {
        setError('Please upload all required business documents.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle cascading resets
    if (name === 'regionCode') {
      setFormData(prev => ({ ...prev, regionCode: value, provinceCode: '', cityCode: '', barangayCode: '' }));
    } else if (name === 'provinceCode') {
      setFormData(prev => ({ ...prev, provinceCode: value, cityCode: '', barangayCode: '' }));
    } else if (name === 'cityCode') {
      setFormData(prev => ({ ...prev, cityCode: value, barangayCode: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (error) setError('');
  };

  const MAX_FILE_SIZE_MB = 10;
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type && !ALLOWED_MIME_TYPES.includes(selectedFile.type.toLowerCase())) {
        setError(`"${selectedFile.name}" is an unsupported file type. Please upload a PDF, PNG, or JPEG file.`);
        e.target.value = '';
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`"${selectedFile.name}" exceeds the ${MAX_FILE_SIZE_MB}MB file size limit. Please upload a smaller file.`);
        e.target.value = '';
        return;
      }
      setFormData((prev) => ({ ...prev, [fieldName]: selectedFile }));
      if (error) setError('');
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionModal, setSubmissionModal] = useState<{
    isOpen: boolean;
    status: 'compressing' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    isOpen: false,
    status: 'submitting',
    message: ''
  });

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBBhKwYR47C4yOkLJwVo2F_IHmiMuN1MEJDMiEiF4wCxCzKHtQG41-WaLfQx0WQZ3H/exec';

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const compressAndConvertFile = (file: File): Promise<{ data: string; mimeType: string; name: string }> => {
    return new Promise((resolve, reject) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
              const base64Data = dataUrl.split(',')[1];
              resolve({
                data: base64Data,
                mimeType: 'image/jpeg',
                name: file.name.replace(/\.[^/.]+$/, "") + ".jpg"
              });
            } else {
              convertFileToBase64(file).then(data => resolve({ data, mimeType: file.type, name: file.name })).catch(reject);
            }
          };
          img.onerror = () => {
            convertFileToBase64(file).then(data => resolve({ data, mimeType: file.type, name: file.name })).catch(reject);
          };
          img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        convertFileToBase64(file).then(data => resolve({ data, mimeType: file.type, name: file.name })).catch(reject);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      handleNext();
      return;
    }
    if (validateStep(3)) {
      // 1. Anti-Bot Honeypot Trap
      if (honeypot.trim() !== '') {
        console.warn('Bot caught via honeypot trap.');
        setSubmissionModal({
          isOpen: true,
          status: 'success',
          message: 'Your application has been received!'
        });
        return;
      }

      // 2. Submission Rate-Limiting Cooldown (60s)
      const lastSubmitTime = localStorage.getItem('last_distributor_submit_time');
      if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < 60000) {
        const secondsLeft = Math.ceil((60000 - (Date.now() - parseInt(lastSubmitTime))) / 1000);
        setError(`Security Cooldown: Please wait ${secondsLeft} seconds before submitting another application.`);
        return;
      }

      // 3. Human Math CAPTCHA Verification
      if (parseInt(userCaptchaAnswer) !== captchaNum1 + captchaNum2) {
        setError('Incorrect security verification answer. Please solve the simple math problem.');
        return;
      }

      setIsSubmitting(true);
      setSubmissionModal({
        isOpen: true,
        status: 'compressing',
        message: 'Optimizing and compressing document images...'
      });

      try {
        const payload: any = {
          apiKey: "BunnyPlastics_App_2026_SecureKey",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          landline: formData.landline,
          mobile: formData.mobile,
          storeName: formData.storeName,
          region: regions.find(r => r.psgcCode === formData.regionCode)?.name || '',
          province: provinces.find(p => p.psgcCode === formData.provinceCode)?.name || '',
          city: cities.find(c => c.psgcCode === formData.cityCode)?.name || '',
          barangay: barangays.find(b => b.psgcCode === formData.barangayCode)?.name || '',
          storeAddress: formData.storeAddress,
          zipCode: formData.zipCode,
          files: {}
        };

        if (formData.mayorsPermit) {
          payload.files.mayorsPermit = await compressAndConvertFile(formData.mayorsPermit);
        }
        if (formData.dtiRegistration) {
          payload.files.dtiRegistration = await compressAndConvertFile(formData.dtiRegistration);
        }
        if (formData.businessPermit) {
          payload.files.businessPermit = await compressAndConvertFile(formData.businessPermit);
        }

        setSubmissionModal({
          isOpen: true,
          status: 'submitting',
          message: 'Uploading application to BunnyPlastics network...'
        });

        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
        });
        
        if (response.ok) {
          localStorage.setItem('last_distributor_submit_time', Date.now().toString());
          setSubmissionModal({
            isOpen: true,
            status: 'success',
            message: 'Your application has been successfully submitted! Our team will review your details and get back to you soon.'
          });
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err: any) {
        console.error('Error submitting form:', err);
        setSubmissionModal({
          isOpen: true,
          status: 'error',
          message: 'There was an error submitting your application. Please check your internet connection and try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStepIndicators = () => {
    return (
      <div className="flex items-center justify-center mb-8 sm:mb-12 w-full max-w-xs sm:max-w-md mx-auto px-2">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${
                currentStep >= step
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 text-slate-500'
              } transition-colors duration-300`}
            >
              {currentStep > step ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-6 sm:w-16 h-1 mx-1 sm:mx-2 rounded ${
                  currentStep > step ? 'bg-primary' : 'bg-slate-200'
                } transition-colors duration-300`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative w-full min-h-[40vh] md:min-h-[50vh] bg-cover bg-center flex flex-col items-center justify-center pt-20" 
        style={{ backgroundImage: "url('/images/banners/banner1.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="flex flex-col items-center z-10 w-full text-center px-6">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-logo text-white tracking-wide mb-4 relative z-0 uppercase drop-shadow-lg">
            Become a Partner
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium drop-shadow-md">
            Join the BunnyPlastics family and bring durable, high-quality products to your community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 xl:px-24 py-16 md:py-24">
        {currentStep === 0 ? (
          /* Landing View */
          <div className="flex flex-col items-center">
            
            {/* Why Partner With Us */}
            <div className="text-center mb-16 max-w-3xl">
              <h3 className="text-3xl md:text-4xl font-logo text-[#212529] mb-6">Why Partner With Us?</h3>
              <p className="text-slate-600 text-lg">
                We believe in growing together. As a trusted household name, we're here to support your business with products that families love and trust.
              </p>
            </div>

            <div 
              onScroll={(e) => {
                const container = e.currentTarget;
                const idx = Math.min(2, Math.max(0, Math.round(container.scrollLeft / (container.clientWidth * 0.8))));
                setPartnerCardIdx(idx);
              }}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-5 pb-6 px-2 -mx-2 md:grid md:grid-cols-3 md:gap-16 w-full mb-10 md:mb-20"
            >
              <div className="w-[82vw] md:w-auto shrink-0 snap-center snap-always bg-transparent p-4 md:p-0 flex flex-col items-center text-center group">
                <div className="flex items-center justify-center mb-6">
                  <img src="/images/icons/quality.webp" alt="Unmatched Quality" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="text-xl font-bold text-[#1A1A1A] mb-4">Unmatched Quality</h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Offer your customers products that are built to last. Our commitment to durability ensures satisfaction and repeat business.
                </p>
              </div>

              <div className="w-[82vw] md:w-auto shrink-0 snap-center snap-always bg-transparent p-4 md:p-0 flex flex-col items-center text-center group">
                <div className="flex items-center justify-center mb-6">
                  <img src="/images/icons/trusted.webp" alt="Trusted Brand" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="text-xl font-bold text-[#1A1A1A] mb-4">Trusted Brand</h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Leverage our strong reputation. BunnyPlastics is recognized nationwide for reliability, making sales naturally easier.
                </p>
              </div>

              <div className="w-[82vw] md:w-auto shrink-0 snap-center snap-always bg-transparent p-4 md:p-0 flex flex-col items-center text-center group">
                <div className="flex items-center justify-center mb-6">
                  <img src="/images/icons/growth.webp" alt="Growth Support" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="text-xl font-bold text-[#1A1A1A] mb-4">Growth Support</h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Benefit from competitive margins, marketing materials, and a dedicated support team designed to help scale your retail business.
                </p>
              </div>
            </div>

            {/* Mobile Swipe Indicator */}
            <div className="flex flex-col items-center gap-2 mb-16 md:hidden">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((idx) => (
                  <span 
                    key={idx} 
                    className={`transition-all duration-300 rounded-full ${idx === partnerCardIdx ? 'w-6 h-2 bg-[#1A1A1A]' : 'w-2 h-2 bg-slate-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-400 tracking-widest flex items-center gap-1 uppercase">
                &lt; Swipe &gt;
              </span>
            </div>

            <div className="bg-[#1A1A1A] rounded-[2.5rem] w-full relative mt-32 md:mt-48 overflow-hidden md:overflow-visible">
              {/* Desktop-Only Bursting Images on the Right */}
              <div 
                className="absolute inset-0 pointer-events-none hidden md:block"
                style={{ clipPath: 'inset(-100% -100% 0 -100% round 0 0 2.5rem 2.5rem)' }}
              >
                <div className="absolute bottom-0 right-0 w-full h-full flex justify-end items-end">
                   <div className="flex items-end -mr-10 md:-mr-16 translate-y-24 md:translate-y-40">
                      <img 
                        src="/images/Drawers%20&%20Cabinets/Drawers%20and%20Cabinets/Mega%20Bunny%203L/MEGA%20Brown.webp" 
                        alt="Mega Bunny Brown" 
                        className="w-56 sm:w-72 md:w-80 lg:w-104 drop-shadow-2xl z-10 -mr-32 sm:-mr-40 md:-mr-56 lg:-mr-72" 
                      />
                      <img 
                        src="/images/Drawers%20&%20Cabinets/Drawers%20and%20Cabinets/Mega%20Bunny%203L/MEGA%20White.webp" 
                        alt="Mega Bunny White" 
                        className="w-64 sm:w-80 md:w-96 lg:w-120 drop-shadow-2xl z-20" 
                      />
                    </div>
                </div>
              </div>

              {/* Mobile-Only Wardrobes (Centered in Mobile View) */}
              <div className="flex md:hidden w-full pt-8 justify-center items-center">
                <div className="flex items-end justify-center -mb-4">
                  <img 
                    src="/images/Drawers%20&%20Cabinets/Drawers%20and%20Cabinets/Mega%20Bunny%203L/MEGA%20Brown.webp" 
                    alt="Mega Bunny Brown" 
                    className="w-32 sm:w-40 h-auto drop-shadow-xl z-10 -mr-14" 
                  />
                  <img 
                    src="/images/Drawers%20&%20Cabinets/Drawers%20and%20Cabinets/Mega%20Bunny%203L/MEGA%20White.webp" 
                    alt="Mega Bunny White" 
                    className="w-36 sm:w-44 h-auto drop-shadow-xl z-20" 
                  />
                </div>
              </div>

              {/* Content (with padding) */}
              <div className="p-8 md:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-logo text-white mb-4">Ready to get started?</h3>
                  <p className="text-white mb-8 max-w-md text-sm md:text-base leading-relaxed">
                    Register your store today and gain access to exclusive reseller benefits and new products!
                  </p>
                  <button 
                    onClick={handleNext}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1A1A1A] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-slate-200 transition-colors group cursor-pointer"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Empty right column for spacing so text doesn't overlap images */}
                <div className="hidden md:block md:w-1/2 w-full h-64 md:h-auto"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Multi-Step Form */
          <div className="max-w-3xl mx-auto w-full">
            {renderStepIndicators()}

            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
              <form onSubmit={handleSubmit}>

                {/* Invisible Anti-Bot Honeypot Field */}
                <div className="hidden pointer-events-none opacity-0" aria-hidden="true" style={{ display: 'none' }}>
                  <input 
                    type="text" 
                    name="confirm_fax_hp" 
                    tabIndex={-1} 
                    autoComplete="off" 
                    value={honeypot} 
                    onChange={(e) => setHoneypot(e.target.value)} 
                  />
                </div>
                
                {/* STEP 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Personal & Store Details</h3>
                    <p className="text-slate-500 mb-8">Please provide your contact information and store name.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">FIRST NAME<span className="text-red-500">*</span></label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. Juan" className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">LAST NAME<span className="text-red-500">*</span></label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Dela Cruz" className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">EMAIL<span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. juan@example.com" className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">LANDLINE NUMBER</label>
                        <input type="tel" name="landline" value={formData.landline} onChange={handleChange} placeholder="e.g. (02) 8123 4567" className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                      <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">MOBILE NUMBER<span className="text-red-500">*</span></label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="e.g. 0917 123 4567" className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                      <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">STORE NAME<span className="text-red-500">*</span></label>
                        <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} placeholder="e.g. Juan's General Merchandise" className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Location Details */}
                {currentStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Location Details</h3>
                    <p className="text-slate-500 mb-8">Where is your store located?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`flex flex-col ${provinces.length > 0 ? '' : 'md:col-span-2'}`}>
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">REGION<span className="text-red-500">*</span></label>
                        <Select 
                          value={formData.regionCode} 
                          onChange={(val) => handleChange({ target: { name: 'regionCode', value: val } } as any)} 
                          options={regions.map(r => ({ 
                            value: r.psgcCode, 
                            label: r.name === 'National Capital Region' ? 'National Capital Region (Metro Manila)' : r.name 
                          }))}
                          placeholder="Select Region"
                        />
                      </div>

                      {provinces.length > 0 && (
                        <div className="flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
                          <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">PROVINCE<span className="text-red-500">*</span></label>
                          <Select 
                            value={formData.provinceCode} 
                            onChange={(val) => handleChange({ target: { name: 'provinceCode', value: val } } as any)} 
                            options={provinces.map(p => ({ value: p.psgcCode, label: p.name }))}
                            placeholder="Select Province"
                            disabled={!formData.regionCode}
                          />
                        </div>
                      )}

                      <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">CITY / MUNICIPALITY<span className="text-red-500">*</span></label>
                        <Select 
                          value={formData.cityCode} 
                          onChange={(val) => handleChange({ target: { name: 'cityCode', value: val } } as any)} 
                          options={cities.map(c => ({ value: c.psgcCode, label: c.name }))}
                          placeholder="Select City"
                          disabled={!formData.regionCode || (provinces.length > 0 && !formData.provinceCode)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">
                          BARANGAY{barangays.length > 0 && <span className="text-red-500">*</span>}
                        </label>
                        <Select 
                          value={formData.barangayCode} 
                          onChange={(val) => handleChange({ target: { name: 'barangayCode', value: val } } as any)} 
                          options={barangays.map(b => ({ value: b.psgcCode, label: b.name }))}
                          placeholder={barangays.length > 0 ? "Select Barangay" : "No Barangays Available"}
                          disabled={!formData.cityCode || barangays.length === 0}
                        />
                      </div>

                      <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">STORE ADDRESS<span className="text-red-500">*</span></label>
                        <input type="text" name="storeAddress" value={formData.storeAddress} onChange={handleChange} placeholder="Write your full address here (Building, Street, etc.)..." className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                      
                      <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 mb-2 tracking-wide">ZIP CODE<span className="text-red-500">*</span></label>
                        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="e.g. 1103" className="px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Business Documents */}
                {currentStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Business Documents</h3>
                    <p className="text-slate-500 mb-8">Please upload clear copies of your documents (PDF/JPEG).</p>
                    
                    <div className="space-y-6">
                      {[
                        { id: 'mayorsPermit', label: "Upload Mayor's Permit", file: formData.mayorsPermit },
                        { id: 'dtiRegistration', label: "Upload DTI Registration", file: formData.dtiRegistration },
                        { id: 'businessPermit', label: "Upload Business Permit", file: formData.businessPermit }
                      ].map((doc) => (
                        <div key={doc.id} className="flex flex-col">
                          <label className="relative flex items-center justify-between w-full p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-primary hover:bg-red-50/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                                <Upload className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">{doc.label}</span>
                                <span className="text-xs text-slate-400 mt-1">{doc.file ? doc.file.name : 'No file chosen'}</span>
                              </div>
                            </div>
                            {doc.file && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange(e, doc.id)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Human Security CAPTCHA Verification */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <label className="text-sm font-bold text-slate-700 mb-2 block tracking-wide">
                        SECURITY VERIFICATION<span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-3 bg-slate-100 rounded-xl font-bold text-slate-700 tracking-wider select-none text-base border border-slate-200">
                          {captchaNum1} + {captchaNum2} = ?
                        </div>
                        <input 
                          type="number" 
                          value={userCaptchaAnswer} 
                          onChange={(e) => setUserCaptchaAnswer(e.target.value)} 
                          placeholder="Answer" 
                          className="w-28 px-4 py-3 bg-[#F5F5F5] rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-red-100 transition-all outline-none font-bold text-slate-700 text-center" 
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Solve this simple math equation to confirm you are a human applicant.</p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons & Error */}
                <div className="mt-12 pt-8 border-t border-slate-100">
                  
                  {error && (
                    <div className="mb-6 bg-red-50 border border-red-100 text-red-700 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                      <div className="w-5 h-5 shrink-0 rounded-full bg-red-200 flex items-center justify-center text-red-700 text-xs font-bold">!</div>
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 w-full">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-slate-600 font-bold hover:bg-slate-100 transition-colors text-xs sm:text-base border border-slate-200 sm:border-none shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      Back
                    </button>
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-primary text-white font-bold tracking-wider hover:bg-red-700 transition-colors text-xs sm:text-base shrink-0"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold tracking-wider transition-colors text-xs sm:text-base shrink-0 ${
                          isSubmitting ? 'bg-red-400 cursor-not-allowed' : 'bg-primary hover:bg-red-700'
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        {!isSubmitting && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    )}
                  </div>
                </div>

              </form>
            </div>
          </div>
        )}
      </div>

      {/* Submission Progress / Status Modal */}
      {submissionModal.isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center">
            {submissionModal.status === 'compressing' && (
              <>
                <div className="w-16 h-16 rounded-full bg-red-50 text-primary flex items-center justify-center mb-6">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <h4 className="text-2xl font-bold text-[#1A1A1A] mb-2">Optimizing Documents</h4>
                <p className="text-slate-600 mb-6 text-sm">{submissionModal.message}</p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                  <div className="bg-primary h-full w-1/2 animate-pulse rounded-full"></div>
                </div>
              </>
            )}

            {submissionModal.status === 'submitting' && (
              <>
                <div className="w-16 h-16 rounded-full bg-red-50 text-primary flex items-center justify-center mb-6">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <h4 className="text-2xl font-bold text-[#1A1A1A] mb-2">Submitting Application</h4>
                <p className="text-slate-600 mb-6 text-sm">{submissionModal.message}</p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                  <div className="bg-primary h-full w-3/4 animate-pulse rounded-full"></div>
                </div>
              </>
            )}

            {submissionModal.status === 'success' && (
              <>
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-[#1A1A1A] mb-2">Application Received!</h4>
                <p className="text-slate-600 mb-8 text-sm leading-relaxed">{submissionModal.message}</p>
                <button
                  onClick={() => {
                    setSubmissionModal({ isOpen: false, status: 'submitting', message: '' });
                    setCurrentStep(0);
                    setFormData({
                      firstName: '', lastName: '', email: '', landline: '', mobile: '',
                      storeName: '', regionCode: '', provinceCode: '', cityCode: '', barangayCode: '', storeAddress: '',
                      zipCode: '', mayorsPermit: null, dtiRegistration: null, businessPermit: null
                    });
                  }}
                  className="w-full py-3.5 bg-[#1A1A1A] text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-primary transition-colors cursor-pointer"
                >
                  Done & Return Home
                </button>
              </>
            )}

            {submissionModal.status === 'error' && (
              <>
                <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-[#1A1A1A] mb-2">Submission Failed</h4>
                <p className="text-slate-600 mb-8 text-sm leading-relaxed">{submissionModal.message}</p>
                <button
                  onClick={() => setSubmissionModal({ isOpen: false, status: 'submitting', message: '' })}
                  className="w-full py-3.5 bg-primary text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
