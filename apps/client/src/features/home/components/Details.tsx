"use client"
import { useActive } from "@/components/Active.provider";
import Detail from "./Detail";
import { details } from "./data/details";

export default function DetailsComponent() {
  const { activeIndex } = useActive();
  return (
    <ul className=" flex flex-col gap-6 justify-center">
      {details.map((detail, index) => (
        <Detail
          detail={detail}
          key={detail.title}
          isActive={index === activeIndex}
        />
      ))}
    </ul>
  );
}
