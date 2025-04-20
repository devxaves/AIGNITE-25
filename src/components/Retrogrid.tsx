import GradualSpacing from "@/components/ui/gradual-spacing";
import RetroGrid from "@/components/ui/retro-grid";
import Link from "next/link";

export function RetroGri() {
  return (
    <div className="relative flex flex-col justify-center items-center bg-background md:shadow-xl border rounded-lg w-full h-[250px] overflow-hidden">
      <GradualSpacing
        className="z-10 bg-clip-text bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] font-display font-extrabold text-2xl text-center text-transparent md:text-2xl leading-none md:leading-[5rem] tracking-tighter whitespace-pre-wrap pointer-events-none"
        text="WANNA KNOW MORE ABOUT US?"
      />

      <Link href=" ">
        <button className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 focus:ring-opacity-50 shadow-lg hover:shadow-xl mt-8 px-6 py-3 rounded-full focus:ring-2 focus:ring-blue-600 font-semibold text-lg text-white focus:outline-none transform hover:scale-105 transition-all duration-300">
          Contact Us
        </button>
      </Link>

      <RetroGrid />
    </div>
  );
}