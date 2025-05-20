import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import LiveStream from '../components/video/LiveStream';
//import VideoControls from '../components/video/VideoControls';
import { useVideos } from '../hooks/useVideos';
import { useLiveStream } from '../hooks/useLiveStream';
import type { Stream } from '../types/video.types';
import { Loader } from '../components/common/Loader';

const LiveVideoPage: React.FC = () => {
  // Estado para la cámara seleccionada
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  
  // Obtener lista de cámaras disponibles
  const { streams, loading: streamsLoading, error: streamsError } = useVideos();
  
  // Obtener el stream en vivo para la cámara seleccionada
  const { stream, loading: streamLoading, error: streamError } = useLiveStream(selectedCamera);
  
  // Seleccionar automáticamente la primera cámara cuando se cargan las cámaras
  useEffect(() => {
    if (streams && streams.length > 0 && !selectedCamera) {
      setSelectedCamera(streams[0].id);
    }
  }, [streams, selectedCamera]);

  // Estado para los controles del video
  const [isFullscreen] = useState(false);
  
  // Manejar cambio de cámara
  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(e.target.value);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Video en Vivo</h1>
          <div className="flex space-x-4">
            {/* Selector de cámaras */}
            <div className="w-64">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-capri focus:border-capri"
                value={selectedCamera || ''}
                onChange={handleCameraChange}
                disabled={streamsLoading}
              >
                <option value="">Seleccionar cámara</option>
                {streams && streams.map((camera: Stream) => (
                  <option key={camera.id} value={camera.id}>
                    {camera.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Botón de configuración */}
            <button className="p-2 rounded-full hover:bg-whitegray">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Área principal de video */}
        <div className={`relative bg-asphalt rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
          <div className='aspect-video h-auto max-h-[80vh]'> 
            {streamsLoading || streamLoading ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <Loader />
              </div>
            ) : streamsError || streamError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-asphalt text-white">
                <p className="text-red-400 mb-4">
                  {streamsError || streamError}
                </p>
                <button 
                  className="px-4 py-2 bg-capri text-white rounded hover:bg-capridark"
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </button>
              </div>
            ) : !selectedCamera ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-asphalt text-white">
                <p className="text-gray-400">
                  Selecciona una cámara para ver la transmisión en vivo
                </p>
              </div>
            ) : (
              <div className="w-full h-full">
                <LiveStream cameraId={selectedCamera} />
                
                {/* Información de detección */}
                {stream && stream.detectedObjects && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded">
                    <p className="text-sm font-medium">Objetos detectados:</p>
                    <ul className="text-xs">
                      {stream.detectedObjects.map((object, index) => (
                        <li key={index}>{object}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div> 
        </div>
        
        {/* Información adicional */}
        {selectedCamera && stream && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-asphalt mb-2">Información de la cámara</h3>
              <p className="text-sm text-gray-600">ID: {stream.id}</p>
              <p className="text-sm text-gray-600">Nombre: {stream.name}</p>
              <p className="text-sm text-gray-600">Estado: {stream.status}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-asphalt mb-2">Zona de seguridad</h3>
              <p className="text-sm text-gray-600">
                La zona de seguridad está configurada para detectar objetos específicos
                dentro del campo visual de la cámara.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-asphalt mb-2">Grabaciones recientes</h3>
              <button className="mt-2 w-full px-4 py-2 bg-capri text-white rounded hover:bg-asphalt">
                Ver grabaciones
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LiveVideoPage;