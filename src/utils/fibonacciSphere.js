/**
 * Fibonacci Sphere Algorithm
 * Distributes points evenly across a sphere surface
 */
export function generateFibonacciSpherePoints(count, radius = 5) {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        // Convert to lat/lng for reference
        const lat = Math.asin(y) * (180 / Math.PI);
        const lng = Math.atan2(z, x) * (180 / Math.PI);

        points.push({
            x: x * radius,
            y: y * radius,
            z: z * radius,
            lat,
            lng
        });
    }

    return points;
}

/**
 * Distribute legends evenly using Fibonacci sphere
 * Maintains original order while preventing clustering
 */
export function distributeLegends(legends) {
    const points = generateFibonacciSpherePoints(legends.length, 5.05);

    return legends.map((legend, index) => ({
        ...legend,
        // Override lat/lng with evenly distributed positions
        distributedLat: points[index].lat,
        distributedLng: points[index].lng,
        // Keep original for reference
        originalLat: legend.lat,
        originalLng: legend.lng
    }));
}
