import React from "react";

const MapLocation = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.297236159287!2d-82.9966675!3d40.11337899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8838f33a964713c9%3A0xb05051cf8305b783!2sLe%20Prestige%20Hall!5e0!3m2!1sen!2sus!4v1688408084009!5m2!1sen!2sus"
      width="600"
      style={{ border: 0, borderRadius: "4px" }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Le Prestige Hall Location"
      className="rounded h-[225px] md:h-[300px] lg:h-[350px]"
    ></iframe>
  );
};

export default MapLocation;
