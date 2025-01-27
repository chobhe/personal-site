export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      {/* Book Container */}
      <div className="relative w-[60%] h-[80%] bg-orange-500 border-4 border-black shadow-2xl rounded-lg overflow-hidden">
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full w-[10%] bg-cover bg-center border-r-4 border-black shadow-inner"
          style={{ backgroundImage: "url('/book-spine.jpg')" }}
        ></div>

        {/* Page Edge */}
        <div
          className="absolute right-0 top-0 h-full w-[5%] bg-cover border-l-2 border-gray-300 shadow-inner"
          style={{ backgroundImage: "url('/page-edge.jpg')" }}
        ></div>

        {/* Front Cover */}
        <div
          className="flex flex-col items-center justify-center h-full px-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/book-cover-texture.jpg')" }}
        >
          {/* Title */}
          <h1 className="text-5xl font-bold text-white drop-shadow-md">
            No, David!
          </h1>

          {/* Cartoon Character */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-300 border-4 border-black rounded-full"></div>
            <div className="w-10 h-40 bg-yellow-300 border-4 border-black"></div>
            <div className="flex gap-8 mt-2">
              <div className="w-12 h-12 bg-yellow-300 border-4 border-black rounded-full"></div>
              <div className="w-12 h-12 bg-yellow-300 border-4 border-black rounded-full"></div>
            </div>
          </div>

          {/* Author Name */}
          <p className="mt-10 text-2xl font-medium text-white">By Your Name</p>
        </div>
      </div>
    </div>
  );
}