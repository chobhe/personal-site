import { useRef, useEffect } from "react"


const videos = [
  "/videos/pewpewpew.mp4",
  "/videos/building-bed.mp4",
  "/videos/cooking-steak.mp4",
  "/videos/eating-ramen.mp4",
  "/videos/plantsvzombies.mp4",
  "/videos/rave.mp4",
  "/videos/tiktok.mp4",
  "/videos/eating-steak.mp4", 
  "/videos/yakultdance.mp4",
  "/videos/crystal-springs-walk.mp4",
];


const positions = [
  { position: "top-0 left-0 w-1/3 h-1/3", shift: 0 },
  { position: "top-0 left-1/3 w-1/3 h-1/2", shift: 50 },
  { position: "top-0 right-0 w-1/3 h-2/3", shift: 100 },
  { position: "top-1/3 left-0 w-1/2 h-1/3", shift: 0 },
  { position: "top-1/2 left-1/3 w-1/3 h-1/4", shift: 50 },
  { position: "bottom-0 left-0 w-2/5 h-1/3", shift: 0 },
  { position: "bottom-0 left-2/5 w-1/5 h-1/3", shift: 100 },
  { position: "bottom-1/3 right-0 w-1/3 h-1/3", shift: 50 },
  { position: "bottom-0 right-1/3 w-1/3 h-1/4", shift: 100 },
  { position: "bottom-0 right-0 w-1/3 h-2/3", shift: 0 }, // Shifted to center
];

export default function VideoCollage() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch((error) => console.error("Error playing video:", error));
      }
    });
  }, []);

  return (
    <div className="absolute inset-0">
      {videos.map((src, index) => {
        const { position, shift } = positions[index]; // Extract position & shift value

        return (
          <div key={src} className={`absolute ${position} overflow-hidden`}>
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={src}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ 
                objectPosition: `${shift}% center`, // Apply horizontal cropping
              }} // Dynamically apply shift
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}