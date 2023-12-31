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
import { getMapURL } from "../app/api/StaticMap/route";
import { calculateScores, userEntrytoCoords } from "../app/calculateScores";

function handleClick(
  e: MouseEvent<HTMLImageElement>,
  pinOn: boolean,
  setPinX: Dispatch<SetStateAction<number>>,
  setPinY: Dispatch<SetStateAction<number>>,
  setPinOn: Dispatch<SetStateAction<boolean>>,
  setRectX: Dispatch<SetStateAction<number>>,
  setRectY: Dispatch<SetStateAction<number>>
) {
  setRectX(e.currentTarget.getBoundingClientRect().left);
  setRectY(e.currentTarget.getBoundingClientRect().top);
  const x = e.clientX;
  const y = e.clientY;
  if (!pinOn) {
    setPinX(x);
    setPinY(y);
    setPinOn(true);
  }
}

type MapProps = {
  setGameResult: Dispatch<SetStateAction<[string, number][]>>;
  pinOn: boolean;
  setPinOn: Dispatch<SetStateAction<boolean>>;
  loadMap: boolean;
};

export default function MapComponent({
  setGameResult,
  pinOn,
  setPinOn,
  loadMap,
}: MapProps) {
  const [pinX, setPinX] = useState(0);
  const [pinY, setPinY] = useState(0);
  const [img, setImg] = useState("");
  const [rectX, setRectX] = useState(0);
  const [rectY, setRectY] = useState(0);

  useEffect(() => {
    async function tempFunc() {
      if (pinX == 0) {
        setPinX(0);
        return;
      }
      const [lat, long] = userEntrytoCoords(
        pinX - (rectX + 300),
        pinY - (rectY + 300),
        rectX,
        rectY
      );
      let score;
      console.log(`lat: ${lat} long: ${long}`);
      try {
        score = await calculateScores(long, lat);
      } catch (e) {
        score = 0;
      }

      setGameResult([
        ["NULL", 0],
        ["Score", parseFloat(Math.random().toPrecision(2))],
      ]);
    }
    tempFunc();
  }, [pinX, pinY, setGameResult]);

  useEffect(() => {
    const fetchImg = async () => {
      const lat: number = Math.floor(Math.random() * 340) - 170;
      const long: number = Math.floor(Math.random() * 160) - 80;
      const url = await getMapURL(lat, long);
      setImg(url);
    };

    fetchImg();
  }, [loadMap]);

  return (
    <div className="flex justify-center mt-12">
      <Image
        src={img}
        alt="World Map"
        width={600}
        height={600}
        className={
          "absolute origin-bottom-left border-black border-4 border-solid"
        }
        onClick={(e: MouseEvent<HTMLImageElement>) =>
          handleClick(e, pinOn, setPinX, setPinY, setPinOn, setRectX, setRectY)
        }
      />
      <PinComponent {...{ pinX: pinX, pinY: pinY, pinOn: pinOn }} />
    </div>
  );
}
