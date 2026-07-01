import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mt-[70px] min-h-[88vh] flex flex-col lg:flex-row items-center justify-between px-6 md:px-[8%] py-16 lg:py-0 gap-[60px]">
      {/* Left Text Block */}
      <div className="w-full max-w-[620px] text-center lg:text-left flex flex-col items-center lg:items-start">
        <div className="inline-block px-[18px] py-2 rounded-[999px] bg-[var(--glass)] border border-[var(--border)] mb-[30px] text-sm">
          Community Driven • Open Source
        </div>

        <h1 className="text-4xl md:text-[4rem] font-bold leading-[1.08] mb-7">
          From One Seed.
          <br />
          To A <span className="text-[var(--primary)]">Forest</span> of
          Builders.
        </h1>

        <p className="text-base md:text-[1.1rem] leading-[1.8] text-[var(--muted)] mb-10">
          Sylven OS is a global community where developers learn, build,
          contribute, and grow together through open-source collaboration. Every
          project begins with one idea—and every contributor helps expand the
          ecosystem.
        </p>

        <div className="flex gap-5 justify-center lg:justify-start w-full">
          <Link
            href="#"
            className="px-8 py-[15px] rounded-xl font-semibold transition-transform duration-300 bg-[var(--primary)] text-white no-underline hover:-translate-y-[3px]"
          >
            Join Community
          </Link>
          <Link
            href="#"
            className="px-8 py-[15px] rounded-xl font-semibold transition-all duration-300 border border-[var(--border)] text-[var(--text)] no-underline hover:bg-[var(--glass)]"
          >
            Explore Projects
          </Link>
        </div>
      </div>

      {/* Right Metric Card */}
      <div className="w-full max-w-[430px] p-10 bg-[var(--glass)] border border-white/10 backdrop-blur-[20px] rounded-[24px]">
       
         <div className="w-[140px] h-[140px] rounded-full mx-auto mb-[30px] bg-[var(--gradient-primary)] flex items-center justify-center text-[60px] shadow-[var(--shadow-lg)]">
           <div className="relative w-full h-full">
            <Image
              src="/IMG_20260628_143818.png"
              alt="Sylven OS Logo Mark"
              fill
              sizes="90px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="divide-y divide-gray-500/15">
          <div className="flex justify-between items-center py-[18px]">
            <span className="text-sm md:text-base">Members</span>
            <strong className="font-bold">Worldwide</strong>
          </div>
          <div className="flex justify-between items-center py-[18px]">
            <span className="text-sm md:text-base">Projects</span>
            <strong className="font-bold">Open Source</strong>
          </div>
          <div className="flex justify-between items-center py-[18px]">
            <span className="text-sm md:text-base">Learning</span>
            <strong className="font-bold">Hands-on</strong>
          </div>
          <div className="flex justify-between items-center py-[18px]">
            <span className="text-sm md:text-base">Mission</span>
            <strong className="font-bold">Learn • Build • Educate</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
