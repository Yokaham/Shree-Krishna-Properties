# Shree Krishna Properties - Real Estate Platform

A modern real estate platform built with React and Supabase for property listings and management.

## Features

- **Property Listings**: Browse and search through available properties
- **Advanced Filtering**: Filter by sector, property type, price range, and more
- **Image Galleries**: Interactive carousels for property images
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Data**: Connected to Supabase for live property data

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Database Configuration

The application uses Supabase for data storage. The Supabase client configuration is located in:
- `src/supabaseClient.js`

The database includes an `ads` table with the following structure:
- `id` (primary key)
- `title` (property title)
- `price` (price in INR)
- `location` (property location)
- `description` (detailed description)
- `features` (array of property features)
- `images` (array of image URLs)
- `sector` (property sector)
- `property_type` (plot/kothi/flat/land)
- `owner_listed` (boolean for owner vs agent)
- `size` (property size in marla/units)

## Available Scripts

- `npm start` - Runs the development server
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js       # Reusable button component
│   ├── PropertyCard.js # Property listing card
│   ├── FeatureBadge.js # Property feature badges
│   ├── Navbar.js       # Navigation header
│   ├── Footer.js       # Site footer
│   └── ContactButton.js # Floating contact button
├── pages/              # Main application pages
│   ├── home.js         # Homepage with hero and samples
│   ├── Ads.js          # Property listings with search/filter
│   └── AdDetails.js    # Individual property details
├── hooks/              # Custom React hooks
│   └── useAds.js       # Hook for fetching and filtering ads
├── styles/             # Global styles
│   └── global.css      # Tailwind CSS and custom styles
└── supabaseClient.js   # Supabase configuration
```

## Technologies Used

- **React** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service
- **React Slick** - Image carousel component
- **Lucide React** - Modern icon library
- **Framer Motion** - Animation library

## Modified Files

- `src/pages/home.js` - Updated with modern button components
- `src/pages/Ads.js` - Complete rebuild with search, filters, and pagination
- `src/pages/AdDetails.js` - Enhanced with modern buttons and improved layout
- `src/components/Button.js` - New reusable button component
- `src/components/Navbar.js` - Updated with modern button styling
- `src/components/Footer.js` - Updated with consistent button design
- `src/components/ContactButton.js` - Modernized with new button component
- `src/hooks/useAds.js` - New hook for advanced property filtering and pagination