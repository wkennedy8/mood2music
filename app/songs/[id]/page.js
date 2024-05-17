"use client";
import Track from "@/app/components/Track";
import { useState, useEffect } from "react";

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
      <Track track={track} />
    </div>
  );
};

export default Song;
