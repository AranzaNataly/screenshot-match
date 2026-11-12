import { useEffect, useRef } from 'react';

// As partículas acompanham o mouse; a animação para com movimento reduzido.
export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let tick = 0;
    const mouse = { x: -1000, y: -1000 };
    const points = Array.from({ length: 47 }, (_, i) => ({
      x: ((i * 173 + 53) % 997) / 997,
      y: ((i * 257 + 67) % 991) / 991,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const style = getComputedStyle(document.documentElement);
      ctx.strokeStyle = style.getPropertyValue('--hero-line');
      ctx.fillStyle = style.getPropertyValue('--dusty');
      const positions = points.map((p, i) => ({
        x: p.x * width + Math.sin(tick * .005 + i) * 9,
        y: p.y * height + Math.cos(tick * .004 + i) * 7,
      }));
      positions.forEach((p, i) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, i % 5 === 0 ? 2 : 1, 0, Math.PI * 2); ctx.fill();
        positions.slice(i + 1).forEach(q => {
          if (Math.hypot(p.x - q.x, p.y - q.y) < Math.min(150, width * .16)) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
        if (!media.matches && Math.hypot(p.x - mouse.x, p.y - mouse.y) < 190) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      });
      tick++;
      if (!media.matches) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = width * devicePixelRatio; canvas.height = height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      if (media.matches) draw();
    };
    const move = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left; mouse.y = event.clientY - rect.top;
    };
    const restart = () => { cancelAnimationFrame(frame); draw(); };
    const observer = new MutationObserver(() => { if (media.matches) draw(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    resize(); draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', move);
    media.addEventListener('change', restart);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move);
      media.removeEventListener('change', restart);
    };
  }, []);
  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />;
}