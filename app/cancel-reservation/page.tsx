// pages/cancel-reservation.tsx
'use client';
import { useState } from "react";
import Link from "next/link";
import { useStore, Reservation } from "../store";

export default function CancelReservation() {
  const reservations = useStore((state) => state.reservations);
  const cancelReservation = useStore((state) => state.cancelReservation);

  const [reservationId, setReservationId] = useState<number>(0);

  const handleCancelReservation = () => {
    // Find the reservation with the specified ID
    const reservation = reservations.find((reservation) => reservation.id === reservationId);
    if (!reservation) {
      alert("Reservation not found");
      return;
    }

    // Cancel the reservation using the store
    cancelReservation(reservationId);

    alert("Reservation canceled successfully!");
  };

  return (
    <div>
      <h1>Cancel Reservation</h1>

      <Link href="/">Go Back</Link>

      <h2>Select Reservation to Cancel</h2>
      <div>
        <label>Reservation ID:</label>
        <input
          type="number"
          value={reservationId}
          onChange={(e) => setReservationId(parseInt(e.target.value))}
          placeholder="Enter reservation ID"
        />
      </div>
      <button type="button" onClick={handleCancelReservation}>
        Cancel Reservation
      </button>
    </div>
  );
}
