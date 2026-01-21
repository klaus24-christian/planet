import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Planet3D = ({ planetId, color = '#ffffff', size = 300 }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing canvas first
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      1, // aspect ratio 1:1 for square canvas
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Planet geometry and material
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);
    
    // Planet-specific textures and colors
    const planetConfig = getPlanetConfig(planetId, color);
    
    // Create texture loader
    const textureLoader = new THREE.TextureLoader();
    
    // Material with texture
    const material = new THREE.MeshPhongMaterial({
      map: planetConfig.texture ? textureLoader.load(planetConfig.texture) : null,
      color: planetConfig.texture ? 0xffffff : planetConfig.color,
      emissive: planetConfig.emissive,
      emissiveIntensity: planetConfig.emissiveIntensity,
      shininess: planetConfig.shininess,
      specular: planetConfig.specular,
      bumpMap: planetConfig.bumpMap ? textureLoader.load(planetConfig.bumpMap) : null,
      bumpScale: 0.05,
    });

    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Add rings for Saturn
    if (planetId === 'saturn') {
      const ringGeometry = new THREE.RingGeometry(2, 3, 64);
      const ringTexture = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/saturn_ring_alpha.png');
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.5;
      scene.add(ring);
    }

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate planet
      planet.rotation.y += 0.005;
      
      // Rotate rings for Saturn
      if (planetId === 'saturn') {
        scene.children.forEach(child => {
          if (child.geometry instanceof THREE.RingGeometry) {
            child.rotation.z += 0.002;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      // Remove canvas properly
      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      // Clear scene
      while(scene.children.length > 0) { 
        scene.remove(scene.children[0]); 
      }
    };
  }, [planetId, color, size]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: size, 
        height: size,
        margin: '0 auto',
        cursor: 'grab'
      }} 
    />
  );
};

// Planet configurations with real textures
const getPlanetConfig = (planetId, defaultColor) => {
  const configs = {
    sun: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_sun.jpg',
      color: 0xfdb813,
      emissive: 0xfdb813,
      emissiveIntensity: 0.5,
      shininess: 100,
      specular: 0xffffff,
    },
    mercury: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_mercury.jpg',
      color: 0x8c7853,
      emissive: 0x000000,
      emissiveIntensity: 0,
      shininess: 30,
      specular: 0x444444,
    },
    venus: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_venus_surface.jpg',
      color: 0xffc649,
      emissive: 0xffa500,
      emissiveIntensity: 0.1,
      shininess: 80,
      specular: 0xffcc00,
    },
    earth: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_daymap.jpg',
      bumpMap: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_normal_map.jpg',
      color: 0x4169e1,
      emissive: 0x0066cc,
      emissiveIntensity: 0.05,
      shininess: 50,
      specular: 0x6699ff,
    },
    mars: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_mars.jpg',
      color: 0xcd5c5c,
      emissive: 0x8b0000,
      emissiveIntensity: 0.1,
      shininess: 20,
      specular: 0xff4444,
    },
    jupiter: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_jupiter.jpg',
      color: 0xdaa520,
      emissive: 0xb8860b,
      emissiveIntensity: 0.1,
      shininess: 60,
      specular: 0xffd700,
    },
    saturn: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_saturn.jpg',
      color: 0xf4a460,
      emissive: 0xdaa520,
      emissiveIntensity: 0.1,
      shininess: 70,
      specular: 0xffcc66,
    },
    uranus: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_uranus.jpg',
      color: 0x4fd0e7,
      emissive: 0x00ced1,
      emissiveIntensity: 0.1,
      shininess: 90,
      specular: 0x87ceeb,
    },
    neptune: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_neptune.jpg',
      color: 0x4169e1,
      emissive: 0x0000cd,
      emissiveIntensity: 0.15,
      shininess: 85,
      specular: 0x6495ed,
    },
    pluto: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_makemake_fictional.jpg',
      color: 0xa0826d,
      emissive: 0x000000,
      emissiveIntensity: 0,
      shininess: 15,
      specular: 0x666666,
    },
  };

  return configs[planetId] || {
    texture: null,
    color: defaultColor,
    emissive: 0x000000,
    emissiveIntensity: 0,
    shininess: 30,
    specular: 0x333333,
  };
};

export default Planet3D;