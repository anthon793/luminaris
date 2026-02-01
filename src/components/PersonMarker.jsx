import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { latLngToVector3 } from '../utils/geo';
import * as THREE from 'three';
import gsap from 'gsap';
import { categoryColors } from '../data/legends';

export function PersonMarker({ person, onSelect, selectedId, setHoveredPerson, isSelected, viewMode }) {
    const [hovered, setHover] = useState(false);
    const ref = useRef();
    const pulseRef = useRef();
    const hasInitialized = useRef(false);

    // Use distributed position for even spacing
    const pos = useMemo(() => {
        const lat = person.distributedLat || person.lat;
        const lng = person.distributedLng || person.lng;
        return latLngToVector3(lat, lng, 5);
    }, [person.distributedLat, person.distributedLng, person.lat, person.lng]);

    const color = categoryColors[person.category] || categoryColors.Default;

    // Smooth animation on selection
    useEffect(() => {
        if (!ref.current) return;

        if (isSelected) {
            gsap.to(ref.current.scale, {
                x: 2.2,
                y: 2.2,
                z: 2.2,
                duration: 0.8,
                ease: 'elastic.out(1, 0.6)'
            });
        } else {
            gsap.to(ref.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }, [isSelected]);

    // Hover animation
    useEffect(() => {
        if (!ref.current || isSelected) return;

        if (hovered) {
            gsap.to(ref.current.scale, {
                x: 1.6,
                y: 1.6,
                z: 1.6,
                duration: 0.4,
                ease: 'back.out(1.5)'
            });
        } else {
            gsap.to(ref.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, [hovered, isSelected]);

    useFrame((state) => {
        if (!ref.current) return;

        if (!hasInitialized.current) {
            ref.current.position.copy(pos);
            hasInitialized.current = true;
        }

        // Pulsing rings animation
        if (pulseRef.current) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + person.id * 0.1) * 0.3;
            pulseRef.current.scale.set(pulse, pulse, 1);
            pulseRef.current.material.opacity = 0.5 - (pulse - 1) * 0.5;
        }
    });

    return (
        <group
            ref={ref}
            position={pos}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(person);
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHover(true);
                setHoveredPerson(person);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                setHover(false);
                setHoveredPerson(null);
                document.body.style.cursor = 'auto';
            }}
        >
            {/* GLOWING DIAMOND MARKER - Main visual */}
            <mesh rotation={[0, Math.PI / 4, 0]}>
                <octahedronGeometry args={[0.12, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isSelected ? 2.5 : hovered ? 2 : 1.5}
                    metalness={0.8}
                    roughness={0.2}
                    toneMapped={false}
                />
            </mesh>

            {/* OUTER GLOW SHELL */}
            <mesh rotation={[0, Math.PI / 4, 0]} scale={[1.8, 1.8, 1.8]}>
                <octahedronGeometry args={[0.12, 0]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isSelected ? 0.6 : hovered ? 0.5 : 0.3}
                    toneMapped={false}
                />
            </mesh>

            {/* EXPANDING PULSE RING */}
            <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.2, 0.28, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                    toneMapped={false}
                />
            </mesh>

            {/* STATIC BASE RING */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.12, 0.18, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                    toneMapped={false}
                />
            </mesh>

            {/* VERTICAL INDICATOR LINES - 4 surrounding beams */}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.cos(angle) * 0.25,
                        0.4,
                        Math.sin(angle) * 0.25
                    ]}
                >
                    <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={isSelected ? 0.8 : hovered ? 0.6 : 0.4}
                        toneMapped={false}
                    />
                </mesh>
            ))}

            {/* TOP CAP - Small sphere */}
            <mesh position={[0, 0.8, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>

            {/* HOLOGRAPHIC DATA DISC */}
            {(isSelected || hovered) && (
                <mesh position={[0, 0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.4, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.3}
                        side={THREE.DoubleSide}
                        toneMapped={false}
                    />
                </mesh>
            )}

            {/* NAME AND CATEGORY LABELS */}
            {(isSelected || hovered) && (
                <group position={[0, 1.2, 0]}>
                    <Suspense fallback={null}>
                        {/* Name */}
                        <Text
                            position={[0, 0.15, 0]}
                            fontSize={0.22}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
                            outlineWidth={0.02}
                            outlineColor="#000000"
                        >
                            {person.name}
                        </Text>
                        {/* Category badge */}
                        <Text
                            position={[0, -0.1, 0]}
                            fontSize={0.13}
                            color={color}
                            anchorX="center"
                            anchorY="middle"
                            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
                            outlineWidth={0.01}
                            outlineColor="#000000"
                        >
                            {person.category}
                        </Text>
                    </Suspense>
                </group>
            )}
        </group>
    );
}
