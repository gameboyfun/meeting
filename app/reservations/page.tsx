'use client';
import { useStore, Reservation } from "../store";
import Link from "next/link";

export default function Reservations() {
  const reservations = useStore((state) => state.reservations);

  return (
    <div>
      <h1>Reservations</h1>
      <Link href="/">Go Back</Link>

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              Reservation ID: {reservation.id}<br />
              Room ID: {reservation.roomId}<br />
              Date: {reservation.date}<br />
              Reserved By: {reservation.reservedBy}<br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
