# Shree Krishna Properties - Real Estate Platform

A modern real estate platform built with React and Supabase for Shree Krishna Properties.

## Features

- **Property Search & Filtering**: Advanced search with filters for sector, type, price, and more
- **Image Carousels**: All property images displayed in responsive carousels
- **Responsive Design**: Mobile-first design optimized for all devices
- **Real-time Data**: Live property data from Supabase database

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

The application uses Supabase for data storage. The Supabase client is configured in:
- `src/supabaseClient.js`

The database includes an `ads` table with the following structure:
- `id` (primary key)
- `title` (property title)
- `price` (price in INR)
- `location` (property location)
- `sector` (property sector)
- `description` (detailed description)
- `features` (array of property features)
- `images` (array of image URLs)
- `property_type` (plot/kothi/flat/land)
- `owner_listed` (boolean for owner vs agent)
- `size` (property size in marla/units)
- `created_at` (timestamp)

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
└── supabaseClient.js   # Supabase client configuration
```

## Technologies Used

- **React** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service
- **React Slick** - Image carousel component
- **Lucide React** - Modern icon library
- **Framer Motion** - Animation library

## Key Features

- **Search**: Debounced search across title, location, and description
- **Filters**: Sector, property type, price range, size, owner listing, and tags
- **Pagination**: Server-side pagination with 12 properties per page
- **Responsive**: Mobile-first design with proper breakpoints
- **Image Carousels**: All property images displayed in swipeable carousels