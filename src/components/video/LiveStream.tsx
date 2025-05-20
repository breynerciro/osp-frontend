import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';

interface LiveStreamProps {
  cameraId: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ cameraId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // En una implementación real, aquí conectaríamos con el stream de video
    const loadStream = async () => {
      try {
        // Simulación de carga del stream
        console.log(`Conectando a la cámara ${cameraId}...`);
        
        // Aquí se conectaría al stream real
        // videoRef.current.srcObject = await getStreamFromCamera(cameraId);
        
        // Para este ejemplo, simulamos un error ocasional
        if (Math.random() > 0.9) {
          throw new Error("No se pudo conectar con la cámara");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setIsPlaying(false);
      }
    };
    
    loadStream();
    
    return () => {
      // Cleanup: detener la conexión al stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [cameraId]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {error ? (
        <div className="flex flex-col items-center justify-center h-96 bg-gray-900 text-white">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef}
            className="w-full h-auto"
            autoPlay
            playsInline
            muted={isMuted}
            poster="/assets/images/video-placeholder.jpg"
          />
          <VideoControls 
            isPlaying={isPlaying}
            isMuted={isMuted}
            isFullscreen={isFullscreen}
            onPlayPause={handlePlayPause}
            onMute={handleMute}
            onFullscreen={handleFullscreen}
          />
        </>
      )}
    </div>
  );
};

export default LiveStream;