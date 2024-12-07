import { create } from 'zustand';
import { Lyrics, VideoConfig } from '../types';

interface VideoStore {
  lyrics: Lyrics[];
  config: VideoConfig;
  setLyrics: (lyrics: Lyrics[]) => void;
  setConfig: (config: Partial<VideoConfig>) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  lyrics: [],
  config: {
    background: 'https://source.unsplash.com/random/1280x720',
    fontFamily: 'Arial',
    fontSize: 48,
    textColor: '#ffffff',
  },
  setLyrics: (lyrics) => set({ lyrics }),
  setConfig: (config) => set((state) => ({
    config: { ...state.config, ...config },
  })),
}));