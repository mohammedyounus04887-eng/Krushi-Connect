'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FuturisticTerrain() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Base Grid Terrain */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 25, 30, 30]} />
        <meshStandardMaterial
          color="#0d3822"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Green Field Plots */}
      {[-4, 0, 4].map((x, i) =>
        [-4, 0, 4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x * 1.5, 0.2, z * 1.5]}>
            <boxGeometry args={[3.8, 0.4, 3.8]} />
            <meshStandardMaterial
              color={(i + j) % 2 === 0 ? '#15803d' : '#166534'}
              roughness={0.6}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function FloatingSatellite() {
  const satRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (satRef.current) {
      satRef.current.position.y = Math.sin(t) * 0.3 + 3;
      satRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={satRef} position={[3, 3, -1]}>
      {/* Satellite Body */}
      <mesh>
        <boxGeometry args={[0.8, 0.4, 0.4]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Solar Wings */}
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.8]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.8]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function FloatingCropNodes() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={[-3, 1, 1]}>
        <mesh>
          <icosahedronGeometry args={[0.5, 1]} />
          <MeshWobbleMaterial color="#4ade80" speed={1.5} factor={0.6} />
        </mesh>
      </group>
      <group position={[3, 1.5, 2]}>
        <mesh>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function AgriLandscape3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[450px] bg-gradient-to-b from-emerald-900 via-forest-900 to-agri-950 rounded-3xl flex items-center justify-center border border-agri-500/30">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-emerald-100 font-bold">Initializing 3D Farm Visualizer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[480px] md:h-[540px] rounded-3xl overflow-hidden border-2 border-agri-500/30 shadow-glow-agri bg-gradient-to-b from-[#0f392b] via-[#123d24] to-[#14532d]">
      {/* Subtle Overlay Glow */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-agri-300 flex items-center space-x-2 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-agri-600 animate-ping" />
        <span className="text-xs font-bold text-agri-950 tracking-wide uppercase">3D Ecosystem Engine Active</span>
      </div>

      <Canvas camera={{ position: [0, 4, 10], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#86efac" />
        <pointLight position={[-10, 5, -5]} intensity={1} color="#f59e0b" />
        
        <FuturisticTerrain />
        <FloatingSatellite />
        <FloatingCropNodes />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
