import Container from "../../components/custom/container";
import SEO from "../../components/custom/seo";
import Image from "next/image";

export default function RoomsPage() {
  return (
    <>
      <SEO
        title="Rooms - Lake House Rentals"
        description="Explore our comfortable lake house rooms - The Pheasant Room, Oma's Room, and The Beach Room"
      />
      <Container>
        <div className="flex flex-col gap-16 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-cinzel-decorative text-primary-800 text-center">
            Our Rooms
          </h1>

          {/* The Pheasant Room */}
          <section className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-cinzel-decorative text-primary-800">
              The Pheasant Room
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/pheasant_1.png"
                  alt="The Pheasant Room"
                  fill
                  className="object-cover"
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 space-y-4 text-lg text-primary-800">
                <p>
                  Our premier Pheasant Room offers a luxurious retreat with a
                  premium Sleep Number bed and high-quality linens. This
                  spacious master suite features large windows overlooking the
                  lake, providing stunning views and abundant natural light. The
                  room&apos;s decor pays homage to Minnesota&apos;s rich hunting
                  tradition with tasteful pheasant-themed accents.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Jack & Jill style full bathroom</li>
                  <li>High-speed WiFi</li>
                  <li>Access to shared living area</li>
                  <li>Premium Sleep Number mattress and bedding</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Oma's Room */}
          <section className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-cinzel-decorative text-primary-800">
              Oma&apos;s Room
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/oma_1.jpg"
                  alt="Oma's Room"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 space-y-4 text-lg text-primary-800">
                <p>
                  Named in honor of family tradition, Oma&apos;s Room provides
                  warm and comfortable accommodations with a queen-size bed and
                  carefully selected furnishings. This charming room combines
                  classic comfort with modern amenities, creating a cozy
                  atmosphere that makes you feel right at home. The room
                  features traditional decor with thoughtful touches that
                  reflect family heritage.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Queen-size bed with plush bedding</li>
                  <li>Jack & Jill style full bathroom</li>
                  <li>Reading nook with comfortable chair</li>
                  <li>Vintage-inspired decor</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Beach Room */}
          <section className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-cinzel-decorative text-primary-800">
              The Beach Room
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/beach_1.jpg"
                  alt="The Beach Room"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 space-y-4 text-lg text-primary-800">
                <p>
                  The Beach Room captures the essence of lakeside living with
                  its coastal-inspired decor and comfortable accommodations.
                  This delightful space features two twin beds, making it
                  perfect for children or additional guests. The room&apos;s
                  beach theme creates a fun and relaxing atmosphere,
                  complemented by natural light from the skylight window.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Quality mattress & bedding</li>
                  <li>Private full bathroom</li>
                  <li>Beach-themed decor and artwork</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Entire Basement */}
          <section className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-cinzel-decorative text-primary-800">
              Entire Basement
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/house_4.png"
                  alt="Entire Basement"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 space-y-4 text-lg text-primary-800">
                <p>
                  Experience the ultimate in lakeside living by booking our
                  entire basement level. This spacious accommodation includes
                  all three rooms - The Pheasant Room, Oma&apos;s Room, and The
                  Beach Room - perfect for larger families or groups. Enjoy
                  exclusive access to shared spaces and amenities while
                  maintaining privacy and comfort for your entire party.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Three private bedrooms (sleeps up to 6)</li>
                  <li>Two full bathrooms</li>
                  <li>Shared living area with lake views</li>
                  <li>High-speed WiFi throughout</li>
                  <li>Private entrance</li>
                  <li>Access to all basement amenities</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
