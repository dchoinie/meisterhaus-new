import React from "react";
import Container from "../container";
import RoomCard from "../roomCard";
import { getRooms, Room } from "@/lib/rooms";

const Rooms = async () => {
  const rooms = await getRooms();

  return (
    <div>
      <Container>
        <div className="my-24">
          <h2 className="text-4xl font-bold text-center font-cinzel-decorative text-primary mb-24">
            The Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {rooms.map((room: Room) => (
              <RoomCard
                key={room._id}
                name={room.name}
                description={room.description}
                image={room.mainImage}
                weekdayPrice={room.weekdayPrice}
                weekendPrice={room.weekendPrice}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Rooms;
