Risk-Free Parking Lot Management System

A simple browser-based parking lot system built with Next.js (JavaScript).

🚗 Features

15 Parking Slots

Slots 1–10: Small vehicles only (₦60 base fee)

Slots 11–15: Small & large vehicles (₦100 base fee)

Extra Fee: ₦15 for every extra hour after 30 mins

Live Slot Booking & Exit

Revenue Tracking

Data Persistence via Local Storage

🧱 Technologies

Next.js (App Router, JavaScript)

Vanilla CSS (no Tailwind)

▶️ How to Run Locally

# 1. Clone the repository
https://github.com/YOUR_USERNAME/parking-lot-system.git
cd parking-lot-system

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev

Then open http://localhost:3000 in your browser.

🧪 How to Use

Select vehicle type

Click “Book Slot” → auto-assigns first available slot

Click a booked slot to exit and see fee breakdown

All data is stored in browser memory (localStorage)

📁 Project Structure

src/
  app/
    page.js         # Main booking logic
    globals.css     # Styling

⏰ Submission Deadline

Final commit must be pushed before 10:15 AM WAT.

Built for the Parking Lot System Coding Challenge.

