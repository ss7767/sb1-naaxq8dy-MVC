import { useEffect, useRef } from 'react';

export const useCanvas = (width: number, height: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Set initial canvas state
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  }, [width, height]);
  
  return canvasRef;
};