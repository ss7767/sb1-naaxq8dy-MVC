import React, { useEffect, useRef } from 'react';
import { useVideoStore } from '../store/videoStore';
import { VideoRenderer } from '../utils/videoRenderer';
import { useCanvas } from '../hooks/useCanvas';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export const VideoPreview: React.FC = () => {
  const canvasRef = useCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const rendererRef = useRef<VideoRenderer | null>(null);
  const { lyrics, config } = useVideoStore();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initializeRenderer = async () => {
      try {
        if (!rendererRef.current) {
          rendererRef.current = new VideoRenderer(canvas);
        }

        const renderer = rendererRef.current;
        await renderer.init(config.background);
        renderer.start(lyrics, config);
      } catch (error) {
        console.error('Failed to initialize video renderer:', error);
      }
    };

    initializeRenderer();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.stop();
      }
    };
  }, [lyrics, config]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg shadow-lg"
        style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}
      />
    </div>
  );
};