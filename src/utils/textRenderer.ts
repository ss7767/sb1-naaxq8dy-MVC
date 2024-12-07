interface TextOptions {
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

export const renderText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: TextOptions
) => {
  ctx.font = `${options.fontSize}px ${options.fontFamily}`;
  ctx.fillStyle = options.textColor;
  ctx.fillText(text, x, y);
};