"use client"
import './globals.css';
import { useState, useEffect } from 'react';

const TOTAL_SLOTS = 15;
const STORAGE_KEY = 'parking_slots';
const REVENUE_KEY = 'parking_revenue';

export default function HomePage() {
  const [vehicleType, setVehicleType] = useState('small');
  const [slots, setSlots] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const savedSlots = localStorage.getItem(STORAGE_KEY);
    const savedRevenue = localStorage.getItem(REVENUE_KEY);
    setSlots(
      savedSlots ? JSON.parse(savedSlots) :
      Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
        id: i + 1,
        type: i < 10 ? 'small' : 'both',
        isBooked: false,
        vehicleType: null,
        startTime: null
      }))
    );
    setRevenue(savedRevenue ? parseInt(savedRevenue, 10) : 0);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    localStorage.setItem(REVENUE_KEY, revenue.toString());
  }, [slots, revenue]);

  const handleBookSlot = () => {
    const available = slots.find(slot => {
      const validType = slot.type === 'both' || (slot.type === 'small' && vehicleType === 'small');
      return !slot.isBooked && validType;
    });

    if (!available) return alert('No available slot for this vehicle type');

    setSlots(prev => prev.map(slot =>
      slot.id === available.id
        ? { ...slot, isBooked: true, vehicleType, startTime: Date.now() }
        : slot
    ));
  };

  const handleExit = (id) => {
    const now = Date.now();
    const slot = slots.find(s => s.id === id);
    if (!slot || !slot.startTime) return;

    const minutes = Math.floor((now - slot.startTime) / 60000);
    const base = slot.id <= 10 ? 60 : 100;
    const extra = minutes > 30 ? Math.ceil((minutes - 30) / 60) * 15 : 0;
    const total = base + extra;

    alert(`Slot ${slot.id} Fee: ₦${total}`);
    setRevenue(prev => prev + total);

    setSlots(prev => prev.map(s =>
      s.id === id
        ? { ...s, isBooked: false, vehicleType: null, startTime: null }
        : s
    ));
  };

  return (
    <main className="container">
      <h1>Parking Lot Management System</h1>

      <div className="booking-form">
        <label htmlFor="vehicle-select">Vehicle Type:</label>
        <select id="vehicle-select" value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
        <button onClick={handleBookSlot}>Book Slot</button>
      </div>

      <div className="grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${slot.isBooked ? 'booked' : 'free'} ${slot.type}`}
            onClick={() => slot.isBooked && handleExit(slot.id)}
          >
            <p>Slot {slot.id}</p>
            <p>{slot.type === 'small' ? 'Small Only' : 'Small/Large'}</p>
            <p>{slot.isBooked ? `${slot.vehicleType} - Booked` : 'Free'}</p>
            {slot.isBooked && slot.startTime && (
              <p>Since: {new Date(slot.startTime).toLocaleTimeString()}</p>
            )}
          </div>
        ))}
      </div>

      <div className="revenue-display">
        <h2>Total Revenue: ₦{revenue}</h2>
      </div>
    </main>
  );
}
