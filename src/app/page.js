"use client"
import './globals.css';
import { useState } from 'react';

const TOTAL_SLOTS = 15;

export default function HomePage() {
  const [slots, setSlots] = useState(
    Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
      id: i + 1,
      type: i < 10 ? 'small' : 'both',
      isBooked: false
    }))
  );

  return (
    <main className="container">
      <h1>AtOwner'sRisk Parking Lot Management System</h1>
      <div className="grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${slot.isBooked ? 'booked' : 'free'} ${slot.type}`}
          >
            <p>Slot {slot.id}</p>
            <p>{slot.type === 'small' ? 'Small Only' : 'Small/Large'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
