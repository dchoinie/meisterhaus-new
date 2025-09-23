import React, { JSX } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Container from "../container";

export interface Testimonial {
  name: string;
  testimonial: string;
  date: string;
  icon: string;
}

const testimonialsArray: Testimonial[] = [
  {
    name: "AirBnB Guest",
    testimonial:
      "We came to MN from NY to visit our son who is a student at Shattuck-St. Mary's School in Faribault. We wanted to try an Airbnb place that was not right near school, but not too far. This was about 20 minutes and a nice drive. This beautiful home far exceeded our expectations. First of all it was built by Brad himself - we loved all the beautiful touches, the wood (maple and walnut). The bed was super comfortable, living area was as well. We enjoyed just relaxing in the den area where there is tv and a pool table. The back sliding doors open up to a spacious yard that has seating and a fire-pit. We were also treated to a wonderful breakfast. I highly recommend this home. If you are traveling with friends there are two other rooms. We really enjoyed how this was decorated too.",
    date: "Oct, 2018",
    icon: "/airbnb.svg",
  },
  {
    name: "AirBnB Guest",
    testimonial:
      "The Meister Haus is extraordinary. The Lower Level is an exceptional place to gather with family as the house is built on a hill and the views from the windows are directly to the outside garden and lake. There are plenty of games, pool table, TV and workout machines. The bedrooms are nicely decorated and the bathrooms are fully stocked and the shower has great water pressure and comes out hot! Julie has outdone herself by providing a variety of snacks, cereal, soda, water and milk to go along with the microwave and Keurig coffee/tea/hot chocolate maker. The home made breakfast in incredible!!!! The location is wonderful, close to the lake and the grounds are beautiful. Plenty of spaces outdoors to sit and enjoy the beautiful garden and lake. An evening treat of warm homemade cookies really made us feel special. We will definitely return for another visit!",
    date: "Jul, 2017",
    icon: "/airbnb.svg",
  },
  {
    name: "AirBnB Guest",
    testimonial:
      "Wow! Julie and her husband exceeded our expectations on every account. The property and house are beautiful. The accommodations are immaculate. The basement has everything you could possibly need and more. But more than all that they made us feel like family with their generous hospitality and welcoming attitude. The morning we left they made us a beautiful breakfast and even entertained our crazy little 7 month old son. It was tough to leave!",
    date: "Sep, 2016",
    icon: "/airbnb.svg",
  },
  {
    name: "TripAdvisor Guest",
    testimonial:
      "We had an excellent stay. It was quiet and laid back. It's a good place to relax and enjoy the beautiful flowers and hummingbirds. It is close to a nice 39 mile bike trail. We did have a couple of blocks of gravel getting to the trail, but it wasn't too bad, even with my road bike.  They served us an excellent breakfast this morning and we will definitely return.",
    date: "Sep, 2023",
    icon: "/tripadvisor.svg",
  },
  {
    name: "TripAdvisor Guest",
    testimonial:
      "We really enjoyed our uniquely decorated room, the beautul, well-cared for grounds, short walk to the lake, breakfast covered patio, water feature, and friendliness of our hosts.  The three rooms available are clean  reasonably priced.  The property is perfect for a  relaxing getaway or  celebration.",
    date: "Jun, 2023",
    icon: "/tripadvisor.svg",
  },
  {
    name: "AirBnB Guest",
    testimonial:
      "My boyfriend and I stayed one night at the Meisterhaus while we were in town for a wedding. It was very easy to navigate to and parking/check-in instructions were clear. We stayed in the Beach Room and it was very clean and quiet. Julie was very friendly and responsive whenever I messaged her. I wish we would have been able to stay longer and enjoy breakfast, but we had to head out early. I would absolutely stay again if we were in the area!",
    date: "Sep, 2024",
    icon: "/airbnb.svg",
  },
  //   {
  //     name: "AirBnB Guest",
  //     testimonial:
  //       "We had a very relaxing stay. Julie went out of her way to get the kayaks back out of storage so we could use them. The hot tub was also very nice! Homemade breakfast included. we will be back next year for our anniversary get away!",
  //     date: "Sep, 2024",
  //     icon: "/airbnb.svg",
  //   },
  {
    name: "AirBnB Guest",
    testimonial:
      "The place is just slighly off the beaten path, but perfect for our situation: we had a destination the next day about 20 miles away. I loved that the guests have their own dedicated parking lot and paving stones leading you to the downstairs of the house. The room had great antique furnishings and was very inviting. The common space was even better with a small kitchen, pool table, large TV, and comfortable stadium recliners with drink holders. Breakfast the next morning was fantastic and came with toast, yogurt w/fruit, and orange juice. Just a very pleasant stay and met some interesting fellow visitors.",
    date: "Jul, 2024",
    icon: "/airbnb.svg",
  },
  {
    name: "AirBnB Guest",
    testimonial:
      "Lovely home in a quiet area. Very comfortable bed. Private bath for Beachhouse room. Delicious breakfast both mornings. Hosts were warm and welcoming. Hope to come back and stay here again.",
    date: "Oct, 2022",
    icon: "/airbnb.svg",
  },
  {
    name: "AirBnB Guest",
    testimonial:
      "This place was great. We brought our boat, went boating for the day, tied it up overnight, and stayed here for the night. It was great! Yummy breakfast, comfortable bed, and great accommodations!",
    date: "Jul, 2022",
    icon: "/airbnb.svg",
  },
  {
    name: "AirBnB Guest",
    testimonial:
      "Julie and Brad were perfect hosts. They are very thoughtful and energetic people. They have a beautiful house to share that provides a lot of privacy for guests with the benefit of a host nearby to help whenever needed. The house is well equipped and even has a pool table and exercise equipment. We will definitely return.",
    date: "Apr, 2018",
    icon: "/airbnb.svg",
  },
  {
    name: "AirBnB Guest",
    testimonial:
      "Julie was a fantastic host. I came with my teenage son and we were visiting my daughter who is studying in Carleton college. We were arriving quite late but despite late hour Julie was waiting for us and so were some snacks and tea/coffee. Her home is lovely, beautifully located and very, very cosy and both bedrooms that we had, had ensuite bathrooms. Rooms were very comfortable and everything was provided - towels, shampoo, linens, hair dryer and more. She also prepared us a lovely breakfasts during our stay. I will definitely stay again when I am coming back to Minnesota. She was a truly perfect and wonderful host!",
    date: "Oct, 2016",
    icon: "/airbnb.svg",
  },
];

const Testimonials = (): JSX.Element => {
  return (
    <div className="my-24">
      <Container>
        <h2 className="text-4xl font-bold text-center font-cinzel-decorative text-primary mb-24">
          Testimonials
        </h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonialsArray.map((t: Testimonial, i: number) => (
            <Card
              key={`${t.name}-${i}`}
              className={`p-6 bg-muted text-[12px] break-inside-avoid-column inline-block w-full ${
                i === 0 ? "mt-6" : ""
              }`}
            >
              <CardContent className="text-foreground">
                {t.testimonial}
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full text-foreground font-cinzel-decorative">
                  <div className="flex">
                    <div className="bg-primary rounded-full p-2 flex items-center justify-center mr-3">
                      <Image src={t.icon} alt={t.name} width={20} height={20} />
                    </div>
                    <p className="self-center">{t.name}</p>
                  </div>
                  <div className="flex self-center">
                    <p>{t.date}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
