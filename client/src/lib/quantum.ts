import * as THREE from 'three';
import { gsap } from 'gsap';

interface EmergencyScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  cleanup: () => void;
}

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time * 0.5;
    
    // Create quantum interference pattern
    float interference = sin(uv.x * 50.0 + t) * sin(uv.y * 50.0 + t);
    
    // Add glitch effect
    float glitch = step(0.99, sin(t * 10.0));
    uv.x += glitch * 0.02 * sin(t * 100.0);
    
    vec3 color = vec3(0.0);
    color += vec3(0.5, 0.8, 1.0) * interference;
    color += vec3(1.0, 0.2, 0.5) * glitch;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function createEmergencyScene(): EmergencyScene {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  camera.position.z = 1;
  
  return {
    scene,
    camera,
    renderer,
    geometry,
    material,
    mesh,
    cleanup: () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    }
  };
}

export function initEmergencySimulation() {
  const emergencyScene = createEmergencyScene();
  let startTime = Date.now();
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = (Date.now() - startTime) * 0.001;
    emergencyScene.material.uniforms.time.value = elapsedTime;
    emergencyScene.renderer.render(emergencyScene.scene, emergencyScene.camera);
  }
  
  // Start animation
  animate();
  
  // Add the error code overlay
  const errorOverlay = document.createElement('div');
  errorOverlay.className = 'fixed inset-0 flex items-center justify-center z-50 pointer-events-none';
  errorOverlay.innerHTML = `
    <div class="text-primary font-mono text-2xl">
      0xERROR_QUANTUM_OVERFLOW
    </div>
  `;
  document.body.appendChild(errorOverlay);
  
  // Trigger site elements collapse animation
  gsap.to('[data-quantum-collapse]', {
    scale: 0.8,
    opacity: 0,
    stagger: 0.05,
    duration: 1
  });
  
  // Cleanup after animation
  setTimeout(() => {
    emergencyScene.cleanup();
    document.body.removeChild(errorOverlay);
    gsap.to('[data-quantum-collapse]', {
      scale: 1,
      opacity: 1,
      stagger: 0.05,
      duration: 1
    });
  }, 5000);
}
