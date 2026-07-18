"use client";
import shadow from "@/../public/shadow.svg";
import page from "@/../public/dashboardPage.png";
import Styles from "./screenShots.module.css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useActive } from "@/components/Active.provider";

const screenshots = [page, page, shadow, shadow];
export default function ScreenShots() {
  const { activeIndex } = useActive();
  return (
    <div className={Styles.test}>
      <Image className={Styles.shadow} src={shadow} alt="" />

      {screenshots.map((screenShot, index) => (
        <Image
          key={screenShot}
          className={cn(
            Styles.image,
            index === activeIndex && "opacity-100! z-20!",
          )}
          src={screenShot}
          alt=""
        />
      ))}
      <ol className="flex flex-col gap-1 absolute left-1 top-1/2 -translate-y-1/2 ">
        {screenshots.map((screenShot, index) => (
          <li
            key={screenShot}
            className={cn(
              "w-1.5 h-1.5 bg-white rounded-full opacity-50",
              index === activeIndex && "h-10 opacity-100",
            )}
          />
        ))}
      </ol>
    </div>
  );
}
