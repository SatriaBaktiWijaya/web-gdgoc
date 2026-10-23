import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const repeatingUnits = Array.from({ length: 18 });

  return (
    <footer className="w-full relative z-20 flex flex-col items-center pt-0 pb-12 px-3 sm:px-6">
      {/* Footer Main Card (1397px wide, 530px high, rx=14px in Figma) */}
      <div className="w-full max-w-[1397px] mx-auto bg-white/70 backdrop-blur-xl rounded-[14px] border border-white/70 p-5 sm:p-10 lg:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 sm:pb-16">
          {/* Brand & Info Column */}
          <div className="md:col-span-5 flex flex-col text-left">
            <Link href="/" className="flex items-center gap-3 sm:gap-3.5 w-fit max-w-full">
              <div className="relative w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] shrink-0">
                <Image
                  src="/assets/gdg-logo.png"
                  alt="GDG On Campus"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="font-semibold text-[16px] sm:text-[18px] text-dark tracking-tight leading-tight">
                  Google Developer Groups
                </span>
                <span className="text-[12px] sm:text-[13px] leading-tight mt-0.5">
                  <span className="text-[#4383F3] font-medium">On Campus</span> •{" "}
                  <span className="text-[#EA4335] font-medium">Telkom University Purwokerto</span>
                </span>
              </div>
            </Link>

            <p className="text-dark/75 text-[15px] leading-relaxed mt-6 max-w-sm">
              GDG on Campus Tel-U Purwokerto is a space where students connect, explore, and build with technology together.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-[17px] text-dark mb-4 tracking-tight">Navigation</h3>
              <ul className="space-y-3 text-[14px] text-dark/75">
                <li>
                  <Link href="/" className="hover:text-[#4383F3] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#events" className="hover:text-[#4383F3] transition-colors">
                    Event
                  </Link>
                </li>
                <li>
                  <Link href="/#community" className="hover:text-[#4383F3] transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/core-team" className="hover:text-[#4383F3] transition-colors">
                    Core Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-[17px] text-dark mb-4 tracking-tight">Contact</h3>
              <ul className="space-y-3 text-[14px] text-dark/75">
                <li>
                  <a
                    href="mailto:gdgoc.tup@gmail.com"
                    className="hover:text-[#4383F3] transition-colors inline-flex items-center gap-1"
                  >
                    Email <span className="text-xs">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-[17px] text-dark mb-4 tracking-tight">Social</h3>
              <ul className="space-y-3 text-[14px] text-dark/75">
                <li>
                  <a
                    href="https://www.instagram.com/gdgoc.telkomunivpwt"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#4383F3] transition-colors inline-flex items-center gap-1"
                  >
                    Instagram <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4383F3] transition-colors inline-flex items-center gap-1"
                  >
                    Partnership <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4383F3] transition-colors inline-flex items-center gap-1"
                  >
                    Sponsorship <span className="text-xs">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sub-footer Information */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-[14px] text-gray-medium">
          <p className="text-center sm:text-left">© 2026 GDG on Campus Tel-U Purwokerto. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-8">
            <Link href="#" className="hover:text-dark transition-colors">
              Open Recruitment
            </Link>
            <Link href="#" className="hover:text-dark transition-colors">
              Join Our Community
            </Link>
          </div>
        </div>

        {/* Decorative repeating GDG outline logos inside card at bottom */}
        <div className="w-full flex items-center justify-between mt-10 sm:mt-14 opacity-80 overflow-hidden pointer-events-none select-none">
          {repeatingUnits.map((_, i) => (
            <svg
              key={`gdg-unit-${i}`}
              width="67"
              height="37"
              viewBox="9 5968 67 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-dark/70 hover:text-dark transition-opacity"
            >
              <path
                d="M26.0908 5970.7C29.4955 5968.05 34.3558 5968.56 37.1416 5971.79L37.4043 5972.11C40.138 5975.63 39.5056 5980.69 35.9912 5983.43L30.1123 5988L35.9912 5992.57L36.3115 5992.83C39.5416 5995.62 40.0527 6000.48 37.4043 6003.89L37.1416 6004.21C34.4455 6007.33 29.8071 6007.91 26.4248 6005.55L26.0908 6005.3L12.1123 5994.43C10.0312 5992.81 8.96069 5990.37 9.00098 5987.92C9.0058 5985.66 9.96152 5983.41 11.791 5981.83L12.1113 5981.57L26.0908 5970.7ZM47.9619 5971.79C50.7478 5968.56 55.608 5968.05 59.0127 5970.7L72.9912 5981.57L73.3115 5981.83C75.1748 5983.44 76.1313 5985.74 76.1006 5988.05C76.103 5990.45 75.0367 5992.84 72.9912 5994.43L59.0117 6005.3L58.6787 6005.55C55.2964 6007.91 50.657 6007.33 47.9609 6004.21L47.6982 6003.89C45.05 6000.48 45.5611 5995.62 48.791 5992.83L49.1113 5992.57L54.9902 5988L49.1123 5983.43C45.5976 5980.69 44.9644 5975.63 47.6982 5972.11L47.9619 5971.79ZM22.0117 5994.3L21.6787 5994.55C19.8461 5995.83 17.6445 5996.24 15.583 5995.86L26.7051 6004.51C29.7838 6006.91 34.2206 6006.35 36.6152 6003.27C39.0097 6000.19 38.4561 5995.76 35.3779 5993.36L29.2979 5988.63L22.0117 5994.3ZM49.7256 5993.36C46.6473 5995.76 46.093 6000.19 48.4873 6003.27C50.8819 6006.35 55.3188 6006.9 58.3975 6004.51L69.5195 5995.86C67.4582 5996.24 65.2573 5995.83 63.4248 5994.55L63.0908 5994.3L55.8047 5988.63L49.7256 5993.36ZM21.3984 5982.49C18.3198 5980.09 13.8821 5980.65 11.4873 5983.73C10.4761 5985.03 9.99335 5986.57 10.002 5988.1C10.0345 5989.56 10.5197 5991.03 11.4873 5992.27C13.8819 5995.35 18.3188 5995.9 21.3975 5993.51L28.4834 5988L21.3984 5982.49ZM73.6152 5983.73C71.2205 5980.65 66.7828 5980.09 63.7041 5982.49L56.6191 5988L63.7051 5993.51C66.7838 5995.91 71.2206 5995.35 73.6152 5992.27C74.583 5991.03 75.0681 5989.56 75.1006 5988.1C75.1092 5986.57 74.6265 5985.03 73.6152 5983.73ZM36.6152 5972.73C34.2205 5969.65 29.7828 5969.09 26.7041 5971.49L15.583 5980.14C17.7713 5979.73 20.1175 5980.22 22.0127 5981.7L29.2979 5987.37L35.377 5982.64C38.4557 5980.24 39.01 5975.81 36.6152 5972.73ZM58.3984 5971.49C55.3198 5969.09 50.8821 5969.65 48.4873 5972.73C46.0928 5975.81 46.6479 5980.24 49.7266 5982.64L55.8047 5987.37L63.0908 5981.7C64.9858 5980.22 67.3315 5979.73 69.5195 5980.14L58.3984 5971.49Z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>
      </div>
    </footer>
  );
}
