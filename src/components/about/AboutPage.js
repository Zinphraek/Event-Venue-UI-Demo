import React from "react";
import ValueCard from "./ValueCard";
import { NavLink } from "react-router-dom";
import Carousel from "../../utilities/components/Carousel";
import MapLocation from "../../utilities/components/MapLocation";
import { CONTACT_PAGE_URL } from "../../utilities/constants/PagesEndpoints";

const AboutPage = () => {
  const values = [
    {
      name: "Excellence",
      description:
        "We pursue the highest standards in all aspects of our services, ensuring that every event is executed flawlessly.",
    },
    {
      name: "Integrity",
      description:
        "We operate with transparency and honesty, building trust with our clients and partners.",
    },
    {
      name: "Innovation",
      description:
        "We continuously seek to innovate, embracing new trends and technologies to enhance our offerings and exceed client expectations.",
    },
    {
      name: "Hospitality",
      description:
        "We are dedicated to providing warm and gracious hospitality, ensuring that all guests feel valued and cared for.",
    },
    {
      name: "Collaboration",
      description:
        "We believe in the power of teamwork and work closely with our clients and partners to bring their visions to life.",
    },
    {
      name: "Sustainability",
      description:
        "We are committed to operating responsibly and sustainably, taking measures to reduce our environmental footprint.",
    },
    {
      name: "Customization",
      description:
        "We understand that each event is unique, and we are committed to personalizing our services to align with our clients’ individual tastes and preferences.",
    },
  ];

  const images = [
    "assets/images/birthday.jpg",
    "assets/images/decoration.jpg",
    "assets/images/stage.jpg",
    "assets/images/stage_2.jpg",
    "assets/images/stage_3.jpg",
    "assets/images/tableset.jpg",
    "assets/images/tableset_1.jpg",
  ];

  return (
    <div className="bg-gray-200">
      <div className="container max-w-7xl mx-auto my-0 px-0">
        {/*Introduction*/}
        <section>
          <div
            style={{
              backgroundImage: "url('/assets/images/about_us_cover.png')",
            }}
            className="relative flex justify-center items-center h-[225px] md:h-[300px] lg:h-[350px] bg-cover bg-center bg-no-repeat"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="z-10 text-left">
              <p className="text-white font-serif text-4xl md:text-6xl lg:text-8xl tracking-wider leading-snug">
                Step into Elegance,
              </p>
              <p className="text-gold font-serif text-4xl md:text-6xl lg:text-8xl tracking-wider leading-snug text-yellow-500">
                Celebrate in Style at
              </p>
              <p className="text-white font-semibold text-2xl md:text-4xl lg:text-6xl tracking-wide">
                Le Prestige Hall
              </p>
            </div>
          </div>
          <div className="p-4 md:p-6">
            <p className="p-4 text-base font-serif font-extralight bg-gray-50 border-2 border-white rounded md:text-lg md:columns-2">
              Welcome to Le Prestige Hall, the epitome of elegance and luxury.
              Since our establishment in 2019, we have been serving as a premier
              rental facility for an array of events. Our venue boasts a posh
              ambiance, guaranteed to leave guests impressed. Nestled in a
              secure location, Le Prestige Hall ensures safety for all our
              visitors. Moreover, the ample parking space surrounding our
              facility adds an extra layer of convenience for attendees. A
              standout feature of our venue is its proximity to high-standard
              hotels, a boon for guests traveling from afar, ensuring a
              comfortable and sumptuous stay.
            </p>
          </div>
        </section>
        {/*Background*/}
        <section>
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 md:items-stretch gap-4">
              <img
                src="assets/images/our_story.png"
                alt="Our Story"
                className="w-full h-[225px] bg-white rounded shadow-sm shadow-gray-300 md:col-span-2 md:h-[450px]"
              />
              <div className=" bg-white rounded shadow-sm shadow-gray-300 md:p-6 md:col-span-3">
                <div className="flex items-center justify-left py-2">
                  <span className="text-xl font-bold m-4 md:text-2xl">
                    Our Story
                  </span>
                  <hr className="border-orange-300 border-2 flex-grow rounded" />
                </div>
                <p className="p-4 text-base font-serif font-extralight md:text-lg">
                  Our journey began in 2019 with a clear vision: to create an
                  unparalleled event space where special moments can be
                  celebrated and cherished. We aspired to set a benchmark in the
                  event industry by combining a lavish setting with impeccable
                  service. The heart and soul of Le Prestige Hall is its team.
                  Our highly-skilled personnel, with over a decade of experience
                  in event management, are committed to making each event an
                  unforgettable experience. Through dedication and a relentless
                  pursuit of excellence, we’ve had the honor of serving
                  countless patrons. Our story is still being written, and as we
                  turn the pages, we remain steadfast in our commitment to
                  creating an enduring legacy of magnificence and cherished
                  memories.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*Mission and Values*/}
        <section>
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 md:items-stretch gap-4">
              <div className=" bg-white rounded shadow-sm shadow-gray-300 md:p-6 md:col-span-3">
                <div className="flex items-center justify-left py-2">
                  <span className="text-xl font-bold m-4 md:text-2xl">
                    Our Mission
                  </span>
                  <hr className="border-orange-300 border-2 flex-grow rounded" />
                </div>
                <p className="p-4 text-base font-serif font-extralight md:text-lg">
                  At Le Prestige Hall, our mission is to provide an
                  extraordinary setting that ignites joy and celebration. We
                  strive to create unforgettable experiences by delivering
                  impeccable service and meticulous attention to detail. With
                  our luxurious ambiance and modern amenities, we aim to make
                  every event a masterpiece that resonates with elegance and
                  excellence.
                </p>
              </div>
              <img
                src="assets/images/our_mission.png"
                alt="Our Mission"
                className="w-full h-[225px] bg-white rounded shadow-sm shadow-gray-300 md:col-span-2 md:h-[350px]"
              />
            </div>
          </div>
        </section>
        {/*Values*/}
        <section>
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-center py-4">
              <hr className="border-white border-2 flex-grow rounded" />
              <span className="text-xl font-bold m-4 md:text-3xl">
                Our Values
              </span>
              <hr className="border-white border-2 flex-grow rounded" />
            </div>
            <p className="my-4 p-2 font-semibold text-lg">
              At Le Prestige Hall, we are guided by the following values:
              <br />
              <span className="text-sm font-extralight text-gray-400 md:hidden">
                Scroll horizontaly to view more
              </span>
            </p>
            <div className="flex items-stretch overflow-x-scroll no-scrollbar py-4 px-2 space-x-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex-none w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
                >
                  <ValueCard
                    name={value.name}
                    description={value.description}
                  />
                </div>
              ))}
            </div>
            <p className="my-8 p-2 text-base bg-white border-b-2 border-yellow-500 rounded font-semibold md:text-lg">
              By adhering to these values, Le Prestige Hall continues to uphold
              its reputation as a venue where luxury, service, and memorable
              experiences converge.
            </p>
          </div>
        </section>

        {/*Our Facility*/}
        <section>
          <div className="p-4 md:p-6">
            <h1 className="text-2xl font-bold">Le Prestige Hall Location</h1>
            <br />
            <div className="flex flex-col items-stretch justify-between space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2 lg:items-start">
              <div className="flex items-stretch justify-center overflow-x-scroll no-scrollbar py-4 lg:flex-none">
                <MapLocation className="lg:w-1/2" />
              </div>
              <div className="flex items-stretch justify-center overflow-x-scroll no-scrollbar py-4 lg:flex-none">
                <Carousel images={images} className="lg:w-1/2" />
              </div>
            </div>
          </div>
        </section>
        {/*Contact Us and Social Proof*/}
        <section>
          <div className="flex flex-col">
            <div className="flex items-center justify-center py-4">
              <hr className="border-white border-2 flex-grow rounded" />
              <span className="text-xl font-bold m-4 md:text-3xl">
                Contact Us
              </span>
              <hr className="border-white border-2 flex-grow rounded" />
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <p className="mt-2 mx-4 text-base font-semibold text-gray-700 p-4 font-serif bg-gray-50 border-2 border-white rounded md:text-lg">
                You can reach us via phone or email{" "}
                <NavLink
                  className="text-blue-500 underline"
                  to={CONTACT_PAGE_URL}
                >
                  here
                </NavLink>
                . We are available from 9am to 7:30pm Monday to Saturday and 9am
                to 5pm on Sunday.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
