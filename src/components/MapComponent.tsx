"use client";

import Image from "next/image";
import WorldMap1 from "../../public/Images/TempMap.webp";
import WorldMap2 from "../../public/Images/TempMap2.jpg";
import React, {
  MouseEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import PinComponent from "./PinComponent";
import "../css/Animations.css";
import { getMapURL } from "../app/api/StaticMap/route.js";

function handleClick(
  e: MouseEvent<HTMLImageElement>,
  pinOn: boolean,
  setPinX: Dispatch<SetStateAction<number>>,
  setPinY: Dispatch<SetStateAction<number>>,
  setPinOn: Dispatch<SetStateAction<boolean>>
) {
  const x = e.clientX;
  const y = e.clientY;
  if (!pinOn) {
    setPinX(x);
    setPinY(y);
    setPinOn(true);
  }
}

export default function MapComponent() {
  const [pinX, setPinX] = useState(0);
  const [pinY, setPinY] = useState(0);
  const [pinOn, setPinOn] = useState(false);
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchImg = async () => {
      console.log("hello");
      const url = await getMapURL();
      console.log(url);
      setImg(url);
    };

    fetchImg();
  }, []);

  return (
    <div>
      <Image
        src={WorldMap2}
        alt="World Map Pollution"
        width={500}
        height={500}
        className={"absolute" + (pinOn ? " map-fade-in " : " opacity-0 ")}
      />
      <Image
        src={img}
        alt="World Map"
        width={500}
        height={500}
        className={"absolute " + (pinOn ? " opacity-0 map-fade-out " : "")}
        onClick={(e: MouseEvent<HTMLImageElement>) =>
          handleClick(e, pinOn, setPinX, setPinY, setPinOn)
        }
      />
      <PinComponent {...{ pinX: pinX, pinY: pinY, pinOn: pinOn }} />
    </div>
  );
}