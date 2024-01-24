import React from "react";
import FAQs from "../../utilities/components/FAQs";
import ContactInfo from "../../utilities/components/ContactInfo";

/**
 * The page to contact us.
 * @returns  The page to contact us.
 */
const ContactUs = () => {
  return (
    <div className="container max-w-7xl mx-auto my-0 px-0">
      <section>
        <div
          style={{
            backgroundImage: "url('/assets/images/customer_care.jpg')",
            backgroundPosition: "center",
          }}
          className="relative flex items-start justify-start h-[55%] w-full bg-cover bg-center bg-no-repeat"
        >
          <div className="flex flex-col items-start justify-start p-4 md:p-10">
            <div className="max-w-lg border-red-200 rounded-md">
              <h1 className="text-white mb-8 font-sans-bold font-bold text-4xl uppercase">
                Contact Us
              </h1>
            </div>
            <div className="max-w-sm bg-yellow-500 border-red-200 rounded-md md:max-w-lg">
              <p className="font-bold p-4 text-white md:w-full">
                Looking for ways to get in touch with us? We would be thrilled
                to chat with you.
                <br />
                We are available from 9am to 7:30pm Monday to Saturday and 9am
                to 5pm on Sunday.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <ContactInfo />
      </section>
      <section>
        <FAQs />
      </section>
    </div>
  );
};

export default ContactUs;
