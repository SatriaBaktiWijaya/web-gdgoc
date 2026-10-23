import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
  id: string | number;
  title: string;
  subtitle: string;
  date: string;
  imageSrc: string;
  href?: string;
}

export default function EventCard({
  title,
  subtitle,
  date,
  imageSrc,
  href = "/dashboard/events/workshop",
}: EventCardProps) {
  return (
    <div className="w-[257px] shrink-0 bg-white border border-[#E3E3E3] rounded-[8px] p-3 flex flex-col justify-between shadow-xs hover:border-[#4383F3]/50 transition-all group">
      <div>
        {/* Poster Image */}
        <div className="relative w-full h-[214px] rounded-[4px] overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Title and Date Row */}
        <div className="flex items-center justify-between mt-3">
          <h4 className="font-semibold text-[15px] text-dark tracking-tight">
            {title}
          </h4>
          <span className="text-[11.5px] text-gray-medium font-normal">
            {date}
          </span>
        </div>

        {/* Subtitle / Speakers / Division */}
        <p className="text-[12.5px] text-dark/70 font-normal mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-3.5 pt-1">
        <Link
          href={href}
          className="w-full h-[35px] bg-[#4383F3] hover:bg-[#3876e0] active:scale-[0.99] text-white font-medium text-[12.5px] rounded-[4px] flex items-center justify-center transition-all shadow-2xs"
        >
          See More
        </Link>
      </div>
    </div>
  );
}
