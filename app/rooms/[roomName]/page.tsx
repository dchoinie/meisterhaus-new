"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Container from "../../../components/custom/container";
import SEO from "../../../components/custom/seo";
import Image from "next/image";
import { getRooms, Room } from "@/lib/rooms";
import { slugifyRoomName } from "@/lib/slug";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, DollarSign } from "lucide-react";
import BookingModal from "../../../components/custom/bookingModal";

// Function to convert slug back to room name
function slugToRoomName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function RoomPage() {
  const params = useParams<{ roomName: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  React.useEffect(() => {
    const fetchRoom = async () => {
      try {
        // Debug: log params and how slug is transformed
        console.log('Room page params:', params);
        const roomSlug = params.roomName;
        console.log('Room slug from params:', roomSlug);
        // Find by slug to avoid mismatches
        const rooms = await getRooms();
        const fetchedRoom: Room | null =
          rooms.find((r) => slugifyRoomName(r.name) === roomSlug) ?? null;
        
        if (!fetchedRoom) {
          notFound();
        }
        
        setRoom(fetchedRoom);
      } catch (error) {
        console.error('Error fetching room:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [params.roomName]);

  if (isLoading) {
    return (
      <Container>
        <div className="py-8 md:py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-primary-700">Loading room details...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!room) {
    notFound();
  }

  const imageUrl = urlFor(room.mainImage).url();
  const descriptionText = Array.isArray(room.description)
    ? room.description[0]?.children[0]?.text || ""
    : room.description;

  return (
    <>
      <SEO
        title={`${room.name} - Lake House Rentals`}
        description={`Discover ${room.name} at our lake house. ${descriptionText.substring(0, 160)}...`}
      />
      <Container>
        <div className="py-8 md:py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              asChild
              variant="outline"
              className="font-cinzel-decorative"
            >
              <Link href="/rooms" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to All Rooms
              </Link>
            </Button>
          </div>

          {/* Room Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel-decorative text-primary-800 mb-4">
              {room.name}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={room.name}
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Room Details */}
            <div className="space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-cinzel-decorative text-primary-800 mb-4">
                  About This Room
                </h2>
                <p className="text-lg text-primary-700 leading-relaxed">
                  {descriptionText}
                </p>
              </div>

              {/* Pricing */}
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-cinzel-decorative text-primary-800 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-700">Weekday Rate:</span>
                    <span className="font-bold text-primary-800 text-lg">
                      {room.weekdayPrice}/night
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-700">Weekend/Holiday Rate:</span>
                    <span className="font-bold text-primary-800 text-lg">
                      {room.weekendPrice}/night
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 font-cinzel-decorative text-lg px-8 py-3"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book This Room
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={room}
        onCancel={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
