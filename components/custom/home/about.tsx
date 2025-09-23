import React, { JSX } from "react";
import Container from "../container";
import Image from "next/image";

const features = [
  "3 guest rooms",
  "2 full bathrooms",
  "craft area",
  "workout area",
  "pool table",
  "large screen TV",
  "refrigerator",
  "pizza oven",
  "beverage station",
  "walkout patio",
  "hot tub",
  "fire pit",
  "pond",
  "bird watching",
];

const About = (): JSX.Element => {
  return (
    <div className="relative my-24">
      <Container>
        <div className="flex gap-12">
          <div className="flex flex-col w-1/2">
            <h2 className="text-4xl font-bold font-cinzel-decorative text-primary">
              Experience all that southern Minnesota has to offer!
            </h2>
            <p className="text-muted-foreground my-6">
              Located in the "Heart of the Southern MN Lakes Region",
              Meisterhaus was built in 2004 by Brad Meister Construction Inc. as
              a showcase for his business and a home for his family. We have
              been so abundantly blessed and felt compelled to share our
              blessings, our home and our love for the outdoors.
            </p>
            <div className="grid grid-cols-3 gap-x-2 gap-y-1">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex gap-2 font-cinzel-decorative"
                >
                  <div className="w-2 h-2 rounded-full bg-accent self-center" />
                  <p className="text-muted-foreground m-0">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-2 relative">
            <Image
              src="/house_3.png"
              alt="House view 3"
              width={500}
              height={300}
              className="rounded-lg w-full h-[300px] object-cover"
            />
            <Image
              src="/house_2.png"
              alt="House view 2"
              width={500}
              height={300}
              className="rounded-lg w-full h-[250px] object-cover"
            />
            <Image
              src="/meisterhaus_sign.avif"
              alt="House view 1"
              width={500}
              height={300}
              quality={100}
              className="rounded-lg w-full h-[150px] object-cover"
            />
            <Image
              src="/house_4.png"
              alt="House view 4"
              width={500}
              height={300}
              className="rounded-lg w-full h-[275px] object-cover -mt-12"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
