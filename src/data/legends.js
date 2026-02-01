import historicalLegendsData from './historicalLegends.json';

// Transform the JSON data to match the expected format
export const legends = historicalLegendsData.map(legend => ({
    id: legend.id.toString(),
    name: legend.name,
    category: legend.category,
    country: legend.modern_country,
    lat: legend.lat,
    lng: legend.lng,
    bio: `${legend.short_description}. From the ${legend.ancient_origin} during the ${legend.era} era.`,
    achievement: legend.short_description,
    image: `https://en.wikipedia.org/wiki/${encodeURIComponent(legend.name)}#/media/File:` // Placeholder for Wikipedia image
}));

// COSMIC EXPLORER Category Colors
export const categoryColors = {
    'Politics & Leadership': '#00D9FF',      // Bright Cyan
    'Warfare & Strategy': '#FF3E9D',        // Hot Pink
    'Philosophy & Education': '#A855F7',    // Purple
    'Science & Mathematics': '#00FF88',     // Electric Green
    'Medicine': '#4ADE80',                  // Light Green
    'Religion & Spirituality': '#FB923C',   // Warm Orange
    'Arts & Literature': '#FFD700',         // Gold
    'Architecture & Engineering': '#818CF8', // Indigo
    'Exploration & Geography': '#22D3EE',   // Aqua
    'Default': '#00F0FF'                    // Cosmic Cyan
};

// Extract unique categories from the data
export const categories = ['All', ...new Set(legends.map(l => l.category))];
