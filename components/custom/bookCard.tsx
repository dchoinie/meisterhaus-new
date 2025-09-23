import React, { JSX } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";

interface BookCardProps {
  room: {
    _id: string;
    name: string;
    description: {
      _type: string;
      style: string;
      _key: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      markDefs: any[];
      children: {
        _type: string;
        text: string;
        marks: string[];
      }[];
    }[];
    mainImage: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
    weekdayPrice: string;
    weekendPrice: string;
  };
  onBookClick: () => void;
}

const BookCard = ({ room, onBookClick }: BookCardProps): JSX.Element => {
  const imageUrl = urlFor(room.mainImage).url();
  const descriptionText = Array.isArray(room.description)
    ? room.description[0]?.children[0]?.text || ""
    : room.description;

  return (
    <Card className="shadow-lg flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-cinzel-decorative text-primary-500">
          {room.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <AspectRatio ratio={16 / 9}>
          <Image src={imageUrl} alt={room.name} fill className="object-cover" />
        </AspectRatio>
        <CardDescription>{descriptionText}</CardDescription>
        <div className="space-y-2">
          <p className="font-cinzel-decorative text-primary-800">
            Weekday:{" "}
            <span className="font-bold">{room.weekdayPrice}/night</span>
          </p>
          <p className="font-cinzel-decorative text-primary-800">
            Weekend/Holiday:{" "}
            <span className="font-bold">{room.weekendPrice}/night</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <Button
          onClick={onBookClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel-decorative"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
