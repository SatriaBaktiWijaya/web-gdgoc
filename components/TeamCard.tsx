import Image from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Core" | "Mentor & Education" | "Media & Creative" | "Event & Community";
  image: string;
  year?: string;
  linkedin?: string;
  instagram?: string;
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="w-full max-w-[315px] h-[489px] bg-white rounded-[10px] border border-[#E9E9E9] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow mx-auto">
      {/* Portrait Container (282px x 308px, rx=6px in Figma) */}
      <div className="relative w-full h-[308px] rounded-[6px] overflow-hidden bg-[#E9F1FF] flex items-end justify-center">
        {/* Blue Grid Background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4285F4 1px, transparent 1px), linear-gradient(to bottom, #4285F4 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative w-full h-full">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
            loading="eager"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-3 flex flex-col text-left">
        <h3 className="font-bold text-[20px] text-dark leading-snug">
          {member.role}
        </h3>
        <p className="text-gray-medium text-[15px] font-normal mt-0.5">
          {member.name}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="relative w-4 h-4 shrink-0">
            <Image
              src="/assets/gdg-logo.png"
              alt="GDG"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[12px] text-gray-medium font-normal">
            Core Team {member.year || "2026"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-medium">
          {/* LinkedIn Outline Icon */}
          <a
            href={member.linkedin || "#"}
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:text-[#4285F4] transition-colors"
            aria-label={`${member.name} LinkedIn`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="4" />
              <line x1="7" y1="10" x2="7" y2="17" />
              <circle cx="7" cy="7" r="1" fill="currentColor" />
              <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
              <line x1="12" y1="10" x2="12" y2="17" />
            </svg>
          </a>

          {/* Instagram Outline Icon */}
          <a
            href={member.instagram || "#"}
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:text-[#EA4335] transition-colors"
            aria-label={`${member.name} Instagram`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
