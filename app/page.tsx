"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore, Reservation, Room } from "./store";

type ReservationFormProps = {
  selectedDate: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRoomId: number;
  handleRoomChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  capacity: number;
  handleCapacityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  reservedBy: string;
  setReservedBy: (value: string) => void;
  handleReservation: () => void;
};

function ReservationForm({
  selectedDate,
  handleDateChange,
  selectedRoomId,
  handleRoomChange,
  capacity,
  handleCapacityChange,
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

  // Filter the available rooms by excluding the reserved room IDs and capacity
  const filteredRooms = availableRooms.filter(
    (room) =>
      !reservedRoomIds.includes(room.id) &&
      (capacity === 0 || room.capacity >= capacity)
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
        <label>Capacity:</label>
        <select value={capacity} onChange={handleCapacityChange}>
          <option value={0}>Any</option>
          <option value={5}>5 people</option>
          <option value={10}>10 people</option>
          <option value={15}>15 people</option>
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
  const [capacity, setCapacity] = useState<number>(0);
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

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCapacity(parseInt(e.target.value));
  };

  const handleReservation = () => {
    if (
      selectedRoomId === 0 ||
      selectedDate === "" ||
      capacity === 0 ||
      reservedBy === ""
    ) {
      alert("Please select a room, date, capacity, and enter the name");
      return;
    }

    const isRoomAvailable = !reservations.some(
      (reservation) =>
        reservation.roomId === selectedRoomId &&
        reservation.date === selectedDate
    );
    if (!isRoomAvailable) {
      alert("Selected room is not available on the selected date");
      return;
    }

    const newReservation: Reservation = {
      id: Date.now(),
      roomId: selectedRoomId,
      date: selectedDate,
      reservedBy: reservedBy,
    };

    const selectedRoom = availableRooms.find(
      (room) => room.id === selectedRoomId
    );
    if (!selectedRoom || selectedRoom.capacity < capacity) {
      alert("Selected room does not have the required capacity");
      return;
    }

    addReservation(newReservation);

    setSelectedRoomId(0);
    setSelectedDate("");
    setCapacity(0);
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
        capacity={capacity}
        handleCapacityChange={handleCapacityChange}
      />

    </div>
  );
}
