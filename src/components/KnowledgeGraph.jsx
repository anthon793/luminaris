import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

/**
 * Force-Directed Graph Node
 * Represents a single legend in the knowledge graph
 */
function GraphNode({ node, isHovered, isSelected, onClick, onHover }) {
    const ref = useRef();
    const velocity = useRef(new THREE.Vector3());

    useFrame(() => {
        if (!ref.current) return;

        // Apply velocity (physics simulation)
        ref.current.position.add(velocity.current);

        // Damping
        velocity.current.multiplyScalar(0.85);

        // Smoothly scale based on state
        const targetScale = isSelected ? 1.8 : isHovered ? 1.3 : 1;
        ref.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        );
    });

    return (
        <group
            ref={ref}
            position={[node.x, node.y, node.z]}
            onClick={(e) => {
                e.stopPropagation();
                onClick(node.data);
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                onHover(node.data);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                onHover(null);
                document.body.style.cursor = 'auto';
            }}
        >
            {/* Core sphere */}
            <mesh>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color={node.color}
                    emissive={node.color}
                    emissiveIntensity={isSelected ? 1.5 : isHovered ? 1 : 0.6}
                    toneMapped={false}
                />
            </mesh>

            {/* Glow halo */}
            <mesh scale={[1.8, 1.8, 1.8]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial
                    color={node.color}
                    transparent
                    opacity={isSelected ? 0.4 : isHovered ? 0.3 : 0.15}
                    toneMapped={false}
                />
            </mesh>

            {/* Label */}
            {(isHovered || isSelected) && (
                <Text
                    position={[0, 0.3, 0]}
                    fontSize={0.15}
                    color="white"
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.01}
                    outlineColor="black"
                >
                    {node.data.name}
                </Text>
            )}
        </group>
    );
}

/**
 * Connection Line between nodes
 */
function ConnectionLine({ start, end, color }) {
    const points = [
        new THREE.Vector3(start.x, start.y, start.z),
        new THREE.Vector3(end.x, end.y, end.z)
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.15} />
        </line>
    );
}

/**
 * Main Knowledge Graph Component
 */
export function KnowledgeGraph({ people, onSelect, selectedId, setHoveredPerson, hoveredId }) {
    const groupRef = useRef();

    // Create graph nodes with force-directed layout
    const { nodes, connections, clusters } = useMemo(() => {
        // Group by category
        const categoryGroups = {};
        people.forEach(person => {
            if (!categoryGroups[person.category]) {
                categoryGroups[person.category] = [];
            }
            categoryGroups[person.category].push(person);
        });

        // Category colors and positions
        const categoryConfig = {
            'Politics & Leadership': { color: '#f59e0b', x: -6, y: 2, z: 0 },
            'Warfare & Strategy': { color: '#ef4444', x: 0, y: 4, z: -2 },
            'Philosophy & Education': { color: '#a855f7', x: 6, y: 2, z: 0 },
            'Science & Mathematics': { color: '#06b6d4', x: -4, y: -2, z: 2 },
            'Medicine': { color: '#10b981', x: 0, y: -4, z: 0 },
            'Religion & Spirituality': { color: '#f59e0b', x: 4, y: -2, z: -2 },
            'Arts & Literature': { color: '#ec4899', x: 2, y: 0, z: 3 },
            'Exploration & Geography': { color: '#14b8a6', x: -2, y: 0, z: -3 }
        };

        const graphNodes = [];
        const graphConnections = [];
        const clusterData = [];

        Object.entries(categoryGroups).forEach(([category, legends]) => {
            const config = categoryConfig[category] || { color: '#06b6d4', x: 0, y: 0, z: 0 };

            // Create cluster
            clusterData.push({
                name: category,
                color: config.color,
                center: new THREE.Vector3(config.x, config.y, config.z),
                count: legends.length
            });

            // Position nodes in cluster
            legends.forEach((legend, index) => {
                const angle = (index / legends.length) * Math.PI * 2;
                const radius = Math.sqrt(legends.length) * 0.5;

                graphNodes.push({
                    id: legend.id,
                    data: legend,
                    x: config.x + Math.cos(angle) * radius,
                    y: config.y + Math.sin(angle) * radius,
                    z: config.z + (Math.random() - 0.5) * 2,
                    color: config.color,
                    category
                });
            });

            // Create connections within cluster
            for (let i = 0; i < legends.length; i++) {
                const nextIndex = (i + 1) % legends.length;
                if (Math.random() < 0.3) { // 30% connection probability
                    graphConnections.push({
                        start: graphNodes[graphNodes.length - legends.length + i],
                        end: graphNodes[graphNodes.length - legends.length + nextIndex],
                        color: config.color
                    });
                }
            }
        });

        return { nodes: graphNodes, connections: graphConnections, clusters: clusterData };
    }, [people]);

    // Rotate the entire graph slowly
    useFrame((state, delta) => {
        if (groupRef.current && !selectedId) {
            groupRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Ambient lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />

            {/* Cluster labels (category names) */}
            {clusters.map((cluster, i) => (
                <Text
                    key={i}
                    position={[cluster.center.x, cluster.center.y + 2, cluster.center.z]}
                    fontSize={0.4}
                    color={cluster.color}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="black"
                >
                    {cluster.name.toUpperCase()}
                </Text>
            ))}

            {/* Connection lines */}
            {connections.map((conn, i) => (
                <ConnectionLine
                    key={i}
                    start={conn.start}
                    end={conn.end}
                    color={conn.color}
                />
            ))}

            {/* Graph nodes */}
            {nodes.map(node => (
                <GraphNode
                    key={node.id}
                    node={node}
                    isHovered={hoveredId === node.id}
                    isSelected={selectedId === node.id}
                    onClick={onSelect}
                    onHover={setHoveredPerson}
                />
            ))}
        </group>
    );
}
