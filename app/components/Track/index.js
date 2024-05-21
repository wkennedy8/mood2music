import { IoIosAdd } from "react-icons/io";
import { LiaExchangeAltSolid } from "react-icons/lia";

const Track = ({ track, setModalOpen }) => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w 2xl:-mt-96 lg:-mt-48 md:-mt-24">
          {!track?.artists && (
            <>
              <h1 className="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] [word-break:auto-phrase] xl:w-[115%]  [:root[dir=rtl]_&]:leading-[1.35]">
                <span className="text-white">Searching for a song...</span>
              </h1>
              <br />
              <span className="loading loading-bars loading-lg text-accent text-center"></span>
            </>
          )}
          {track?.artists && (
            <div className="flex flex-col center">
              <h1 className="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] [:root[dir=rtl]_&]:leading-[1.35]">
                <span className="text-white">Recommended Track:</span>
                <br />

                <span className="text-center text-accent">{track.name}</span>
              </h1>
              <p className="py-2 text-base-content/70 font-title  font-light md:text-lg xl:text-2xl">
                Artist: {track && track.artists && track.artists[0]?.name}
              </p>
              <br />
              <div className="flex justify-center max-w">
                <div
                  className="tooltip tooltip-[#ffffff] hover:tooltip-open tooltip-left"
                  data-tip="Change song"
                >
                  <button className="mr-2 hover:bg-gray bg-white rounded-full btn text-lg text-black hover:text-white font-bold">
                    <LiaExchangeAltSolid />
                  </button>
                </div>
                <audio controls src={track.preview_url}></audio>

                <div
                  className="tooltip tooltip-[#ffffff] hover:tooltip-open tooltip-right"
                  data-tip="Add to Playlist"
                >
                  <button
                    htmlFor="my_modal_7"
                    className="ml-2 rounded-full btn btn-accent text-lg font-bold"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <IoIosAdd />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
