import { getRooms } from "@/lib/rooms";
import BookingClientWrapper from "./bookingClientWrapper";

export default async function BookingServerWrapper() {
  const rooms = await getRooms();
  
  return <BookingClientWrapper rooms={rooms} />;
}
