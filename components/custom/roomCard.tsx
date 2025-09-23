import React, { JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
  description,
  image,
  weekdayPrice,
  weekendPrice,
}: RoomCardProps): JSX.Element => {
  const imageUrl = urlFor(image).url();
  const descriptionText = Array.isArray(description)
    ? description[0]?.children[0]?.text || ""
    : description;

  return (
    <Card className="shadow-lg flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-cinzel-decorative text-primary-500">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <AspectRatio ratio={16 / 9}>
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </AspectRatio>
        <CardDescription>{descriptionText}</CardDescription>
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
      <CardFooter className="pt-6">
        <Button
          asChild
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-cinzel-decorative"
        >
          <Link href="/book">Request Booking</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
