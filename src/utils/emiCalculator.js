/**
 * Calculates monthly installment and total payable for an EMI plan.
 * @param {number} principal - The product principal amount
 * @param {number} durationMonths - Loan tenure in months
 * @param {number} annualInterestRate - Annual interest percentage (0 for No-Cost EMI)
 * @returns {{ monthlyAmount: number, totalAmount: number, totalInterest: number }}
 */
export function calculateEmi(principal, durationMonths, annualInterestRate = 0) {
  const p = Number(principal) || 0;
  const n = Number(durationMonths) || 1;
  const rate = Number(annualInterestRate) || 0;

  if (rate <= 0) {
    const monthly = Math.round(p / n);
    return {
      monthlyAmount: monthly,
      totalAmount: p,
      totalInterest: 0,
    };
  }

  // Simple annual interest approximation commonly used for consumer durable loans
  const totalInterest = Math.round(p * (rate / 100) * (n / 12));
  const totalAmount = p + totalInterest;
  const monthlyAmount = Math.round(totalAmount / n);

  return {
    monthlyAmount,
    totalAmount,
    totalInterest,
  };
}

/**
 * Format a number into standard Indian Rupee currency format (₹).
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return `₹${num.toLocaleString("en-IN")}`;
}
