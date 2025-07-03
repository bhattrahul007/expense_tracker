// Utility to format currency with symbol based on currency code
export function formatCurrency(currency: string = 'INR', amount: number | undefined = undefined) {
  let symbol = '';
  switch (currency.toUpperCase()) {
    case 'INR':
      symbol = '₹';
      break;
    case 'USD':
      symbol = '$';
      break;
    case 'EUR':
      symbol = '€';
      break;
    // Add more as needed
    default:
      symbol = currency.toUpperCase() + ' ';
  }
  const values = [symbol, amount?.toLocaleString('en-IN')].filter(Boolean);
  return values.join(' ');
}
