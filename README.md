# Redberry E-commerce Frontend

A modern RedSeam Clothing e-commerce frontend for Redberry, styled with Tailwind CSS. This project features product listing, filtering, sorting, cart management, and checkout, with API integration.

## Features

- Product catalog with pagination
- Price and sort filters
- Cart drawer and checkout flow
- Responsive design
- API integration via environment variable

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- clsx, tailwind-merge

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Bdmnss/redberry.git
cd redberry
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

Copy the contents of `.env.example` to a new `.env` file:

```bash
cp .env.example .env
```

> **Note:** The API base URL is set in `.env`. You can change it if needed.

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Run tests

```bash
npm test
```

## Folder Structure

```
├── public/           # Static assets
├── src/
│   ├── api/          # API hooks and requests
│   ├── components/   # Reusable UI components
│   ├── icons/        # SVG icon components
│   ├── pages/        # Route pages
│   ├── assets/       # Local images/icons
│   ├── index.css     # Global styles
│   └── main.tsx      # App entry point
├── .env.example      # Example environment config
├── package.json      # Project metadata
├── tailwind.config.js
├── vite.config.ts
└── README.md         # Project documentation
```

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for API requests. Set this in your `.env` file.

---

> After cloning, always create a `.env` file and copy the contents from `.env.example` before running the project.
