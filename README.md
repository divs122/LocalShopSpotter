# Local Marketplace Platform

A local marketplace platform connecting shoppers with nearby stores using an interactive and free map-based interface powered by OpenStreetMap and Leaflet.js.

## Features

- Interactive store map with OpenStreetMap integration
- Store listings with detailed information
- Product catalog for each store
- Search and filter functionality
- Responsive design for all devices

## Tech Stack

- Frontend: React + TypeScript
- Mapping: OpenStreetMap/Leaflet.js
- Backend: Express.js
- Styling: Tailwind CSS + shadcn/ui

## Prerequisites

- Node.js (v20.x or later)
- npm (v10.x or later)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utility functions
├── server/                # Express.js backend
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage logic
└── shared/               # Shared types and schemas
```

## Development

- The application uses an in-memory database by default
- The map is powered by OpenStreetMap with Leaflet.js integration
- The UI is built with shadcn/ui components and Tailwind CSS

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Run production server
- `npm run check`: Run TypeScript type checking
