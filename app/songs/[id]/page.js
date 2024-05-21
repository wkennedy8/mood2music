"use client";

import { useState, useEffect } from "react";
import PlaylistModal from "@/app/components/PlaylistModal";
import Track from "@/app/components/Track";

const Song = ({ params }) => {
  const [track, setTrack] = useState({});

  const mood = params.id;
  const fetchSong = async () => {
    try {
      const res = await fetch(`/api/openai?q=${mood}`, { mood });
      const data = await res.json();
      setTrack(data.track);
    } catch (error) {
      console.log(`Error Fetching song ${error}`);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  return (
    <div>
      {track && (
        <>
          <Track track={track} />
          <PlaylistModal track={track} />
        </>
      )}
    </div>
  );
};

export default Song;
