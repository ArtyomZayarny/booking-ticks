# QuickShow: Movie Ticket Booking App

QuickShow is a full-stack web application for browsing movies, booking tickets, and managing cinema shows. It features a modern React frontend (Vite, Tailwind CSS) and a Node.js/Express backend with MongoDB, Stripe payments, and Clerk authentication.

---

## Features

### User Features

- **Browse Movies:** View now-showing movies with details, genres, cast, and trailers.
- **Book Tickets:** Select showtimes, pick seats, and pay securely via Stripe.
- **Favorites:** Mark movies as favorites for quick access.
- **My Bookings:** View your booking history and details.
- **Authentication:** Secure sign-in/sign-up with Clerk.

### Admin Features

- **Dashboard:** View total bookings, revenue, active shows, and user stats.
- **Show Management:** Add new shows, list all shows, and manage bookings.
- **Protected Routes:** Only admins can access the admin dashboard and features.

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router, Clerk, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Stripe, Clerk, Inngest
- **Deployment:** Vercel (see `vercel.json` in both client and server)

---

## Getting Started

### Prerequisites

- Node.js v18+ (recommended)
- MongoDB instance (local or cloud)
- Stripe account (for payments)
- Clerk account (for authentication)

### Environment Variables

#### Client (`client/.env`)

```
VITE_BASE_URL=<your-backend-api-url>
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_CURRENCY=$
```

#### Server (`server/.env`)

```
MONGODB_URI=<your-mongodb-uri>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
TMDB_API_KEY=<your-tmdb-api-key>
```

---

## Setup & Run

### 1. Clone the repository

```bash
git clone <repo-url>
cd booking-ticks
```

### 2. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

- Create `.env` files in both `client` and `server` as shown above.

### 4. Start the development servers

- **Frontend:**
  ```bash
  cd client
  npm run dev
  ```
- **Backend:**
  ```bash
  cd server
  npm run server
  ```

### 5. Access the app

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

---

## Deployment

- Both client and server are configured for Vercel deployment (`vercel.json` in each folder).
- Set environment variables in Vercel dashboard for both frontend and backend.

---

## Folder Structure

```
booking-ticks/
  client/   # React frontend
  server/   # Node.js/Express backend
```

---

## API Overview

- **/api/shows**: List all shows, get show details
- **/api/bookings**: Create booking, get occupied seats
- **/api/user**: User bookings, favorites
- **/api/admin**: Admin dashboard, show and booking management

---

## Credits

- Inspired by modern movie ticketing platforms
- Built with ❤️ by your team

---

## License

[MIT](LICENSE)
