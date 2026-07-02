// src/components/NodeNetwork.tsx
import Image from "next/image";

export function ProfileCard() {
  return (
    <div className="w-full max-w-[430px] p-10 bg-[var(--glass)] border border-white/10 backdrop-blur-[20px] rounded-[24px] shadow-[var(--shadow-lg)]">
       
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
  );
}