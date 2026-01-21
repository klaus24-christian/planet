import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Planet3DCard = ({ planetId, color = '#ffffff', size = 150 }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing canvas first
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // Planet
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const planetConfig = getPlanetConfig(planetId, color);
    
    // Create texture loader
    const textureLoader = new THREE.TextureLoader();
    
    const material = new THREE.MeshPhongMaterial({
      map: planetConfig.texture ? textureLoader.load(planetConfig.texture) : null,
      color: planetConfig.texture ? 0xffffff : planetConfig.color,
      emissive: planetConfig.emissive,
      emissiveIntensity: planetConfig.emissiveIntensity * 0.8,
      shininess: planetConfig.shininess,
      specular: planetConfig.specular,
    });

    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Saturn rings
    if (planetId === 'saturn') {
      const ringGeometry = new THREE.RingGeometry(1.4, 1.8, 32);
      const ringTexture = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/saturn_ring_alpha.png');
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.5;
      scene.add(ring);
    }

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate faster on hover
      const speed = isHovered ? 0.01 : 0.003;
      planet.rotation.y += speed;
      
      if (planetId === 'saturn') {
        scene.children.forEach(child => {
          if (child.geometry instanceof THREE.RingGeometry) {
            child.rotation.z += speed * 0.5;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      
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
  }, [planetId, color, size, isHovered]);

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        width: size, 
        height: size,
        margin: '0 auto',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }} 
    />
  );
};

// Planet configurations with real textures
const getPlanetConfig = (planetId, defaultColor) => {
  const configs = {
    sun: {
      texture: 'https://pin.it/3c6nDzpZeFQ2eL',
      color: 0xfdb813,
      emissive: 0xfdb813,
      emissiveIntensity: 0.6,
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
      emissiveIntensity: 0.15,
      shininess: 80,
      specular: 0xffcc00,
    },
    earth: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_daymap.jpg',
      color: 0x4169e1,
      emissive: 0x0066cc,
      emissiveIntensity: 0.1,
      shininess: 50,
      specular: 0x6699ff,
    },
    mars: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_mars.jpg',
      color: 0xcd5c5c,
      emissive: 0x8b0000,
      emissiveIntensity: 0.15,
      shininess: 20,
      specular: 0xff4444,
    },
    jupiter: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_jupiter.jpg',
      color: 0xdaa520,
      emissive: 0xb8860b,
      emissiveIntensity: 0.15,
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
      emissiveIntensity: 0.15,
      shininess: 90,
      specular: 0x87ceeb,
    },
    neptune: {
      texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_neptune.jpg',
      color: 0x4169e1,
      emissive: 0x0000cd,
      emissiveIntensity: 0.2,
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

export default Planet3DCard;