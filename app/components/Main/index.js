import { moods } from "@/utils/data";
import Link from "next/link";
const Main = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w -mt-96">
          <h1 className="text-white font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] [word-break:auto-phrase] xl:w-[115%] xl:text-start [:root[dir=rtl]_&]:leading-[1.35]">
            Select a mood
          </h1>
        </div>
      </div>
      <div className="max-w flex flex-wrap justify-center text-center mt-24 z-10">
        {moods.map((mood) => {
          return (
            <Link key={mood} href={`/songs/${mood}`}>
              <h4 className="text-accent m-4 text-center text-[clamp(1rem,6vw,3.2rem)] font-black leading-[1.1] [word-break:auto-phrase] xl:w-[115%] xl:text-start [:root[dir=rtl]_&]:leading-[1.35] hover:underline transition-all duration-300 ease-in-out">
                {mood}
              </h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
