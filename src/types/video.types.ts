// src/types/video.types.ts

export interface Stream {
    id: string;
    name: string;
    url: string;
    cameraId: string;
    status: 'online' | 'offline' | 'error';
    location?: string;
    detectedObjects?: string[];
    lastActivity?: string; // ISO date string
    resolution?: string;
    fps?: number;
}
  
export interface Recording {
    id: string;
    cameraId: string;
    timestamp: string; // ISO date string
    duration: number; // in seconds
    url: string;
    thumbnail?: string;
    detectedObjects?: string[];
    zoneId?: string;
    size?: number; // in bytes
    format?: string; // e.g., 'mp4', 'webm'
    status?: 'processing' | 'ready' | 'error';
    metadata?: {
      motionDetected?: boolean;
      objectsCount?: number;
      triggerReason?: 'motion' | 'object' | 'scheduled';
    };
}
  
export interface Zone {
    id: string;
    name: string;
    cameraId: string;
    coordinates: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    };
    active: boolean;
    detectionClasses?: string[]; // Types of objects to detect in this zone
}
  
export interface StreamStats {
    cameraId: string;
    totalDetections: number;
    uptime: number; // in seconds
    lastDetection?: string; // ISO date string
    detectionsByHour?: Record<string, number>;
    mostDetectedObjects?: Array<{
      objectType: string;
      count: number;
    }>;
}
  
export type StreamQuality = 'low' | 'medium' | 'high';
  
export interface StreamSettings {
    cameraId: string;
    quality: StreamQuality;
    enableAudio: boolean;
    motionDetection: boolean;
    objectDetection: boolean;
    notificationsEnabled: boolean;
    recordOnDetection: boolean;
}  