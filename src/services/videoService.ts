import axios from 'axios';
import type { Stream, Recording, Zone, StreamStats, StreamSettings } from '../types/video.types';

//const API_URL = process.env.BACK_API_URL;

// Helper function to get auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Streams API
export const fetchLiveStreams = async (): Promise<Stream[]> => {
  try {
    const response = await axios.get(`${API_URL}/streams`, getAuthHeaders());
    return response.data as Stream[];
  } catch (error) {
    console.error('Error fetching live streams:', error);
    throw error;
  }
};

export const fetchLiveStreamById = async (cameraId: string): Promise<Stream> => {
  try {
    const response = await axios.get(`${API_URL}/streams/${cameraId}`, getAuthHeaders());
    return response.data as Stream;
  } catch (error) {
    console.error(`Error fetching stream for camera ${cameraId}:`, error);
    throw error;
  }
};

export const updateStreamSettings = async (cameraId: string, settings: Partial<StreamSettings>): Promise<StreamSettings> => {
  try {
    const response = await axios.patch(
      `${API_URL}/streams/${cameraId}/settings`, 
      settings, 
      getAuthHeaders()
    );
    return response.data as StreamSettings;
  } catch (error) {
    console.error('Error updating stream settings:', error);
    throw error;
  }
};

// Recordings API
export const fetchRecordingsByDate = async (date: Date): Promise<Recording[]> => {
  try {
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const response = await axios.get(
      `${API_URL}/recordings`, 
      {
        ...getAuthHeaders(),
        params: { date: formattedDate }
      }
    );
    return response.data as Recording[];
  } catch (error) {
    console.error('Error fetching recordings:', error);
    throw error;
  }
};

export const fetchRecordingById = async (id: string): Promise<Recording> => {
  try {
    const response = await axios.get(`${API_URL}/recordings/${id}`, getAuthHeaders());
    return response.data as Recording;
  } catch (error) {
    console.error(`Error fetching recording ${id}:`, error);
    throw error;
  }
};

export const fetchRecordingsByCameraId = async (cameraId: string, startDate?: Date, endDate?: Date): Promise<Recording[]> => {
  try {
    let params: any = { cameraId };
    
    if (startDate) {
      params.startDate = startDate.toISOString();
    }
    
    if (endDate) {
      params.endDate = endDate.toISOString();
    }
    
    const response = await axios.get(
      `${API_URL}/recordings/camera/${cameraId}`, 
      {
        ...getAuthHeaders(),
        params
      }
    );
    return response.data as Recording[];
  } catch (error) {
    console.error(`Error fetching recordings for camera ${cameraId}:`, error);
    throw error;
  }
};

export const deleteRecording = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/recordings/${id}`, getAuthHeaders());
  } catch (error) {
    console.error(`Error deleting recording ${id}:`, error);
    throw error;
  }
};

// Zones API
export const fetchZonesByCameraId = async (cameraId: string): Promise<Zone[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/zones/camera/${cameraId}`, 
      getAuthHeaders()
    );
    return response.data as Zone[];
  } catch (error) {
    console.error(`Error fetching zones for camera ${cameraId}:`, error);
    throw error;
  }
};

export const createZone = async (zone: Omit<Zone, 'id'>): Promise<Zone> => {
  try {
    const response = await axios.post(
      `${API_URL}/zones`, 
      zone, 
      getAuthHeaders()
    );
    return response.data as Zone;
  } catch (error) {
    console.error('Error creating zone:', error);
    throw error;
  }
};

export const updateZone = async (id: string, zone: Partial<Zone>): Promise<Zone> => {
  try {
    const response = await axios.patch(
      `${API_URL}/zones/${id}`, 
      zone, 
      getAuthHeaders()
    );
    return response.data as Zone;
  } catch (error) {
    console.error(`Error updating zone ${id}:`, error);
    throw error;
  }
};

export const deleteZone = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/zones/${id}`, getAuthHeaders());
  } catch (error) {
    console.error(`Error deleting zone ${id}:`, error);
    throw error;
  }
};

// Statistics API
export const fetchStreamStats = async (cameraId: string, period: 'day' | 'week' | 'month' = 'day'): Promise<StreamStats> => {
  try {
    const response = await axios.get(
      `${API_URL}/stats/stream/${cameraId}`, 
      {
        ...getAuthHeaders(),
        params: { period }
      }
    );
    return response.data as StreamStats;
  } catch (error) {
    console.error(`Error fetching stats for camera ${cameraId}:`, error);
    throw error;
  }
};

// Mock data generator for development
export const generateMockStream = (cameraId: string): Stream => {
  return {
    id: `stream-${cameraId}`,
    name: `Cámara ${cameraId}`,
    url: `/mock-streams/${cameraId}.mp4`,
    cameraId,
    status: Math.random() > 0.2 ? 'online' : 'offline',
    location: 'Entrada principal',
    detectedObjects: Math.random() > 0.5 ? ['Persona', 'Vehículo'] : [],
    lastActivity: new Date().toISOString(),
    resolution: '1280x720',
    fps: 30
  };
};

export const generateMockRecording = (id: string, cameraId: string, date: Date): Recording => {
  const duration = Math.floor(Math.random() * 120) + 30; // 30-150 seconds
  const timestamp = new Date(date);
  timestamp.setHours(Math.floor(Math.random() * 24));
  timestamp.setMinutes(Math.floor(Math.random() * 60));
  
  return {
    id,
    cameraId,
    timestamp: timestamp.toISOString(),
    duration,
    url: `/mock-recordings/${id}.mp4`,
    thumbnail: `/mock-thumbnails/${id}.jpg`,
    detectedObjects: Math.random() > 0.3 ? ['Persona', 'Vehículo'] : ['Persona'],
    status: 'ready',
    size: Math.floor(Math.random() * 10000000) + 1000000,
    format: 'mp4',
    metadata: {
      motionDetected: true,
      objectsCount: Math.floor(Math.random() * 5) + 1,
      triggerReason: Math.random() > 0.5 ? 'motion' : 'object'
    }
  };
};