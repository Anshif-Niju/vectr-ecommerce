export const ORDER_STATUS_OPTIONS = [
  'Processing',
  'Delivery Soon',
  'Delivery Today',
  'Delivery Completed',
];

export const getOrderStatusClasses = (status) => {
  switch (status) {
    case 'Delivery Soon':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'Delivery Today':
      return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'Delivery Completed':
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'Processing':
    default:
      return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
  }
};
