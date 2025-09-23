import React, { JSX } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "lucide-react";

const Hero = (): JSX.Element => {
  return (
    <div className="h-screen w-full relative">
      <Image
        src="/lake_sakatah.webp"
        alt="Lake Sakatah"
        fill
        priority
        quality={100}
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground bg-black/30">
        <h1
          className={`text-5xl font-bold font-cinzel-decorative text-primary-foreground`}
        >
          Meisterhaus Bed & Breakfast
        </h1>
        <p className="text-xl max-w-2xl px-4 text-primary-foreground/90 mb-8">
          A perfect getaway for you to play, relax, rejuvinate and reconnect
        </p>
        <div className="flex gap-4">
          <Button
            variant="default"
            className="bg-primary text-accent-foreground font-cinzel-decorative hover:bg-accent/90"
            asChild
            size="lg"
          >
            <Link href="/book">
            <Calendar className="h-4 w-4" />
            Request Booking</Link>
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-primary-foreground text-primary-foreground font-cinzel-decorative hover:bg-primary-foreground/10"
            asChild
            size="lg"
          >
            <Link href="/rooms">View Rooms</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
