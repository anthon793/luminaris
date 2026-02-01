import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PersonMarker } from './PersonMarker';

export function Globe({ people, onSelect, selectedId, setHoveredPerson, viewMode }) {
    const globeRef = useRef();
    const innerGlobeRef = useRef();
    const ringsRef = useRef();

    useFrame((state, delta) => {
        if (viewMode === 'globe' && !selectedId) {
            if (globeRef.current) {
                globeRef.current.rotation.y += delta * 0.1;
            }
        }

        // Counter-rotating inner globe for depth
        if (innerGlobeRef.current) {
            innerGlobeRef.current.rotation.y -= delta * 0.05;
        }

        // Rotating rings
        if (ringsRef.current) {
            ringsRef.current.rotation.z += delta * 0.3;
        }
    });

    return (
        <group ref={globeRef}>
            {/* Bright, engaging lighting for learning */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
            <pointLight position={[-10, 5, -5]} intensity={1.8} color="#00d2ff" />
            <pointLight position={[5, -10, 5]} intensity={1.8} color="#ff6b6b" />

            {/* Globe - Only visible in Globe Mode */}
            {viewMode === 'globe' && (
                <>
                    {/* DARK BASE - Deep Space */}
                    <mesh rotation={[0, -Math.PI / 2, 0]}>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshStandardMaterial
                            color="#000011" // Deep dark blue
                            metalness={0.4}
                            roughness={0.6}
                        />
                    </mesh>

                    {/* INNER ANIMATED SPHERE - Gradient effect */}
                    <mesh ref={innerGlobeRef} rotation={[0, -Math.PI / 2, 0]} scale={[0.998, 0.998, 0.998]}>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshStandardMaterial
                            color="#06b6d4" // Cyan
                            metalness={0.2}
                            roughness={0.6}
                            transparent
                            opacity={0.4}
                        />
                    </mesh>

                    {/* LATITUDE LINES - Electric Cyan */}
                    {[1.0, 0.7, 0.4, 0.0, -0.4, -0.7, -1.0].map((y, i) => (
                        <mesh key={i} position={[0, y * 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[Math.sqrt(25 - (y * 3) ** 2), 0.015, 8, 64]} />
                            <meshBasicMaterial
                                color="#00d2ff" // Electric cyan
                                transparent
                                opacity={0.25}
                            />
                        </mesh>
                    ))}

                    {/* MERIDIAN LINES - Vibrant Orange */}
                    {[0, Math.PI / 6, Math.PI / 3, Math.PI / 2, (2 * Math.PI) / 3, (5 * Math.PI) / 6].map((angle, i) => (
                        <mesh key={i} rotation={[0, angle, 0]}>
                            <torusGeometry args={[5, 0.015, 8, 64]} />
                            <meshBasicMaterial
                                color="#ffa502" // Bright orange
                                transparent
                                opacity={0.2}
                            />
                        </mesh>
                    ))}

                    {/* EQUATORIAL RING - Glowing Green */}
                    <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.05, 1.05, 1]}>
                        <torusGeometry args={[5, 0.025, 8, 100]} />
                        <meshStandardMaterial
                            color="#1dd1a1" // Fresh green
                            emissive="#1dd1a1"
                            emissiveIntensity={1}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* ROTATING ORBITAL RINGS - Vibrant colors */}
                    <group ref={ringsRef}>
                        <mesh rotation={[0.3, 0, 0.2]} scale={[1.15, 1.15, 0.02]}>
                            <torusGeometry args={[5, 0.04, 8, 100]} />
                            <meshBasicMaterial
                                color="#a29bfe" // Soft purple
                                transparent
                                opacity={0.5}
                            />
                        </mesh>
                        <mesh rotation={[-0.3, 0, -0.2]} scale={[1.18, 1.18, 0.02]}>
                            <torusGeometry args={[5, 0.03, 8, 100]} />
                            <meshBasicMaterial
                                color="#ff6b6b" // Vibrant coral
                                transparent
                                opacity={0.4}
                            />
                        </mesh>
                    </group>

                    {/* ATMOSPHERIC GLOW - Multi-layer vibrant */}
                    <mesh scale={[1.08, 1.08, 1.08]}>
                        <sphereGeometry args={[5, 32, 32]} />
                        <meshBasicMaterial
                            color="#00d2ff" // Electric cyan
                            transparent
                            opacity={0.25}
                            side={THREE.BackSide}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                    <mesh scale={[1.14, 1.14, 1.14]}>
                        <sphereGeometry args={[5, 32, 32]} />
                        <meshBasicMaterial
                            color="#a29bfe" // Soft purple
                            transparent
                            opacity={0.15}
                            side={THREE.BackSide}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                    <mesh scale={[1.2, 1.2, 1.2]}>
                        <sphereGeometry args={[5, 32, 32]} />
                        <meshBasicMaterial
                            color="#ff6b6b" // Vibrant coral
                            transparent
                            opacity={0.08}
                            side={THREE.BackSide}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                </>
            )}

            {/* Legend Markers with vibrant colors */}
            {people.map((person) => (
                <PersonMarker
                    key={person.id}
                    person={person}
                    onSelect={onSelect}
                    selectedId={selectedId}
                    setHoveredPerson={setHoveredPerson}
                    isSelected={selectedId === person.id}
                    viewMode={viewMode}
                />
            ))}
        </group>
    );
}
