import { Metadata } from "next";
import BookingServerWrapper from "./bookingServerWrapper";

export const metadata: Metadata = {
  title: "Book | Meisterhaus Bed & Breakfast",
  description: "Book your stay at Meisterhaus Bed & Breakfast. Experience charming hospitality in Morristown, Minnesota.",
  keywords: "book, reservation, bed and breakfast, Morristown MN, Meisterhaus",
};

export default function Book() {
  return <BookingServerWrapper />;
}
