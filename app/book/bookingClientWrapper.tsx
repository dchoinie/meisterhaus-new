"use client";

import Container from "../../components/custom/container";
import PageTitle from "../../components/custom/pageTitle";
import BookingInterface from "../../components/custom/bookingInterface";
import { Room } from "@/lib/rooms";

interface BookingClientWrapperProps {
  rooms: Room[];
}

export default function BookingClientWrapper({ rooms }: BookingClientWrapperProps) {
  return (
    <div className="pt-24 mb-24">
      <Container>
        <PageTitle title="Book" path="/book" />
        <BookingInterface rooms={rooms} />
      </Container>
    </div>
  );
}
