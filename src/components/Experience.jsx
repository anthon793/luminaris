import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Globe } from './Globe';
import { KnowledgeGraph } from './KnowledgeGraph';
import gsap from 'gsap';

function CameraController({ viewMode }) {
    // We could animate camera position here based on view mode
    return null;
}

export function Experience({ people, onSelect, selectedId, setHoveredPerson, viewMode }) {
    return (
        <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
            <color attach="background" args={['#020205']} />

            <ambientLight intensity={0.5} color="#ffffff" />
            <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#d946ef" />

            <Stars radius={150} depth={50} count={6000} factor={4} saturation={1} fade speed={1} />

            <Suspense fallback={null}>
                {viewMode === 'graph' ? (
                    <KnowledgeGraph
                        people={people}
                        onSelect={onSelect}
                        selectedId={selectedId}
                        setHoveredPerson={setHoveredPerson}
                        hoveredId={null}
                    />
                ) : (
                    <Globe
                        people={people}
                        onSelect={onSelect}
                        selectedId={selectedId}
                        setHoveredPerson={setHoveredPerson}
                        viewMode={viewMode}
                    />
                )}
            </Suspense>

            <OrbitControls
                enablePan={true}
                minDistance={5}
                maxDistance={40}
                rotateSpeed={0.5}
                zoomSpeed={0.8}
                autoRotate={viewMode === 'galaxy'} // Slow auto-rotate in gallery view
                autoRotateSpeed={0.5}
            />
        </Canvas>
    );
}
