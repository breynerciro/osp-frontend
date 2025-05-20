import { useState, useEffect } from 'react';
import type { Stream } from '../types/video.types';
import { fetchLiveStreamById } from '../services/videoService';

export const useLiveStream = (cameraId: string | null) => {
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cameraId) {
      setStream(null);
      return;
    }

    const getStream = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // En una implementación real, esto llamaría a tu API
        const streamData = await fetchLiveStreamById(cameraId);
        setStream(streamData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el stream');
        console.error('Error fetching live stream:', err);
      } finally {
        setLoading(false);
      }
    };

    getStream();
  }, [cameraId]);

  return { stream, loading, error };
};

export default useLiveStream;