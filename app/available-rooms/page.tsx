'use client';
// pages/available-rooms.tsx

import { useStore } from "../store";
import Link from "next/link";

export default function AvailableRooms() {
  const availableRooms = useStore((state) => state.availableRooms);
  const reservations = useStore((state) => state.reservations);

  const reservedRoomIds = new Set(reservations.map((reservation) => reservation.roomId));
  const filteredRooms = availableRooms.filter((room) => !reservedRoomIds.has(room.id));

  return (
    <div>
      <h1>Available Rooms</h1>

      {filteredRooms.length === 0 ? (
        <p>No available rooms at the moment.</p>
      ) : (
        filteredRooms.map((room) => (
          <div key={room.id}>
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <p>Available Time Slots:</p>
            <ul>
              {room.availableTimeSlots.map((timeSlot, index) => (
                <li key={index}>{timeSlot}</li>
              ))}
            </ul>
          </div>
        ))
      )}

      <Link href="/">Go Back</Link>
    </div>
  );
}

