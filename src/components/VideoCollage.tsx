import { useRef, useEffect, useState } from "react"


const videos = [
  "/videos/collage_no_v1.mp4",
];



export default function VideoCollage() {
  return (
    <div className="absolute inset-0">
      <video
        ref = {useRef<HTMLVideoElement>(null)}
        autoPlay
        src={"/videos/collage_no_v1.mp4"}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
    </div>
  );
}
