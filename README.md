# 1Fi Marketplace — React Native (Expo)

A premium fintech e-commerce mobile application built with **React Native (Expo)**, demonstrating a modern marketplace experience where users can shop for products and pay later using **No-Cost and Low-Cost EMIs backed by Mutual Funds**.

---

## 📱 Features

### 1. Shop & Marketplace Home
- **1Fi Hero Banner**: Custom fintech advertising hero reproducing the 1Fi visual identity ("Shop today, Pay later using Mutual funds") with a 16:9 composite banner, gold badges, and glowing purple lighting.
- **Pill Tabs Navigation**: Clean switcher between **Top Brands**, **Nearby Stores**, and **Marketplace**.
- **Live Search & Filter**: Real-time search with instant results, a dedicated clear (`x`) button, and keyboard dismissal.
- **2-Column Product Grid**: Responsive cards showing category tags, high-resolution product imagery, titles, base pricing, and calculated best EMI badges (e.g. *From ₹2,499/mo*).

### 2. Product Details & Variant Selection
- **Header Navigation**: Back button with seamless return to marketplace.
- **Variant Selector**: Interactive pill selectors (e.g., storage tiers, colors) that dynamically recalculate the effective price and update all EMI tenure plans in real time.
- **Product Information**: Detailed description, category tag, and specs.
- **EMI Plan Options**: Interactive cards displaying:
  - Tenure (3, 6, 9, 12 months)
  - Monthly installment
  - Interest rate (with prominent **0% No-Cost EMI** highlight)
  - Processing fee
  - Total payable amount
- **Sticky EMI Summary Bar**: Pinned bottom action bar displaying the selected monthly installment and an active **Proceed** CTA button.

### 3. Order Confirmation
- **Confirmation Screen**: Displays verified order summary, selected variant option, tenure breakdown, processing fee, interest rate, and total amount payable.
- **Done Action**: Cleans up and navigates back to the marketplace home.

### 4. Robust UX & State Handling
- **Skeleton Loaders**: Pulsing skeleton cards during initial API fetch.
- **Error States with Retry**: Graceful error screens with retry buttons for resilience.
- **Deterministic Testing**: `simulateError` flag in `src/services/marketplaceApi.js` for quick edge-case validation.
- **Empty States**: Helpful messaging when searches return no matching products with a one-tap reset.

### 5. Multi-Platform Safe Area Handling
- Fully compatible with iOS notch / Dynamic Island and modern Android devices.
- Handles Android edge-to-edge transparent **3-button navigation** (`|||`, `O`, `<`) and gesture bars, ensuring buttons and tabs are never covered by system UI.

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo SDK 57](https://expo.dev/)
- **Language**: JavaScript (ES6+)
- **Navigation**:
  - `@react-navigation/native` (v6)
  - `@react-navigation/bottom-tabs` (v6)
  - `@react-navigation/native-stack` (v6)
- **Safe Area**: `react-native-safe-area-context`
- **Icons**: `@expo/vector-icons` (Ionicons)

---

## 📂 Project Structure

```text
1fi-marketplace/
├── .expo/                       # Expo development cache
├── .gitignore                   # Git ignore configuration
├── App.js                       # Root entry point with SafeAreaProvider & StatusBar
├── app.json                     # Expo project configuration
├── package.json                 # Dependencies and npm scripts
├── README.md                    # Project documentation
└── src/
    ├── assets/                  # Hero banner and visual media
    │   └── hero_banner.jpg
    ├── components/
    │   ├── common/              # Reusable UI primitives
    │   │   ├── Button.js        # Primary / secondary button component
    │   │   ├── Card.js          # Elevated card container
    │   │   ├── EmptyState.js    # Empty search placeholder
    │   │   ├── ErrorState.js    # Error message with retry action
    │   │   ├── LoadingState.js  # Spinner loading screen
    │   │   ├── PillTabs.js      # Segmented pill switcher
    │   │   ├── SearchBar.js     # Search input with clear button
    │   │   ├── SectionHeader.js # Section title with action label
    │   │   └── SkeletonLoader.js# Pulsing animated skeleton loader
    │   ├── marketplace/         # Marketplace specific components
    │   │   ├── EmiPlanCard.js   # Selectable EMI tenure plan card
    │   │   ├── EmiSummaryBar.js # Sticky bottom summary & Proceed CTA
    │   │   ├── MarketplaceHome.js# Product list, filters & states
    │   │   ├── ProductCard.js   # 2-column grid product card
    │   │   └── VariantSelector.js# Interactive variant pill selector
    │   └── shop/                # Shop home components
    │       ├── HeroBanner.js    # 1Fi branded hero advertising banner
    │       ├── NearbyStoresPlaceholder.js # Minimal placeholder
    │       └── TopBrandsPlaceholder.js    # Minimal placeholder
    ├── constants/               # Design tokens
    │   ├── colors.js            # Color palette & gradients
    │   └── spacing.js           # Radii, margins, padding & font sizing
    ├── data/                    # Mock data fixtures
    │   ├── emiPlans.js          # EMI tenure templates & rates
    │   └── products.js          # Product catalog with variants
    ├── navigation/              # React Navigation routers
    │   ├── BottomTabs.js        # Main 5-tab bottom navigation
    │   ├── RootNavigator.js     # Root navigator wrapper
    │   └── ShopStack.js         # Native stack for Shop -> Details -> Confirmation
    ├── screens/                 # Top-level screen components
    │   ├── EmiDuesScreen.js     # Placeholder tab screen
    │   ├── HomeScreen.js        # Placeholder tab screen
    │   ├── LimitScreen.js       # Placeholder tab screen
    │   ├── ProfileScreen.js     # Placeholder tab screen
    │   ├── ShopHomeScreen.js    # Shop main screen with Hero, Tabs & Grid
    │   └── marketplace/
    │       ├── ProceedConfirmationScreen.js # Order confirmation screen
    │       └── ProductDetailsScreen.js     # Product details & EMI screen
    ├── services/                # Asynchronous API layer
    │   └── marketplaceApi.js    # Data fetching & simulated latency
    └── utils/                   # Business logic helpers
        └── emiCalculator.js     # EMI formulas & currency formatting
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- Mobile device with [Expo Go](https://expo.dev/go) installed (available on Google Play Store & iOS App Store)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start -c
```

### 3. Open on Mobile (Expo Go)
Ensure your phone is connected to the **same Wi-Fi network** as your computer:

#### Option A: Scan the QR Code
- On **Android**: Open the **Expo Go** app and tap **"Scan QR code"**.
- On **iOS**: Open the native **Camera** app and tap the Expo Go notification link.

#### Option B: Enter URL Manually
1. Open the **Expo Go** app.
2. Tap **"Enter URL manually"**.
3. Enter your local LAN address displayed in the terminal:
   ```text
   exp://<YOUR_LOCAL_IP>:8081
   ```

### 4. Open in Web Browser (Optional)
Press **`w`** in the terminal running Expo, or run:
```bash
npx expo start --web
```

---

## 🧮 EMI Calculation Logic

The project includes an accurate financial utility in `src/utils/emiCalculator.js`:

- **Standard EMI Formula**:
  $$\text{EMI} = \frac{P \times r \times (1+r)^n}{(1+r)^n - 1}$$
  Where:
  - $P$ = Principal amount (Effective product price)
  - $r$ = Monthly interest rate ($\frac{\text{Annual Rate}}{12 \times 100}$)
  - $n$ = Tenure in months

- **No-Cost EMI (0% Interest)**:
  $$\text{EMI} = \frac{P}{n}$$
  With zero interest markup and no hidden costs.

---

## 🧪 Testing Error States

To test the deterministic error handling in the API layer, open `src/services/marketplaceApi.js` and toggle:
```javascript
export const simulateError = {
  products: true, // Simulates product list fetch failure
  productDetails: false,
  emiPlans: false,
};
```
The app will display the custom `ErrorState` component with a working **"Try Again"** button.

---

## 📋 Diagnostics & Code Quality

Validate project configuration and dependencies anytime with:
```bash
npx expo-doctor
```
*(All 21/21 checks pass with no issues).*
