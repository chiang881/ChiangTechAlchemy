import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { initParticleSystem } from '@/lib/three';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { cleanup } = initParticleSystem(containerRef.current);
    
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-0 bg-black"
      style={{ pointerEvents: 'none' }}
    />
  );
}
