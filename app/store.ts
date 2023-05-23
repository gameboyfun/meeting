// pages/store.ts

import { create } from "zustand";

export type Room = {
  id: number;
  name: string;
  capacity: number;
  availableTimeSlots: string[];
};

export type Reservation = {
  id: number;
  roomId: number;
  date: string;
  reservedBy: string;
};

type Store = {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (reservationId: number) => void;
  rooms: Room[];
  availableRooms: Room[]; // New property for storing available rooms
};

export const useStore = create<Store>((set) => ({
  reservations: [],
  addReservation: (reservation) =>
    set((state) => ({
      reservations: [...state.reservations, reservation],
    })),
  cancelReservation: (reservationId) =>
    set((state) => ({
      reservations: state.reservations.filter(
        (reservation) => reservation.id !== reservationId
      ),
    })),
  rooms: [
    {
      id: 1,
      name: "Room A",
      capacity: 5,
      availableTimeSlots: ["2023-05-24", "2023-05-25"],
    },
    {
      id: 2,
      name: "Room B",
      capacity: 10,
      availableTimeSlots: ["2023-05-24", "2023-05-26"],
    },
    {
      id: 3,
      name: "Room C",
      capacity: 15,
      availableTimeSlots: ["2023-05-25", "2023-05-26"],
    },
  ],
  get availableRooms() {
    const { reservations, rooms } = this;
    const reservedRoomIds = new Set(
      reservations.map((reservation) => reservation.roomId)
    );
    return rooms.filter((room) => !reservedRoomIds.has(room.id));
  },
}));
