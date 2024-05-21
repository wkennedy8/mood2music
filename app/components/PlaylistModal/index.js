"use client";
import { useState, useEffect } from "react";
import { addToPlaylist } from "@/app/api/openai/controller";
import Link from "next/link";
import { useSession } from "next-auth/react";

const PlaylistModal = ({ track }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const { data: session } = useSession();
  // console.log(session);

  const playlists = session?.playlists?.filter(
    (p) => p.owner.id == session.spotifyUser.id
  );

  useEffect(() => {}, [successMessage]);

  const handleAddToPlaylist = async (playlist) => {
    try {
      const res = await addToPlaylist(
        session.user.accessToken,
        playlist.id,
        track.uri
      );
      if (res.snapshot_id) {
        setSuccessMessage(
          `Song has successfully been added to playlist: ${playlist.name}`
        );
      }
    } catch (error) {
      console.log(`Error adding to playlist ${error}`);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h1>{successMessage ? "Added ✅" : "Select a Playlist to add to"}</h1>
        <div className="divider"></div>
        <div className="mt-4">
          {successMessage && (
            <p>
              {successMessage.split(":")[0]}:
              <span className="font-bold">
                {` ${successMessage.split(":")[1].trim()}`}
              </span>
            </p>
          )}
          {!successMessage &&
            playlists?.map((playlist) => {
              return (
                <Link href="" onClick={() => handleAddToPlaylist(playlist)}>
                  <p className="text-white font-bold my-4" key={playlist.id}>
                    {playlist.name}
                  </p>
                </Link>
              );
            })}
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => setSuccessMessage("")}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default PlaylistModal;
