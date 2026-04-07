export const homeStyles = {
  container:
    'min-h-screen bg-[#F1FAEE] text-slate-800 font-sans overflow-hidden selection:bg-[#457b9d] selection:text-white',
  heroSection: 'relative px-6 pt-32 pb-20 max-w-7xl mx-auto',
  heroBlurTop: 'absolute top-20 right-0 w-96 h-96 bg-[#457b9d]/20 rounded-full blur-3xl -z-10',
  heroBlurBottom: 'absolute bottom-0 left-0 w-72 h-72 bg-[#A8DADC]/40 rounded-full blur-3xl -z-10',
  heroGrid: 'grid md:grid-cols-2 gap-16 items-center',
  heroTextContent: 'space-y-8 animate-fadeIn',
  heroTitle: 'text-6xl md:text-6xl font-black leading-tight tracking-tight text-[#1D3557]',
  heroTitleSpan: 'block md:text-5xl text-[#457b9d]',
  heroDescription: 'text-slate-600 text-xl font-medium max-w-lg leading-relaxed',
  heroBtnWrapper: 'flex flex-wrap gap-5',
  heroPrimaryBtn:
    'group relative px-8 py-4 rounded-full bg-[#457b9d] text-white font-bold shadow-[0_10px_20px_-10px_rgba(69,123,157,0.5)] hover:shadow-[0_20px_25px_-5px_rgba(69,123,157,0.4)] hover:-translate-y-1 transition-all duration-300',
  heroLink: 'flex items-center gap-2',
  heroArrow: 'group-hover:translate-x-1 transition-transform',
  heroVideoWrapper: 'relative group',
  heroVideoBlur:
    'absolute inset-0 bg-[#457b9d] blur-[60px] opacity-20 rounded-full group-hover:opacity-30 transition-opacity duration-500',
  heroVideo:
    'relative rounded-[2.5rem] shadow-2xl rotate-1 hover:rotate-0 transition-all duration-700 ease-out animate-float border-4 border-white w-full h-full object-cover',

  splitSection: 'relative w-full h-[600px] md:h-[700px] flex flex-col md:flex-row bg-[#0f172a]',
  splitLeft:
    'relative h-1/2 md:h-full transition-all duration-700 ease-in-out overflow-hidden group cursor-pointer border-b-4 md:border-b-0 md:border-r-4 border-cyan-500',
  splitRight:
    'relative h-1/2 md:h-full transition-all duration-700 ease-in-out overflow-hidden group cursor-pointer',
  splitBgImage:
    'absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110',
  splitOverlayLeft:
    'absolute inset-0 bg-[#020617]/80 group-hover:bg-[#020617]/40 transition-colors duration-500',
  splitOverlayRight:
    'absolute inset-0 bg-[#2e1065]/90 group-hover:bg-[#2e1065]/50 transition-colors duration-500',
  splitContent:
    'absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white z-10 whitespace-nowrap',
  splitTitleLeft:
    'text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-cyan-50 text-shadow-glow',
  splitTitleRight:
    'text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-fuchsia-50',
  splitDescLeft:
    'text-lg md:text-xl font-medium text-cyan-200 opacity-80 max-w-md whitespace-normal mb-8',
  splitDescRight:
    'text-lg md:text-xl font-medium text-fuchsia-200 opacity-80 max-w-md whitespace-normal mb-8',
  splitBtn:
    'px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-full font-bold hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all',

  featuresSection: 'py-10 border-y border-[#457b9d]/20 bg-white/50 backdrop-blur-sm',
  featuresGrid: 'max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6',
  featureItem:
    'group p-4 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300',
  featureDot:
    'h-2 w-2 bg-[#457b9d] rounded-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity',
  featureText: 'font-bold text-[#1D3557]',

  productSection: 'py-24 max-w-7xl mx-auto px-6',
  productHeader: 'flex flex-col items-center mb-16',
  productBadge: 'text-[#457b9d] font-bold tracking-widest uppercase text-sm mb-2',
  productTitle: 'text-4xl md:text-5xl font-black text-[#1D3557]',
  productUnderline: 'w-24 h-1.5 bg-[#457b9d] mt-6 rounded-full',
  productGrid: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-10',

  ctaSection: 'relative py-32 mx-6 rounded-[3rem] overflow-hidden my-12',
  ctaBg: 'absolute inset-0 bg-[#1D3557]',
  ctaBlur:
    'absolute top-0 right-0 w-[500px] h-[500px] bg-[#457b9d] rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2',
  ctaContent: 'relative z-10 max-w-4xl mx-auto text-center px-6 text-white',
  ctaTitle: 'text-4xl md:text-6xl font-black mb-6 tracking-tight',
  ctaDesc: 'text-[#A8DADC] text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light',
  ctaBtn:
    'px-10 py-5 bg-[#457b9d] text-white rounded-full font-bold text-lg shadow-xl hover:bg-[#36607a] hover:scale-105 transition-all duration-300',
};

// Tailwind Variables for Cart Page
export const cartStyles = {
  container: 'min-h-screen bg-[#F1FAEE] text-slate-800 px-6 pt-[100px] relative overflow-hidden',
  backgroundBlur:
    'absolute top-0 right-0 w-96 h-96 bg-[#457b9d]/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3',
  title: 'text-3xl text-center md:text-5xl font-black mb-12 text-[#1D3557] tracking-tight',
  titleHighlight: 'text-[#457b9d]',
  gridWrapper: 'max-w-7xl mx-auto grid lg:grid-cols-3',

  emptyWrapper:
    'flex flex-col items-center justify-center text-center min-h-[60vh] w-full lg:col-span-3',
  emptyTitle: 'text-4xl md:text-5xl font-black text-[#1D3557] tracking-tight',
  emptyText: 'text-gray-500 text-lg mt-2 max-w-xl',
  browseBtn:
    'mt-4 px-8 py-3 bg-[#1D3557] text-white rounded-full font-bold hover:bg-[#457b9d] transition',

  summaryWrapper: 'items-center min-h-screen',
  summaryCard:
    'bg-white border border-slate-200 p-8 rounded-[2.5rem] h-fit shadow-xl shadow-blue-900/5',
  summaryTitle: 'text-2xl font-black text-[#1D3557] mb-6',
  summaryRow: 'flex justify-between text-slate-500 font-medium mb-3',
  summaryValue: 'text-slate-800 font-bold',
  totalRow:
    'flex justify-between text-xl font-black mt-4 pt-4 border-t border-slate-100 text-[#1D3557]',
  totalValue: 'text-[#457b9d]',
  checkoutBtn:
    'w-[200px] block m-auto text-center bg-[#457b9d] hover:bg-[#36607a] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300',
};

// Tailwind Variables for Checkout Page
export const checkoutStyles = {
  container: 'min-h-screen bg-[#F1FAEE] px-6 pt-32 pb-24',
  headerWrapper: 'text-center mb-12',
  title: 'text-4xl md:text-5xl font-black text-[#1D3557]',
  titleUnderline: 'w-24 h-1.5 bg-[#1D3557]/10 mx-auto mt-6 rounded-full',
  mainGrid: 'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10',

  // Form Section
  formWrapper: 'lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg',
  sectionTitle: 'text-2xl font-bold text-[#1D3557] mb-6',
  inputGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  inputField:
    'border px-4 py-3 rounded-lg w-full outline-none focus:border-[#457B9D] transition-colors',
  textField:
    'border px-4 py-3 rounded-lg w-full mt-6 outline-none focus:border-[#457B9D] transition-colors',

  // Payment Section
  paymentWrapper: 'bg-white rounded-2xl w-full',
  paymentTitle: 'text-2xl mt-3 text-center font-bold text-[#1D3557] mb-6',
  paymentList: 'space-y-4',
  paymentLabel:
    'flex items-center justify-between border p-5 rounded-xl cursor-pointer hover:border-[#457B9D] transition',
  paymentRadio: 'w-5 h-5 accent-[#1D3557]',
  paymentTextWrapper: 'flex items-center gap-4',
  paymentMainText: 'font-semibold text-[#1D3557]',
  paymentSubText: 'text-sm text-gray-500',
  paymentBadge: 'text-sm text-gray-400',

  // Summary Section
  summaryWrapper: 'lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg',
  totalRow: 'border-t pt-4 mt-4 flex justify-between font-bold text-lg',
  totalPrice: 'text-[#457b9d]',
  placeOrderBtn:
    'w-full mt-6 bg-[#1D3557] hover:bg-[#457b9d] text-white py-3 rounded-xl font-bold transition-all duration-300',
};

export const forgetStyles = {
  container:
    'min-h-screen flex items-center justify-center bg-[#F1FAEE] px-4 relative overflow-hidden',
  blurTop:
    'absolute top-[-10%] left-1/2 w-96 h-96 bg-[#457b9d]/10 rounded-full blur-3xl -translate-x-1/2',
  blurBottom: 'absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-[#1D3557]/10 rounded-full blur-3xl',

  card: 'w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 relative z-10 border border-slate-100',
  headerTitle: 'text-3xl font-black text-[#1D3557] tracking-tight',
  headerSubtitle: 'text-slate-400 mt-2 font-medium',

  form: 'space-y-5',
  label: 'block text-sm font-bold text-[#1D3557] mb-2 ml-1',
  input:
    'w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#1D3557] font-bold placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all duration-300',

  errorMsg: 'text-center text-xs font-bold text-red-500 bg-red-50 py-2 rounded',
  submitBtn:
    'w-full py-4 rounded-xl font-bold text-white bg-[#457b9d] hover:bg-[#36607a] hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 mt-4',

  footerWrapper: 'flex flex-col items-center justify-center mt-8 gap-2',
  footerText: 'text-sm text-slate-500 font-medium',
  footerLink: 'text-[#1D3557] font-bold hover:text-[#457b9d] hover:underline transition-all',
};

// Tailwind Variables for Login Page
export const loginStyles = {
  container:
    'min-h-screen flex items-center justify-center bg-[#F1FAEE] px-4 relative overflow-hidden',
  blurTop: 'absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#457b9d]/10 rounded-full blur-3xl',
  blurBottom: 'absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-[#1D3557]/10 rounded-full blur-3xl',

  card: 'w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 relative z-10 border border-slate-100',
  headerTitle: 'text-4xl font-black text-[#1D3557] tracking-tight',
  headerSubtitle: 'text-slate-400 mt-2 font-medium',

  form: 'space-y-5',
  label: 'block text-sm font-bold text-[#1D3557] mb-2 ml-1',
  input:
    'w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#1D3557] font-bold placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all duration-300',

  errorMsg: 'text-center text-xs font-bold text-red-500 bg-red-50 py-2 rounded',
  forgotLinkWrapper: 'flex items-center justify-end text-sm',
  forgotLink: 'text-slate-500 hover:text-[#457b9d] font-semibold transition-colors',

  submitBtn:
    'w-full py-4 rounded-xl font-bold text-white bg-[#457b9d] hover:bg-[#36607a] hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300',

  footerText: 'text-center text-sm text-slate-500 mt-8 font-medium',
  registerLink: 'text-[#1D3557] font-bold hover:text-[#457b9d] hover:underline transition-all ml-1',
};

// Tailwind Style Object
export const orderStyles = {
  container: 'min-h-screen bg-[#F1FAEE] px-6 pt-32 pb-24',
  headerWrapper: 'text-center mb-14',
  badge: 'text-sm tracking-widest text-[#457b9d] font-semibold',
  title: 'text-4xl md:text-5xl font-black text-[#1D3557] mt-2',
  underline: 'w-24 h-1.5 bg-[#1D3557]/10 mx-auto mt-6 rounded-full',

  orderCard: 'max-w-6xl mt-5 mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8',
  orderHeader: 'flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4',
  label: 'text-sm text-gray-500',
  value: 'font-semibold text-[#1D3557]',
  statusBadge: 'inline-block px-4 py-1 text-sm font-semibold rounded-full border',
  totalPrice: 'font-bold text-[#457b9d]',

  productRow: 'mt-6 space-y-4 flex items-center gap-6',
  productImg: 'w-24 h-20 object-contain rounded-xl bg-gray-50',
  productName: 'font-bold text-lg text-[#1D3557]',
  productQty: 'text-sm text-gray-500',

  emptyState: 'flex flex-col items-center justify-center text-center min-h-[60vh] w-full',
  browseBtn:
    'mt-4 px-8 py-3 bg-[#1D3557] text-white rounded-full font-bold hover:bg-[#457b9d] transition',
};

export const notFoundStyles = {
  container:
    'min-h-screen flex flex-col items-center justify-center bg-[#F1FAEE] px-6 text-center relative overflow-hidden',
  blurTop: 'absolute top-20 left-20 w-72 h-72 bg-[#457b9d]/10 rounded-full blur-3xl',
  blurBottom: 'absolute bottom-20 right-20 w-80 h-80 bg-[#1D3557]/10 rounded-full blur-3xl',

  logo: 'text-3xl font-black mb-10 text-[#1D3557] tracking-wide',
  logoDot: 'text-[#457b9d]',

  errorWrapper: 'relative mb-6',
  errorCode: 'text-[10rem] font-black text-[#1D3557]/5 leading-none select-none',
  iconOverlay: 'absolute inset-0 flex items-center justify-center',

  title: 'text-4xl font-black text-[#1D3557] mb-4 tracking-tight',

  homeBtn:
    'px-10 py-4 bg-[#457b9d] text-white rounded-full font-bold shadow-[0_10px_20px_-10px_rgba(69,123,157,0.5)] hover:bg-[#36607a] hover:shadow-[0_20px_25px_-5px_rgba(69,123,157,0.4)] hover:-translate-y-1 transition-all duration-300',
};

// Tailwind Variables for Product Details
export const productStyles = {
  container: 'min-h-screen bg-[#F1FAEE] text-slate-800 p-6 pt-24 relative overflow-x-hidden',
  blurEffect:
    'absolute top-0 right-0 w-[500px] h-[500px] bg-[#457b9d]/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3',

  // Navigation
  navWrapper: 'max-w-6xl mx-auto flex justify-between mb-8 relative z-10',
  navBtn: 'text-[#457b9d] font-bold hover:text-[#1D3557] transition-colors flex items-center gap-2',

  // Main Layout
  mainGrid: 'max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start',

  // Image Section
  imgContainer:
    'bg-white p-4 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative group',
  imgDecoration:
    'absolute inset-0 bg-[#457b9d]/5 rounded-[2.5rem] transform rotate-1 group-hover:rotate-2 transition-transform -z-10',
  mainImg: 'w-full h-[400px] md:h-[500px] object-cover rounded-[2rem]',

  // Content Section
  badge:
    'inline-block px-3 py-1 bg-[#457b9d]/10 text-[#457b9d] text-xs font-bold uppercase tracking-wider rounded-full mb-3',
  title: 'text-4xl md:text-5xl font-black text-[#1D3557] tracking-tight leading-tight',
  description: 'text-slate-500 text-lg leading-relaxed font-medium',
  price: 'text-4xl font-black text-[#457b9d]',

  // Quantity Selector
  qtyLabel: 'text-xs font-bold text-[#1D3557] uppercase tracking-wide',
  qtyControlWrapper:
    'flex items-center gap-4 bg-white border border-slate-200 w-fit p-2 rounded-xl shadow-sm',
  qtyBtn:
    'w-10 h-10 rounded-lg bg-slate-100 text-[#1D3557] text-xl font-bold hover:bg-[#1D3557] hover:text-white transition-colors',
  qtyBtnPlus:
    'w-10 h-10 rounded-lg bg-slate-100 text-[#1D3557] text-xl font-bold hover:bg-[#457b9d] hover:text-white transition-colors',
  qtyValue: 'text-xl font-bold text-[#1D3557] min-w-[30px] text-center',
  errorMsg: 'text-red-500 text-sm font-bold bg-red-50 w-fit px-2 py-1 rounded',

  // Specs Section
  specsCard: 'bg-white border border-slate-200 p-6 rounded-2xl shadow-sm mt-8',
  specsTitle: 'text-lg font-bold text-[#1D3557] mb-4 flex items-center gap-2',
  specsList: 'text-slate-600 space-y-2 font-medium',
  specsItem: 'flex items-center gap-2',
  bullet: 'w-1.5 h-1.5 rounded-full bg-[#457b9d]',
};

// Tailwind Variables for Register Page
export const registerStyles = {
  container:
    'min-h-screen flex items-center justify-center bg-[#F1FAEE] px-4 relative overflow-hidden',
  blurRight: 'absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#457b9d]/10 rounded-full blur-3xl',
  blurLeft: 'absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-[#1D3557]/10 rounded-full blur-3xl',

  card: 'w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 relative z-10 border border-slate-100',
  headerTitle: 'text-4xl font-black text-[#1D3557] tracking-tight',
  headerSubtitle: 'text-slate-400 mt-2 font-medium',

  form: 'space-y-5',
  inputGroup: 'group',
  input:
    'w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#1D3557] font-bold placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all duration-300',

  footerFlex: 'flex items-center justify-between pt-2',
  footerText: 'text-sm text-slate-500',
  loginLink: 'text-[#457b9d] font-bold hover:underline transition-all',

  errorBadge: 'text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded',
  submitBtn:
    'w-full py-4 rounded-xl font-bold text-white bg-[#457b9d] hover:bg-[#36607a] hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 mt-4',
};

// Tailwind Variables for Shop Page
export const shopStyles = {
  container: 'min-h-screen bg-[#F1FAEE] px-6 pt-32 pb-24',

  // Header section
  headerWrapper: 'text-center mb-12',
  topBadge: 'text-[#457b9d] font-bold tracking-widest uppercase text-xs mb-3 block',
  title: 'text-4xl md:text-5xl font-black text-[#1D3557] tracking-tight',
  accentText: 'text-[#457b9d]',
  underline: 'w-24 h-1.5 bg-[#1D3557]/10 mx-auto mt-6 rounded-full',

  // Controls section (Search, Sort, Filter)
  controlsWrapper: 'max-w-7xl mx-auto flex items-center justify-between my-6 gap-6',
  searchInput:
    'w-64 px-4 py-2 border rounded-lg shadow outline-none focus:ring-2 focus:ring-[#457b9d] transition-all',

  // Custom Select Dropdown
  selectWrapper: 'relative inline-block',
  selectInput:
    'bg-white rounded-xl shadow px-3 py-2.5 text-black text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-[#1D3557] appearance-none cursor-pointer hover:bg-slate-50 transition-all min-w-[160px]',
  selectIconWrapper:
    'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400',

  // Category Filter Buttons
  categoryGroup: 'flex flex-wrap gap-3',
  categoryBtn: (isSelected) => `
    px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border
    ${
      isSelected
        ? 'bg-[#1D3557] text-white border-[#1D3557] shadow-lg shadow-blue-900/20 scale-105'
        : 'bg-white text-slate-500 border-slate-200 hover:border-[#457b9d] hover:text-[#457b9d] hover:-translate-y-0.5'
    }
  `,

  // Product Grid
  grid: 'max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8',
};

// Tailwind Variables for Wishlist Page
export const wishlistStyles = {
  container: 'min-h-screen bg-[#F1FAEE] px-6 pt-28 pb-10',

  // Header Section
  headerWrapper: 'text-center mb-4',
  topBadge: 'text-[#457b9d] font-bold tracking-widest uppercase text-xs mb-1 block',
  title: 'text-4xl md:text-5xl font-black text-[#1D3557] tracking-tight',
  accentText: 'text-[#457b9d]',

  // Grid Layout
  grid: 'max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8',

  // Empty State Section
  emptyWrapper:
    'flex flex-col items-center justify-center text-center min-h-[50vh] w-full lg:col-span-4',
  emptyTitle: 'text-3xl md:text-4xl font-bold text-[#1D3557]',
  emptyText: 'text-gray-500 text-lg mt-2 max-w-xl',
  browseBtn:
    'mt-6 px-8 py-3 bg-[#1D3557] text-white rounded-full font-bold hover:bg-[#457b9d] transition shadow-lg',
};

export const getTailwindHexColors = () => {
  const colorValues = [
    ...extractHexColors(homeStyles),
    ...extractHexColors(cartStyles),
    ...extractHexColors(checkoutStyles),
    ...extractHexColors(forgetStyles),
    ...extractHexColors(loginStyles),
    ...extractHexColors(orderStyles),
    ...extractHexColors(notFoundStyles),
    ...extractHexColors(productStyles),
    ...extractHexColors(registerStyles),
    ...extractHexColors(shopStyles),
    ...extractHexColors(wishlistStyles),
  ];

  return Array.from(new Set(colorValues));
};

export const analyzeTailwindColors = (baseBackground = '#FFFFFF') => {
  return getTailwindHexColors().map((hex) => ({
    ...analyzeColor(hex),
    contrastAgainstWhite: Number(contrastRatio(hex, baseBackground).toFixed(2)),
    readability: getReadabilityLabel(contrastRatio(hex, baseBackground)),
  }));
};

export const analyzeTailwindStyles = (baseBackground = '#FFFFFF') => {
  const allStyles = {
    ...homeStyles,
    ...cartStyles,
    ...checkoutStyles,
    ...forgetStyles,
    ...loginStyles,
    ...orderStyles,
    ...notFoundStyles,
    ...productStyles,
    ...registerStyles,
    ...shopStyles,
    ...wishlistStyles,
  };
  return analyzeStyleObject(allStyles, baseBackground);
};
