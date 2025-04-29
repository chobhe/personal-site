import { useRef } from "react"


const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function VideoCollage() {
  return (
    <div className="absolute inset-0">
      <video
        ref = {useRef<HTMLVideoElement>(null)}
        autoPlay
        src={`${basePath}/videos/collage_no_v1.mp4`}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
    </div>
  );
}
