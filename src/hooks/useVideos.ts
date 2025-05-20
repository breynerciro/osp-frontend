import { useState, useEffect } from 'react';
import type { Stream } from '../types/video.types';
import { fetchLiveStreams } from '../services/videoService';

export const useVideos = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    const getStreams = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const streamsData = await fetchLiveStreams();
        setStreams(streamsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las transmisiones');
        console.error('Error fetching streams:', err);
      } finally {
        setLoading(false);
      }
    };

    getStreams();
  }, [refreshKey]);

  // Función para forzar la recarga de los streams
  const refreshStreams = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Función para filtrar streams por estado
  const getStreamsByStatus = (status: 'online' | 'offline' | 'error') => {
    return streams.filter(stream => stream.status === status);
  };

  // Función para obtener un stream específico por ID
  const getStreamById = (id: string) => {
    return streams.find(stream => stream.id === id || stream.cameraId === id);
  };

  return {
    streams,
    loading,
    error,
    refreshStreams,
    getStreamsByStatus,
    getStreamById,
    onlineStreams: getStreamsByStatus('online'),
    offlineStreams: getStreamsByStatus('offline'),
    errorStreams: getStreamsByStatus('error')
  };
};

export default useVideos;