import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const points = [
      { x: 0.02, y: 0.20, baseR: 0.60, angle: 0, speed: 0.0010, color: "rgba(235, 30, 30, 0.75)" },  // Deep Crimson Left Flank
      { x: 0.22, y: 0.40, baseR: 0.70, angle: 1.2, speed: 0.0008, color: "rgba(140, 20, 220, 0.7)" },   // Cosmic Violet
      { x: 0.48, y: 0.80, baseR: 0.75, angle: 2.8, speed: 0.0014, color: "rgba(0, 40, 240, 0.65)" },    // Vibrant Blue Core
      { x: 0.62, y: 0.25, baseR: 0.55, angle: 4.0, speed: 0.0011, color: "rgba(0, 210, 140, 0.65)" },  // Electric Emerald Green
      { x: 0.92, y: 0.50, baseR: 0.65, angle: 1.9, speed: 0.0007, color: "rgba(240, 100, 10, 0.75)" }   // Aurora Gold/Orange Right Flank
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const run = () => {
      // Paints the base color cleanly on the absolute bottom layer
      ctx.fillStyle = "#040206";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      const maxDimension = Math.max(canvas.width, canvas.height);

      points.forEach((p) => {
        p.angle += p.speed;
        const currentX = (p.x + Math.sin(p.angle) * 0.06) * canvas.width;
        const currentY = (p.y + Math.cos(p.angle * 0.9) * 0.05) * canvas.height;
        const currentRadius = (p.baseR + Math.sin(p.angle * 1.2) * 0.04) * maxDimension;

        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, currentRadius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.3, p.color.replace("0.75", "0.2").replace("0.7", "0.2").replace("0.65", "0.15"));
        gradient.addColorStop(0.65, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(run);
    };

    window.addEventListener("resize", resize);
    resize();
    run();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full min-h-screen pointer-events-none block overflow-hidden"
    />
  );
}