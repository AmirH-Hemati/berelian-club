"use client";

import Spiral from "@/../public/spiral-arrow.svg";
import { ActiveProvider } from "@/components/Active.provider";
import DetailsComponent from "@/features/home/components/Details";
import SubtitleSection from "@/features/home/components/SubtitleSection";
import TitleSection from "@/features/home/components/TitleSection";
import Image from "next/image";
import ScreenShots from "./ScreenShots";

export function FeatureSlider() {
  return (
    <ActiveProvider itemsCount={4}>
      <div className="relative space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-16 items-center">
          <TitleSection />
          <SubtitleSection />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  mt-20 gap-6">
          <DetailsComponent />
          <ScreenShots />
        </div>
        <Image
          src={Spiral}
          alt="test"
          className="absolute top-18 lg:top-28 rotate-y-180"
        />
      </div>
    </ActiveProvider>
  );
}
