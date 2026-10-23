import Link from "next/link";

interface AnnouncementProps {
  title: string;
  body: string;
  date: string;
  href?: string;
}

export default function AnnouncementCard({
  title,
  body,
  date,
  href = "#",
}: AnnouncementProps) {
  return (
    <div className="w-full bg-white border border-[#E3E3E3] rounded-[8px] p-4 flex flex-col justify-between hover:border-[#4383F3]/50 transition-colors shadow-xs h-[195px]">
      <div>
        {/* Badge */}
        <span className="inline-block bg-[#E9F1FF] text-[#4383F3] text-[11px] font-medium px-2 py-0.5 rounded-[4px]">
          Announcement
        </span>

        {/* Title */}
        <h4 className="font-semibold text-[14px] sm:text-[15px] text-dark mt-2.5 leading-snug line-clamp-2">
          {title}
        </h4>

        {/* Excerpt Body */}
        <p className="text-[12px] text-gray-medium mt-1.5 leading-relaxed line-clamp-2">
          {body}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F0F0F0] mt-auto">
        <div className="flex items-center gap-1.5 text-[11.5px] text-dark/70">
          <svg className="w-3.5 h-3.5 text-gray-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
        </div>

        <Link
          href={href}
          className="text-[11.5px] text-[#4383F3] hover:underline font-medium inline-flex items-center gap-1"
        >
          <span>Read More</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
