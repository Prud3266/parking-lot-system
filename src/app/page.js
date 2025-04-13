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

  const handleSlotClick = (id) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id
          ? { ...slot, isBooked: !slot.isBooked }
          : slot
      )
    );
  };

  return (
    <main className="container">
      <h1>Parking Lot Management System</h1>
      <div className="grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${slot.isBooked ? 'booked' : 'free'} ${slot.type}`}
            onClick={() => handleSlotClick(slot.id)}
          >
            <p>Slot {slot.id}</p>
            <p>{slot.type === 'small' ? 'Small Only' : 'Small/Large'}</p>
            <p>{slot.isBooked ? 'Booked' : 'Free'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

