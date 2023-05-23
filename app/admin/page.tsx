// pages/admin.tsx
'use client'
import { useStore } from "../store";
import Link from "next/link";

export default function Admin() {
  const reservations = useStore((state) => state.reservations);
  const cancelReservation = useStore((state) => state.cancelReservation);

  const handleCancelReservation = (reservationId: number) => {
    cancelReservation(reservationId);
  };

  return (
    <div>
      <h1>Admin Interface</h1>

      <Link href="/">Go Back</Link>

      <h2>Reservations</h2>

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <p>Reservation ID: {reservation.id}</p>
              <p>Room ID: {reservation.roomId}</p>
              <p>Date: {reservation.date}</p>
              <p>Reserved By: {reservation.reservedBy}</p>
              <button onClick={() => handleCancelReservation(reservation.id)}>
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
