# BunnyPlastics Web Application

A modern, high-performance web application and digital product catalog for **BunnyPlastics** — Philippines' trusted brand for household plastic furniture, drawers, dish cabinets, and organizers.

## 🚀 Features

- **Product Showcase & Catalog**: Filterable catalog by categories (Chairs, Drawers, Dish Cabinets, Storage Boxes, Tables) and color swatches.
- **Product Detail Views**: Interactive product image galleries, color selection, specification charts, and request-for-quote triggers.
- **Reseller Application System**: Multi-step distributor/reseller onboarding form with automatic Philippine address dropdowns (`@aivangogh/ph-address`), client-side image compression, 10MB file limits, and real-time progress modal.
- **Google Apps Script Integration**: Submissions dynamically stream to Google Sheets and Google Drive with instant email notification.
- **Performance Optimized**: Route-based code splitting (`React.lazy` + `Suspense`), WebP asset compression, and modular Rollup vendor chunking.
- **SEO & Security Hardened**: OpenGraph tags, CSP HTTPS enforcement, and responsive UI.

## 🛠️ Tech Stack

- **Framework**: React 19, TypeScript
- **Styling**: TailwindCSS v4, Lucide Icons
- **Routing**: React Router DOM v7
- **Address Data**: `@aivangogh/ph-address`
- **Build Tool**: Vite v8

## 📁 Project Structure

```
BunnyPlastics/
├── public/
│   ├── images/
│   │   ├── banners/       # Hero section banner WebP images
│   │   ├── brand/         # BunnyPlastics logos
│   │   ├── factory/       # About page collage images
│   │   ├── gallery/       # History polaroid images
│   │   ├── icons/         # Feature & contact icons
│   │   └── ...            # Product category images
├── src/
│   ├── components/        # Shared UI components & layout elements
│   ├── constants/         # Shared constants (e.g. COLOR_MAP)
│   ├── context/           # React context providers (e.g. CartContext)
│   ├── data/              # Static product catalog data
│   ├── layouts/           # RootLayout and navigation shell
│   ├── pages/             # Page views (Home, ProductsHub, ProductDetail, About, Distributors)
│   ├── App.tsx            # Lazy-loaded router configuration
│   └── main.tsx           # Entrypoint
├── index.html             # Main HTML template with SEO & security headers
├── vite.config.ts         # Vite build & Rollup chunking configuration
└── package.json
```

## ⚙️ Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The output bundle will be compiled into the `dist/` directory, optimized for deployment.
