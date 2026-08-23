import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

type Props = { notFountImage: StaticImageData; path: string; title: string };
export default function NotFoundComponent({
  notFountImage,
  path,
  title,
}: Props) {
  return (
    <div className="  flex items-center justify-center px-4">
      <div className="text-center ">
        <Image
          src={notFountImage}
          alt="صفحه پیدا نشد"

          className="object-contain"
          priority
        />

        <h2 className="text-400 font-bold text-gray-800 dark:text-gray-200 mb-3">
          متاسفیم!
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-300 mb-6">
          مسیر مشخص شده پیدا نشد :(((
        </p>

        <Link
          href={path}
          className="inline-block text-300 bg-primary text-primary-foreground  font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {title}
        </Link>
      </div>
    </div>
  );
}
