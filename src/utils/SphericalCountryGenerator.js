import * as THREE from 'three';

/**
 * Spherical Voronoi Partitioning Algorithm
 * Divides a sphere into country-like regions using seed points
 */

export class SphericalCountryGenerator {
    constructor(radius = 5, numCountries = 30, segments = 64) {
        this.radius = radius;
        this.numCountries = numCountries;
        this.segments = segments;
        this.seedPoints = [];
        this.countries = [];
        this.borderLines = [];
    }

    /**
     * Generate random seed points on sphere surface using Fibonacci sphere
     * This ensures even distribution across the globe
     */
    generateSeedPoints() {
        this.seedPoints = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < this.numCountries; i++) {
            const y = 1 - (i / (this.numCountries - 1)) * 2; // y from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            this.seedPoints.push(new THREE.Vector3(x, y, z).multiplyScalar(this.radius));
        }
    }

    /**
     * Compute which country (seed) each vertex belongs to
     * Uses geodesic distance (arc length on sphere surface)
     */
    assignVerticesToCountries(geometry) {
        const positions = geometry.attributes.position.array;
        const vertexCount = positions.length / 3;
        const assignments = new Array(vertexCount);

        for (let i = 0; i < vertexCount; i++) {
            const vertex = new THREE.Vector3(
                positions[i * 3],
                positions[i * 3 + 1],
                positions[i * 3 + 2]
            );

            // Find nearest seed point using angular distance
            let minDistance = Infinity;
            let assignedCountry = 0;

            for (let j = 0; j < this.seedPoints.length; j++) {
                // Angular distance (geodesic on unit sphere)
                const angle = vertex.angleTo(this.seedPoints[j]);
                if (angle < minDistance) {
                    minDistance = angle;
                    assignedCountry = j;
                }
            }

            assignments[i] = assignedCountry;
        }

        return assignments;
    }

    /**
     * Find border edges between different countries
     */
    findBorders(geometry, assignments) {
        const borders = [];
        const index = geometry.index.array;
        const positions = geometry.attributes.position.array;

        // Check each triangle
        for (let i = 0; i < index.length; i += 3) {
            const i0 = index[i];
            const i1 = index[i + 1];
            const i2 = index[i + 2];

            const c0 = assignments[i0];
            const c1 = assignments[i1];
            const c2 = assignments[i2];

            // Check each edge of the triangle
            const edges = [
                [i0, i1, c0, c1],
                [i1, i2, c1, c2],
                [i2, i0, c2, c0]
            ];

            for (const [v0, v1, country0, country1] of edges) {
                // Border edge found
                if (country0 !== country1) {
                    const p0 = new THREE.Vector3(
                        positions[v0 * 3],
                        positions[v0 * 3 + 1],
                        positions[v0 * 3 + 2]
                    );
                    const p1 = new THREE.Vector3(
                        positions[v1 * 3],
                        positions[v1 * 3 + 1],
                        positions[v1 * 3 + 2]
                    );

                    // Slightly raise border above surface to avoid z-fighting
                    p0.multiplyScalar(1.002);
                    p1.multiplyScalar(1.002);

                    borders.push(p0, p1);
                }
            }
        }

        return borders;
    }

    /**
     * Generate country colors
     */
    generateCountryColors() {
        const colors = [];
        for (let i = 0; i < this.numCountries; i++) {
            // Generate pleasant, varied colors
            const hue = (i * 137.5) % 360; // Golden angle for good distribution
            const saturation = 0.4 + Math.random() * 0.3;
            const lightness = 0.4 + Math.random() * 0.2;

            const color = new THREE.Color().setHSL(hue / 360, saturation, lightness);
            colors.push(color);
        }
        return colors;
    }

    /**
     * Main generation function
     * Returns { geometry, borderLines, countryColors, assignments }
     */
    generate() {
        // 1. Generate seed points
        this.generateSeedPoints();

        // 2. Create sphere geometry
        const geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
        geometry.computeVertexNormals();

        // 3. Assign vertices to countries
        const assignments = this.assignVerticesToCountries(geometry);

        // 4. Color vertices by country
        const colors = this.generateCountryColors();
        const vertexColors = new Float32Array(assignments.length * 3);

        for (let i = 0; i < assignments.length; i++) {
            const color = colors[assignments[i]];
            vertexColors[i * 3] = color.r;
            vertexColors[i * 3 + 1] = color.g;
            vertexColors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('color', new THREE.BufferAttribute(vertexColors, 3));

        // 5. Find borders
        const borderPoints = this.findBorders(geometry, assignments);

        // 6. Create border line geometry
        const borderGeometry = new THREE.BufferGeometry();
        const borderPositions = new Float32Array(borderPoints.length * 3);

        for (let i = 0; i < borderPoints.length; i++) {
            borderPositions[i * 3] = borderPoints[i].x;
            borderPositions[i * 3 + 1] = borderPoints[i].y;
            borderPositions[i * 3 + 2] = borderPoints[i].z;
        }

        borderGeometry.setAttribute('position', new THREE.BufferAttribute(borderPositions, 3));

        return {
            geometry,
            borderGeometry,
            countryColors: colors,
            assignments,
            seedPoints: this.seedPoints
        };
    }
}
