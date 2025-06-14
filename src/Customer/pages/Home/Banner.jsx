import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full relative h-[80vh]">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        src="https://booksy-public.s3.amazonaws.com/horizontal_.webm"
      ></video>

      <div className="textPart absolute flex flex-col items-center justify-center inset-0 text-white z-20 space-y-5 px-5">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          UrbanGlow
        </h1>
        <p className="text-slate-300 text-xl md:text-2xl text-center font-medium">
          Agenda tu próximo corte, peinado o masaje cerca de ti
        </p>
        <input
          readOnly
          onClick={() => navigate("/buscar")}
          className="cursor-pointer border-none bg-white rounded-md py-4 w-[15rem] md:w-[33rem] outline-none text-black px-5"
          placeholder="Buscar por ciudad, barrio o servicio..."
        />
      </div>

      <div className="z-10 absolute top-0 bottom-0 right-0 left-0 bg-black opacity-60"></div>
    </div>
  );
};

export default Banner;
