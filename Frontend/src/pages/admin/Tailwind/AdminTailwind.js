export const adminShellStyles = {
  page: 'min-h-screen bg-slate-900 text-slate-200 flex relative',
  main: 'flex-1 p-6 md:p-8 w-full overflow-y-auto',
  content: 'min-h-screen bg-[#0f172a] p-8 text-white flex-1 w-full',
  sectionTitle: 'text-xl font-semibold mb-4 text-white',
};

export const adminSideBarStyles = {
  overlay: 'fixed inset-0 bg-black/50 z-40 md:hidden',
  aside: (open) => `
    fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 p-6
    flex flex-col
    transform transition-transform duration-300
    ${open ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:sticky md:top-0 md:h-screen
  `,
  header: 'flex justify-between items-center mb-8',
  title: 'text-2xl font-bold text-white',
  closeButton: 'md:hidden text-slate-400 hover:text-white',
  nav: 'space-y-4 flex-1',
  navLink: 'block hover:text-cyan-400',
  footer: 'mt-auto pt-8',
  logoutButton: 'bg-cyan-500 w-full hover:bg-cyan-600 px-4 py-2 rounded-lg text-white transition',
};

export const adminDashboardStyles = {
  header: 'flex justify-between items-center mb-8',
  headerLeft: 'flex items-center gap-4',
  menuButton: 'md:hidden text-white text-3xl hover:text-cyan-400 transition',
  title: 'text-3xl font-semibold text-white',
  statsGrid: 'grid grid-cols-1 md:grid-cols-4 gap-6 mb-10',
  statCard: 'bg-slate-800 p-6 rounded-xl shadow border border-slate-700',
  statLabel: 'text-sm text-slate-400',
  statValue: 'text-3xl font-bold mt-2 text-white',
  statValueRevenue: 'text-3xl font-bold mt-2 text-green-400',
  chartCard: 'bg-slate-800 p-6 rounded-xl shadow mb-10 border border-slate-700',
  chartTitle: 'text-xl font-semibold mb-6 text-white',
  chartWrapper: 'h-[300px] w-full',
  tooltipContent: {
    backgroundColor: '#1e293b',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
  },
  tooltipItem: { color: '#22d3ee' },
  tableWrapper: 'bg-slate-800 rounded-xl shadow p-6 overflow-x-auto border border-slate-700',
  table: 'w-full text-left min-w-[600px]',
  tableHeadRow: 'text-slate-400 border-b border-slate-700',
  tableHeadCell: 'py-3',
  tableRow: 'border-b border-slate-700 hover:bg-slate-700/50 transition',
  orderIdCell: 'py-3 font-mono text-cyan-400',
  statusBadgeBase: 'px-3 py-1 rounded-full text-xs',
  paymentCell: 'capitalize',
  amountCell: 'font-bold',
};

export const adminOrdersStyles = {
  content: 'min-h-screen bg-[#0f172a] p-8 text-white flex-1 w-full',
  title: 'text-3xl text-center font-bold mb-8',
  grid: 'grid gap-6 grid-cols-1 lg:grid-cols-2',
  card: 'bg-slate-800 rounded-2xl shadow-lg p-6 hover:scale-[1.01] transition border border-slate-700/50',
  header: 'flex justify-between items-start mb-4',
  orderId: 'text-xl font-bold text-cyan-400',
  userText: 'text-xl font-bold text-white-400',
  dateText: 'text-xs text-cyan-500 uppercase tracking-widest',
  badgeColumn: 'flex flex-col items-end gap-2',
  badgeBase: 'px-3 py-1 rounded-full text-xs font-semibold',
  paymentBadge:
    'px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  sectionCard: 'bg-slate-900/50 rounded-xl p-4',
  sectionLabel: 'text-xs font-bold text-slate-400 mb-2 uppercase',
  addressPrimary: 'text-sm text-slate-200',
  addressSecondary: 'text-sm text-slate-300',
  sectionStack: 'space-y-3 my-3',
  itemRow: 'flex justify-between text-sm py-1 border-b border-slate-700 last:border-0',
  itemName: 'text-slate-200',
  qtyText: 'text-cyan-400 font-medium',
  footer: 'flex justify-between items-center pt-2',
  revenueLabel: 'text-xs text-slate-400',
  revenueValue: 'text-xl font-bold text-white',
  selectWrap: 'min-w-[220px]',
  selectLabel: 'block text-xs font-bold text-slate-400 mb-2 uppercase',
  select:
    'w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-cyan-400',
  empty: 'col-span-full text-center py-20 text-slate-500',
};

export const adminProductsStyles = {
  content: 'flex-1 min-h-screen bg-[#0f172a] p-8 text-white',
  header: 'flex justify-between items-center mb-8',
  title: 'text-3xl font-bold',
  addButton: 'bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold transition',
  grid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
  card: 'bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700/50 hover:scale-[1.02] transition',
  imageWrap: 'h-48 w-full bg-slate-700 relative overflow-hidden group',
  image: 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
  metaRow: 'flex justify-between my-3 items-start mb-4',
  name: 'text-xl font-bold text-cyan-400',
  productId: 'text-sm text-slate-400',
  statusBadge: (isActive) =>
    `px-3 py-1 rounded-full text-xs font-semibold ${
      isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
    }`,
  details: 'space-y-2 text-sm text-slate-300',
  detailLabel: 'font-semibold text-slate-400',
  actionRow: 'mt-5 flex justify-between',
  editButton: 'bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm font-semibold',
  toggleButton: 'bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm font-semibold',
  modalOverlay: 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4',
  modalCard:
    'bg-slate-900 w-[650px] max-w-full rounded-2xl shadow-2xl p-8 relative border border-slate-700 overflow-y-auto max-h-[90vh]',
  modalHeader: 'flex justify-between items-center mb-6',
  modalTitle: 'text-2xl font-bold text-cyan-400',
  modalClose: 'text-slate-400 hover:text-red-400 text-xl',
  formGrid: 'grid grid-cols-2 gap-4',
  span2: 'col-span-2',
  label: 'text-xs text-slate-400',
  input:
    'w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white',
  textarea:
    'w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white',
  select:
    'w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white',
  modalActions: 'flex justify-end gap-4 mt-8',
  primaryButton: 'bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold text-white',
  secondaryButton:
    'bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-semibold text-white transition',
  createButton:
    'bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/20 transition',
};

export const adminUserListStyles = {
  main: 'flex-1 p-6 md:p-8 w-full',
  header: 'flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8',
  title: 'text-3xl font-bold text-center text-white tracking-tight',
  statsWrap: 'flex gap-4',
  statCard:
    'bg-slate-800/40 border border-slate-700/50 p-3 rounded-2xl flex items-center gap-3 backdrop-blur-sm',
  statIcon: (type) =>
    `p-2 rounded-xl ${
      type === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
    }`,
  statLabel: 'text-[10px] uppercase text-slate-500 font-bold',
  statValue: 'text-lg font-bold text-white',
  searchWrap: 'relative mb-8 max-w-md',
  searchIcon: 'absolute left-4 top-1/2 -translate-y-1/2 text-slate-500',
  searchInput:
    'w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600',
  grid: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  card: (isActive) =>
    `bg-slate-800/80 rounded-3xl border border-slate-700/50 p-6 transition-all group relative overflow-hidden ${
      !isActive ? 'opacity-80' : ''
    }`,
  glow: 'absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full',
  topRow: 'flex justify-between items-start mb-5',
  avatar:
    'h-14 w-14 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xl font-bold text-cyan-400 shadow-inner',
  statusBadge: (isActive) =>
    `px-3 py-1 rounded-full font-black uppercase text-sm ${
      isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
    }`,
  name: 'text-xl font-bold text-white truncate',
  infoSection: 'space-y-4 py-4 border-t border-slate-700/50',
  infoLabel: 'text-[10px] uppercase text-slate-500 font-bold block mb-1',
  infoValue: 'text-sm text-slate-300 truncate',
  infoDate: 'text-sm text-slate-300',
  actionRow: 'mt-6 flex gap-2',
  actionButton: (isActive) =>
    `flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${
      isActive
        ? 'bg-slate-700 text-slate-300 hover:bg-red-500 hover:text-white'
        : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/20'
    }`,
  emptyState:
    'flex flex-col items-center justify-center py-24 bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-800',
  emptyIcon: 'text-slate-700 mb-4',
  emptyTitle: 'text-xl font-bold text-slate-400',
  emptyText: 'text-slate-500 text-sm',
};

export const adminLoginStyles = {
  container:
    'min-h-screen flex items-center justify-center bg-[#F1FAEE] px-4 relative overflow-hidden',
  blurTop: 'absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#457b9d]/10 rounded-full blur-3xl',
  blurBottom: 'absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-[#1D3557]/10 rounded-full blur-3xl',
  card: 'w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 relative z-10 border border-slate-100',
  header: 'text-center mb-8',
  title: 'text-4xl font-black text-[#1D3557] tracking-tight',
  subtitle: 'text-slate-400 mt-2 font-medium',
  form: 'space-y-5',
  group: 'group',
  label: 'block text-sm font-bold text-[#1D3557] mb-2 ml-1',
  input:
    'w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#1D3557] font-bold placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#457b9d] focus:border-transparent transition-all duration-300',
  error: 'text-center text-xs font-bold text-red-500 bg-red-50 py-2 rounded',
  button:
    'w-full bg-[#457b9d] hover:bg-[#1D3557] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl',
  footer: 'text-center mt-6',
  footerLink: 'text-[#457b9d] hover:text-[#1D3557] font-bold transition-colors duration-300',
};
