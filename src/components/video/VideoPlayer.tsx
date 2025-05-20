import React, { useRef } from 'react';

interface VideoPlayerProps {
  streamUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl, isPlaying }) => {
  const videoRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Para el caso de Flask, usamos una imagen que se actualiza constantemente
  // en lugar de un elemento video, ya que estamos usando multipart/x-mixed-replace
  return (
    <div ref={containerRef} className="relative w-full">
      <img 
        ref={videoRef}
        src={streamUrl} 
        alt="Video en vivo"
        className="w-full h-auto"
        style={{ display: isPlaying ? 'block' : 'none' }}
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;