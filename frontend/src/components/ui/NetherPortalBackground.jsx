import { useEffect, useRef } from 'react';

const NetherPortalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to match parent
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const img = new Image();
    img.src = '/nether_portal.png';

    let frame = 0;
    let animationId;
    let lastTime = 0;
    const fps = 20; // 20 frames per second
    const interval = 1000 / fps;

    img.onload = () => {
      // The image is 16x512, which means 32 frames of 16x16
      const frameCount = 32;
      const frameWidth = 16;
      const frameHeight = 16;
      const scale = 4; // Scale up the 16x16 to 64x64

      const draw = (timestamp) => {
        if (timestamp - lastTime >= interval) {
          lastTime = timestamp;

          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Disable smoothing for pixel art
          ctx.imageSmoothingEnabled = false;

          // Calculate how many tiles we need
          const cols = Math.ceil(canvas.width / (frameWidth * scale));
          const rows = Math.ceil(canvas.height / (frameHeight * scale));

          // Draw the tiles
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              ctx.drawImage(
                img,
                0, frame * frameHeight, frameWidth, frameHeight, // Source (x, y, w, h)
                x * frameWidth * scale, y * frameHeight * scale, // Dest (x, y)
                frameWidth * scale, frameHeight * scale        // Dest (w, h)
              );
            }
          }

          frame = (frame + 1) % frameCount;
        }
        animationId = requestAnimationFrame(draw);
      };

      animationId = requestAnimationFrame(draw);
    };

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-90 mix-blend-screen"
    />
  );
};

export default NetherPortalBackground;
