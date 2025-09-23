import React, { JSX } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { urlFor } from "@/sanity/lib/image";

interface RoomCardProps {
  name: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  weekdayPrice: string;
  weekendPrice: string;
}

const RoomCard = ({
  name,
  image,
  weekdayPrice,
  weekendPrice,
}: RoomCardProps): JSX.Element => {
  const imageUrl = urlFor(image).url();
  const roomSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <Card className="shadow-lg flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl font-cinzel-decorative text-gray-900">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <AspectRatio ratio={16 / 9}>
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </AspectRatio>
        <div className="space-y-2">
          <p className="font-cinzel-decorative text-primary-800">
            Weekday: <span className="font-bold">{weekdayPrice}/night</span>
          </p>
          <p className="font-cinzel-decorative text-primary-800">
            Weekend/Holiday:{" "}
            <span className="font-bold">{weekendPrice}/night</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-6 space-y-3 flex flex-col">
        <Button
          asChild
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-cinzel-decorative"
        >
          <Link href="/book">Request Booking</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full font-cinzel-decorative"
        >
          <Link href={`/rooms/${roomSlug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
