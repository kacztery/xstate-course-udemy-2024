"use client";

import { useRef } from "react";
import { useMachine } from "@xstate/react";

import { videoPlayerMachine } from "../../machines/videoPlayerMachine";

export default function Home() {
  const videoRef = useRef(null);

  const machine = videoPlayerMachine(videoRef, { autoplay: true });
  const [state, send] = useMachine(machine);

  const playingVideo = () =>
    send({
      type: "STOP",
    });

  return (
    <main>
      <h1>XState works! Video Player Machine!</h1>

      <div>
        <video
          width="320"
          src="https://v3.cdnpk.net/videvo_files/video/free/2014-06/large_preview/Blue_Sky_and_Clouds_Timelapse_0892__Videvo.mp4?token=exp=1725355308~hmac=2ce87648cf26206e237a51590a80f3b3ad88f6234f3b30ddd0c3566a31dab7eb"
          muted
          ref={videoRef}
        />
      </div>

      <button
        type="button"
        onClick={() =>
          send({
            type: "PLAY",
          })
        }
      >
        PLAY
      </button>

      <button type="button" onClick={playingVideo}>
        STOP
      </button>
    </main>
  );
}
