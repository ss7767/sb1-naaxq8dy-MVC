import { VideoConfig, Lyrics } from '../types';
import { loadImage } from './imageLoader';
import { renderText } from './textRenderer';

export class VideoRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private backgroundImage: HTMLImageElement | null = null;
  private animationFrame: number | null = null;
  private startTime: number = 0;
  private isInitialized: boolean = false;
  private isRunning: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;
  }

  public async init(backgroundUrl: string): Promise<void> {
    try {
      this.backgroundImage = await loadImage(backgroundUrl);
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize video renderer:', error);
      throw error;
    }
  }

  public start(lyrics: Lyrics[], config: VideoConfig): void {
    if (!this.isInitialized || !this.backgroundImage) {
      console.error('Renderer not initialized');
      return;
    }

    this.stop();
    this.isRunning = true;
    this.startTime = performance.now();
    this.animate(lyrics, config);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private animate(lyrics: Lyrics[], config: VideoConfig): void {
    if (!this.backgroundImage || !this.isRunning) return;

    const currentTime = performance.now() - this.startTime;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    
    // Find current lyric
    const currentLyric = lyrics.find(
      lyric => lyric.timestamp <= currentTime && 
      lyric.timestamp + 3000 > currentTime
    );

    // Draw text if there's a current lyric
    if (currentLyric) {
      renderText(
        this.ctx,
        currentLyric.text,
        this.canvas.width / 2,
        this.canvas.height / 2,
        {
          fontSize: config.fontSize,
          fontFamily: config.fontFamily,
          textColor: config.textColor,
        }
      );
    }

    // Continue animation if there are more lyrics and we're still running
    if (this.isRunning && currentTime < lyrics[lyrics.length - 1]?.timestamp + 3000) {
      this.animationFrame = requestAnimationFrame(() => this.animate(lyrics, config));
    }
  }
}