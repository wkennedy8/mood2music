import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import { isAuthenticated } from "@/utils/isAuthenticated";

const Hero = async () => {
  const session = await isAuthenticated();
  return (
    <div className="hero min-h-[60vh]">
      <div className="hero-content text-center">
        <div className="max-w">
          <h1 className="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] [word-break:auto-phrase] xl:w-[115%] xl:text-start [:root[dir=rtl]_&]:leading-[1.35]">
            <span className="text-white">Discover brand new</span>
            <br />
            <span className="text-center text-accent">music</span>
            <br />
            <span className="text-white">using AI</span>
          </h1>
          <p className="py-6 text-base-content/70 font-title  font-light md:text-lg xl:text-2xl">
            Searching for new music to change your mood? Tell us how you feel
          </p>
          {!session && (
            <Link href="/api/auth/signin">
              <button className="btn btn-accent text-lg md:text-lg xl:text-2xl">
                <FaSpotify />
                <span className="text-base">Sign in to Spotify</span>
              </button>
            </Link>
          )}
          {/* <div className="flex justify-end w-full">
            <svg
              height={120}
              fill="#00ff00"
              viewBox="0 0 128 128"
              // xmlns="http://www.w3.org/2000/svg"
              color="text-accent"
            >
              <path d="m92.266 68.266-22.934 22.934v-75.199h-10.664v75.199l-22.934-22.934-7.4688 7.4688 35.734 35.73 35.734-35.73z" />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
