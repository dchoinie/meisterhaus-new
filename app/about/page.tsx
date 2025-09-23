import Container from "../../components/custom/container";
import SEO from "../../components/custom/seo";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About - Lake House Rentals"
        description="Learn about our beautiful lake house rental property in Southern Minnesota's lakes region"
      />
      <Container>
        <div className="flex flex-col items-center gap-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-cinzel-decorative text-primary-800 text-center">
            About Our Lake House
          </h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-6xl">
            <div className="relative w-full md:w-1/2 max-w-md aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/house_3.png"
                alt="Lake House exterior view"
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="md:w-1/2 text-center md:text-left space-y-6 text-lg text-primary-800">
              <p>
                Located in the heart of the Southern Minnesota lakes region, our
                lake house offers a perfect blend of comfort and natural beauty.
                Nestled on the shores of a pristine lake, this charming property
                provides an ideal setting for your next getaway.
              </p>
              <p>
                Whether you&apos;re planning a family vacation, a romantic
                retreat, or a peaceful solo escape, our lake house provides the
                perfect backdrop for creating lasting memories. Experience the
                beauty of Minnesota&apos;s lake country while enjoying modern
                amenities and comfortable accommodations.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
