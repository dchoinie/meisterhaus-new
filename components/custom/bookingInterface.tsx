"use client";

import React, { useState } from "react";
import BookCard from "./bookCard";
import BookingModal from "./bookingModal";
import { Room } from "@/lib/rooms";

interface BookingInterfaceProps {
  rooms: Room[];
}

const BookingInterface = ({ rooms }: BookingInterfaceProps) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleBookClick = (room: Room) => {
    setSelectedRoom(room);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        {rooms.map((room: Room) => (
          <BookCard
            key={room._id}
            room={room}
            onBookClick={() => handleBookClick(room)}
          />
        ))}
      </div>

      <BookingModal
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        room={selectedRoom}
        onCancel={() => setSelectedRoom(null)}
      />
    </>
  );
};

export default BookingInterface;
