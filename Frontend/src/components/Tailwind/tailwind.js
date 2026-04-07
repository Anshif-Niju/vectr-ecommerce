// Tailwind Variables for AddCart Component
export const cartBtnStyles = {
  button: "flex-1 bg-[#457b9d] text-white py-2.5 rounded-xl font-bold hover:bg-[#36607a] hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 text-sm"
};


// Tailwind Variables for Cart Card
export const cartCardStyles = {
  wrapper: "lg:col-span-2 space-y-6",
  cardContainer: "flex gap-6 bg-white border border-slate-200 p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow",
  image: "w-32 h-32 rounded-3xl object-cover bg-slate-100",
  
  contentArea: "flex-1 flex flex-col justify-center",
  title: "text-xl font-bold text-[#1D3557]",
  description: "text-slate-500 text-sm font-medium mt-1",
  
  actionRow: "flex items-center gap-6 mt-4",
  priceText: "text-[#457b9d] font-black text-xl",
  
  qtyControl: "flex items-center gap-3 bg-slate-50 px-2 py-1 rounded-xl border border-slate-100",
  qtyBtn: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-[#1D3557] font-bold transition-all",
  qtyValue: "font-bold text-[#1D3557] min-w-[20px] text-center",
  
  errorMsg: "text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded ml-auto",
  removeBtn: "self-start text-slate-300 hover:text-red-500 p-2 transition-colors",
  divider: "h-px bg-slate-200 my-4"
};



// Tailwind Variables for Checkout Card
export const checkoutStyles = {
  wrapper: "lg:col-span-2 space-y-6",
  cardContainer: "flex gap-6 bg-white border border-slate-200 p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow",
  image: "w-32 h-32 rounded-3xl object-cover bg-slate-100",
  
  contentArea: "flex-1 flex flex-col justify-center",
  title: "text-xl font-bold text-[#1D3557]",
  description: "text-slate-500 text-sm font-medium mt-1",
  
  detailsRow: "flex w-full justify-between items-center gap-6 mt-4",
  priceText: "text-[#457b9d] font-black text-xl",
  qtyText: "text-[#457b9d] font-black text-xl",
  totalText: "text-[#457b9d] font-black text-xl",
  
  removeBtn: "self-start text-slate-300 hover:text-red-500 p-2 transition-colors",
  divider: "h-px bg-slate-200 my-4",
  emptyMsg: "text-slate-500"
};




// Tailwind Variables for Feedback Section
export const feedbackStyles = {
  section: "w-full flex justify-center items-center py-24 bg-[#F1FAEE]",
  card: "w-full max-w-2xl mx-4 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-10 relative overflow-hidden",
  decorativeBlob: "absolute top-0 right-0 w-64 h-64 bg-[#457b9d]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2",
  
  title: "text-4xl font-black text-[#1D3557] text-center tracking-tight",
  subtitle: "text-slate-500 text-center mt-3 font-medium",
  
  statusMsg: (isError) => `${isError ? 'text-red-500 bg-red-50' : 'text-emerald-600 bg-emerald-50'} text-center mt-6 font-bold py-3 rounded-xl border border-transparent`,
  
  form: "mt-10 space-y-6",
  label: "block text-sm font-bold text-[#1D3557] mb-2 uppercase tracking-wide",
  input: "w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all font-medium",
  textarea: "w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all resize-none font-medium",
  
  submitBtn: "w-full py-4 rounded-xl font-bold text-white bg-[#457b9d] hover:bg-[#36607a] transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(69,123,157,0.5)] hover:shadow-[0_20px_25px_-5px_rgba(69,123,157,0.4)] hover:-translate-y-1"
};

// Tailwind Variables for Footer Component
export const footerStyles = {
  footer: "py-10 bg-[#1D3557] text-center border-t-4 border-[#457b9d]",
  container: "max-w-7xl mx-auto px-6",
  textBase: "text-slate-400 text-sm font-medium tracking-wide",
  brand: "text-white font-bold text-base",
  rights: "block sm:inline sm:mx-2 mt-2 sm:mt-0 opacity-50",
  developerWrapper: "block mt-4 sm:mt-0 sm:inline sm:ml-4",
  developerName: "ml-1 text-[#457b9d] hover:text-white transition-colors cursor-pointer font-bold"
};



// Tailwind Variables for HomeCard Component
export const cardStyles = {
    container: (id) => `
        group relative flex flex-col
        rounded-[2rem] bg-white border border-slate-100
        p-5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out
        ${id >= 5 ? "hidden md:flex" : "flex"}
    `,
    imageWrapper: "relative w-full h-56 rounded-3xl overflow-hidden bg-slate-50 mb-5",
    image: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
    imageOverlay: "absolute inset-0 bg-[#1D3557]/0 group-hover:bg-[#1D3557]/10 transition-colors duration-300",
    
    contentWrapper: "flex flex-col flex-grow",
    title: "text-xl font-black text-[#1D3557] mb-2 tracking-tight",
    description: "text-slate-500 text-sm font-medium mb-6 line-clamp-2 leading-relaxed",
    
    footer: "mt-auto flex justify-between items-center pt-4 border-t border-slate-100",
    price: "text-2xl font-black text-[#1D3557] tracking-tight",
    button: "rounded-full bg-[#457b9d]/10 text-[#457b9d] font-bold px-6 py-2.5 hover:bg-[#457b9d] hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-900/20"
};




// Tailwind Variables for Navbar
export const navStyles = {
  header: "fixed top-0 left-0 w-full z-50",
  nav: "mx-auto mw-full",
  mainRow: "flex items-center justify-between bg-white backdrop-blur-md border border-white/40 shadow-lg px-6 py-3 transition-all duration-300",
  
  // Logo Section
  logoWrapper: "flex items-center gap-2",
  logoImg: "h-[60px] w-auto object-contain",
  logoBadge: "h-12 w-12 rounded-2xl bg-gradient-to-br from-[#457b9d] to-[#1D3557] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-900/20",
  logoText: "text-xl font-black tracking-[0.24em] text-[#1D3557]",
  
  // Desktop Menu
  desktopMenu: "hidden md:flex items-center gap-8 text-sm font-medium text-slate-500",
  navItem: "hover:text-[#457b9d] transition-colors relative group",
  navLink: ({ isActive }) => `relative group transition-colors ${isActive ? 'text-[#457b9d] font-bold' : 'text-slate-500 hover:text-[#457b9d]'}`,
  navUnderline: "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#457b9d] transition-all group-hover:w-full",
  
  // Right Side Actions
  actionWrapper: "flex items-center gap-4",
  iconBtnWrapper: "relative group cursor-pointer",
  iconCircle: "h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center",
  badge: "absolute top-[-4px] right-[-5px] h-5 w-5 rounded-full bg-[#1D3557] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white",
  badgeCart: "absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#1D3557] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white",
  
  // Profile Section
  profileArea: "relative flex items-center gap-2",
  userName: "hidden lg:block text-[#1D3557] text-sm font-bold tracking-tight",
  userImg: "h-10 w-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:border-[#457b9d] transition-colors object-cover",
  userPlaceholder: "h-10 w-10 rounded-full bg-gradient-to-br from-[#457b9d] to-[#1D3557] border-2 border-white shadow-md cursor-pointer flex items-center justify-center text-white font-bold text-sm",
  
  // Dropdown
  dropdownCard: "absolute right-0 top-[55px] bg-white border border-slate-100 rounded-2xl shadow-xl w-48 p-2 animate-slideDown overflow-hidden",
  dropdownHeader: "px-4 py-3 border-b border-slate-100 mb-2",
  dropdownLabel: "text-xs text-slate-400 font-bold uppercase tracking-wider",
  dropdownName: "text-sm font-bold text-[#1D3557] truncate",
  logoutBtn: "w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition mt-1",
  
  // Mobile Toggle
  mobileToggle: "md:hidden h-10 w-10 text-[#1D3557] rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-xl",
  mobileMenu: "md:hidden mt-2 mx-2 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl p-6 animate-slideDown",
  mobileLink: "block text-lg font-medium hover:font-bold text-[#1D3557] py-2",
  mobileLinkSecondary: "block text-lg font-medium hover:font-bold text-slate-600 py-2"
};




// Tailwind Variables for ProductCard
export const shopCardStyles = {
  container: "group bg-white border border-slate-100 rounded-[1.5rem] p-5 shadow-sm hover:shadow-[0_8px_30px_rgb(69,123,157,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full",
  
  // Link & Image Section
  linkWrapper: "block relative overflow-hidden rounded-2xl flex-1",
  imageContainer: "w-full h-48 bg-slate-50 overflow-hidden rounded-2xl",
  image: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
  
  // Text Content
  textSection: "mt-4 space-y-1",
  title: "text-lg font-black text-[#1D3557] leading-tight group-hover:text-[#457b9d] transition-colors",
  description: "text-slate-500 text-sm font-medium line-clamp-2",
  price: "text-[#457b9d] font-black text-2xl pt-2",
  
  // Messages
  errorMsg: "text-xs font-bold text-red-500 bg-red-50 px-2 rounded ml-auto",
  
  // Quantity Controls Row
  controlsRow: "flex flex-wrap items-center gap-3 mt-4 p-2 bg-slate-50 rounded-xl w-full",
  qtyBtnMinus: "w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#1D3557] hover:bg-[#1D3557] hover:text-white transition-colors shadow-sm font-bold",
  qtyBtnPlus: "w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#1D3557] hover:bg-[#457b9d] hover:text-white transition-colors shadow-sm font-bold",
  qtyDisplay: "text-lg font-bold text-[#1D3557] min-w-[20px] text-center",
  
  // Action Buttons Row
  actionsRow: "flex gap-3 mt-5 w-full"
};

// Tailwind Variables for Wishlist Button
export const wishlistBtnStyles = {
  button: "p-2 rounded-full bg-white shadow-md hover:scale-110 transition z-10",
  icon: (isLiked) => `transition-colors duration-300 ${
    isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
  }`
};
