"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Room } from "./home/rooms";
import BookingRequestForm, { bookingFormSchema } from "./bookingRequestForm";
import { z } from "zod";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onCancel: () => void;
}

const onSubmit = (data: z.infer<typeof bookingFormSchema>) => {
  console.log(data);
};

const BookingModal = ({
  isOpen,
  onClose,
  room,
  onCancel,
}: BookingModalProps) => {
  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary-500 font-cinzel-decorative">
            Request Booking for {room.name}
          </DialogTitle>
          <DialogDescription>
            Please note, due to multiple booking sites, completing this form
            does not guarantee a reservation, but simply submits the reservation
            request. After submission, you will be contacted shortly by The
            Meisterhaus to confirm your request.
          </DialogDescription>
        </DialogHeader>

        <div>
          <BookingRequestForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            room={room}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
