"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore, Reservation, Room } from "./store";

type ReservationFormProps = {
  selectedDate: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRoomId: number;
  handleRoomChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  reservedBy: string;
  setReservedBy: (value: string) => void;
  handleReservation: () => void;
};

function ReservationForm({
  selectedDate,
  handleDateChange,
  selectedRoomId,
  handleRoomChange,
  reservedBy,
  setReservedBy,
  handleReservation,
}: ReservationFormProps) {
  const availableRooms = useStore((state) => state.availableRooms);
  const reservations = useStore((state) => state.reservations);

  // Filter out the reserved room IDs for the selected date
  const reservedRoomIds = reservations
    .filter((reservation) => reservation.date === selectedDate)
    .map((reservation) => reservation.roomId);

  // Filter the available rooms by excluding the reserved room IDs
  const filteredRooms = availableRooms.filter(
    (room) => !reservedRoomIds.includes(room.id)
  );

  return (
    <form>
      <div>
        <label>Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <label>Room:</label>
        <select value={selectedRoomId} onChange={handleRoomChange}>
          <option value={0}>Select a room</option>
          {filteredRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Reserved By:</label>
        <input
          type="text"
          value={reservedBy}
          onChange={(e) => setReservedBy(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <button type="button" onClick={handleReservation}>
        Make Reservation
      </button>
    </form>
  );
}


export default function Home() {
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const reservations = useStore((state) => state.reservations);
  const addReservation = useStore((state) => state.addReservation);
  const cancelReservation = useStore((state) => state.cancelReservation);

  const [reservedBy, setReservedBy] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoomId(parseInt(e.target.value));
  };

  const handleReservation = () => {
    // Check if a room, date, and reservedBy are entered
    if (selectedRoomId === 0 || selectedDate === "" || reservedBy === "") {
      alert("Please select a room, date, and enter the name");
      return;
    }
  
    // Check if the selected room is already reserved on the selected date
    const isRoomAvailable = !reservations.some(
      (reservation) =>
        reservation.roomId === selectedRoomId && reservation.date === selectedDate
    );
    if (!isRoomAvailable) {
      alert("Selected room is not available on the selected date");
      return;
    }
  
    // Make the reservation
    const newReservation: Reservation = {
      id: Date.now(),
      roomId: selectedRoomId,
      date: selectedDate,
      reservedBy: reservedBy,
    };
  
    // Add the reservation using the store
    addReservation(newReservation);
  
    // Reset the form fields to their initial states
    setSelectedRoomId(0);
    setSelectedDate("");
    setReservedBy("");
  
    alert("Reservation successful!");
  };
  

  const availableRooms = useStore((state) => state.availableRooms);

  return (
    <div>
      <h1>Reservation System</h1>

      <Link href="/available-rooms">View Available Rooms</Link>
      <br />
      <Link href="/reservations">View Reservations</Link>
      <br />
      <Link href="/cancel-reservation">Cancel Reservation</Link>
      <br />
      <Link href="/admin">Admin Interface</Link>

      <h2>Make a Reservation</h2>
      <ReservationForm
        reservedBy={reservedBy}
        setReservedBy={setReservedBy}
        handleReservation={handleReservation}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        selectedRoomId={selectedRoomId}
        handleRoomChange={handleRoomChange}
      />

      {/* Other pages links... */}
    </div>
  );
}
