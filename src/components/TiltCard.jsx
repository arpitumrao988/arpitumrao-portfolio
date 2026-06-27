import React, { useState, useRef } from 'react';

export default function TiltCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within card
    const y = e.clientY - rect.top;  // y coordinate within card

    const px = Math.round((x / rect.width) * 100);
    const py = Math.round((y / rect.height) * 100);
    setCoords({ x: px, y: py });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angle (max 10 degrees for elegant perspective)
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setCoords({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transform,
        '--mouse-x': `${coords.x}%`,
        '--mouse-y': `${coords.y}%`,
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}
    >
      {children}
      <div className="card-shine" />
    </div>
  );
}
