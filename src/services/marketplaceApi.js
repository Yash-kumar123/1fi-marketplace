import { products } from "../data/products";
import { emiPlans } from "../data/emiPlans";

let simulateErrorGlobal = false;

export const simulateError = {
  enabled: false,
  set(value) {
    simulateErrorGlobal = Boolean(value);
    this.enabled = simulateErrorGlobal;
  },
};

/**
 * Toggle deterministic simulated error for testing error states.
 * @param {boolean} value
 */
export function setSimulateError(value) {
  simulateErrorGlobal = Boolean(value);
  simulateError.enabled = simulateErrorGlobal;
}

export function isSimulateErrorEnabled() {
  return simulateErrorGlobal;
}

/**
 * Random async delay between min and max milliseconds.
 */
function randomDelay(min = 300, max = 800) {
  const duration = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, duration));
}

/**
 * Fetch all marketplace products.
 * @param {Object} options
 * @param {boolean} [options.simulateError] - Override global error simulation flag.
 * @returns {Promise<Array>}
 */
export async function getProducts(options = {}) {
  await randomDelay(300, 800);

  if (options.simulateError || simulateErrorGlobal) {
    throw new Error("Unable to fetch marketplace products. Please check your connection and try again.");
  }

  // Return a cloned copy to prevent external mutation
  return products.map((item) => ({ ...item }));
}

/**
 * Fetch a single product by ID.
 * @param {string} id
 * @param {Object} options
 * @param {boolean} [options.simulateError]
 * @returns {Promise<Object|null>}
 */
export async function getProductById(id, options = {}) {
  await randomDelay(300, 600);

  if (options.simulateError || simulateErrorGlobal) {
    throw new Error("Unable to fetch product details. Please try again.");
  }

  const found = products.find((item) => item.id === id);
  return found ? { ...found } : null;
}

/**
 * Fetch EMI plans available for a specific product.
 * Calculates monthly and total amounts based on the product price.
 * @param {string} productId
 * @param {Object} options
 * @param {boolean} [options.simulateError]
 * @returns {Promise<Array>}
 */
export async function getEmiPlans(productId, options = {}) {
  await randomDelay(300, 600);

  if (options.simulateError || simulateErrorGlobal) {
    throw new Error("Unable to load EMI plans. Please try again.");
  }

  const product = products.find((item) => item.id === productId);
  if (!product) {
    return [];
  }

  const productEmiIds = product.emiPlanIds || [];
  const matchedPlans = emiPlans.filter((plan) => productEmiIds.includes(plan.id));

  return matchedPlans.map((plan) => {
    let totalAmount = product.price;
    if (plan.interest > 0) {
      const interestAmount = (product.price * (plan.interest / 100) * (plan.duration / 12));
      totalAmount = Math.round(product.price + interestAmount);
    }
    const monthlyAmount = Math.round(totalAmount / plan.duration);

    return {
      ...plan,
      monthlyAmount,
      totalAmount,
    };
  });
}
