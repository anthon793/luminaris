import React, { useState } from 'react';
import { Search, Globe, Grid, Clock, X, Filter, User, ExternalLink, Network } from 'lucide-react';
import { categoryColors } from '../data/legends';

export function UI({
    selectedPerson,
    onCloseInfo,
    categories,
    currentCategory,
    onSetCategory,
    viewMode,
    onSetViewMode,
    searchQuery,
    onSearch
}) {
    const [showFilters, setShowFilters] = useState(false);

    // Image handling state
    const [imgSrc, setImgSrc] = useState('');
    const [imgError, setImgError] = useState(false);
    const [lastPersonName, setLastPersonName] = useState(null);

    // Sync state immediately when person changes (prevents "stale image" flash)
    if (selectedPerson && selectedPerson.name !== lastPersonName) {
        setLastPersonName(selectedPerson.name);
        setImgSrc(selectedPerson.image);
        setImgError(false);
    }

    React.useEffect(() => {
        if (selectedPerson) {
            // Fetch official "Page Image" from Wikipedia API (Progressive Enhancement)
            const fetchWikiImage = async () => {
                try {
                    const searchName = selectedPerson.name;
                    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=300&origin=*&redirects=1`;

                    const response = await fetch(url);
                    const data = await response.json();
                    const pages = data.query.pages;
                    const pageId = Object.keys(pages)[0];

                    if (pages[pageId] && pages[pageId].thumbnail) {
                        const wikiUrl = pages[pageId].thumbnail.source;
                        // Try direct Wiki URL first (better quality)
                        console.log('Fetched official Wiki image:', wikiUrl);
                        setImgSrc(wikiUrl);
                    }
                } catch (err) {
                    console.log('Wiki API fetch failed, sticking to local data:', err);
                }
            };

            fetchWikiImage();
        }
    }, [selectedPerson]);

    const handleImageError = () => {
        // If already using proxy, give up and show fallback
        if (imgSrc.includes('wsrv.nl')) {
            console.log('All image sources failed.');
            setImgError(true);
            return;
        }

        // Otherwise, try proxying the current failing URL (whether it's local or wiki)
        const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(imgSrc)}&w=400&h=400&fit=cover`;
        console.log('Direct load failed, switching to proxy for:', imgSrc);
        setImgSrc(proxyUrl);
    };

    return (
        <div className="overlay">
            {/* Top Bar */}
            <div className="header-bar">
                <div className="brand-logo">
                    <h1 className="brand-title">LUMINARIS</h1>
                    <span className="brand-subtitle">Interactive Legends Database</span>
                </div>

                {/* Search */}
                <div className="search-bar">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search legends..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* View Toggles (Left) */}
            <div className="view-controls">
                <button
                    className={`view-btn ${viewMode === 'globe' ? 'active' : ''}`}
                    onClick={() => onSetViewMode('globe')}
                    title="Globe View"
                >
                    <Globe size={24} />
                </button>
                <button
                    className={`view-btn ${viewMode === 'graph' ? 'active' : ''}`}
                    onClick={() => onSetViewMode('graph')}
                    title="Knowledge Graph"
                >
                    <Network size={24} />
                </button>
                <button
                    className={`view-btn ${viewMode === 'galaxy' ? 'active' : ''}`}
                    onClick={() => onSetViewMode('galaxy')}
                    title="Galaxy View"
                >
                    <Grid size={24} />
                </button>
                <button
                    className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                    onClick={() => onSetViewMode('timeline')}
                    title="Timeline View"
                >
                    <Clock size={24} />
                </button>
            </div>

            {/* Categories (Right) */}
            <div className={`filter-panel ${showFilters ? 'open' : ''}`}>
                <button
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={20} />
                    {showFilters ? 'Hide Filters' : 'Filters'}
                </button>

                {showFilters && (
                    <div className="filter-list">
                        <button
                            className={`filter-btn ${currentCategory === 'All' ? 'active' : ''}`}
                            onClick={() => onSetCategory('All')}
                        >
                            <span className="dot" style={{ background: '#fff' }}></span>
                            All Types
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
                                onClick={() => onSetCategory(cat)}
                            >
                                <span className="dot" style={{ background: categoryColors[cat] || '#888' }}></span>
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Legend Card (Bottom) */}
            <div className={`legend-card ${selectedPerson ? 'visible' : ''}`}>
                {selectedPerson && (
                    <>
                        <button className="close-btn" onClick={onCloseInfo}>
                            <X size={24} />
                        </button>
                        <div className="card-content">
                            <div className="portrait-container" key={selectedPerson.name}>
                                {!imgError ? (
                                    <img
                                        src={imgSrc}
                                        alt={selectedPerson.name}
                                        className="portrait"
                                        referrerPolicy="no-referrer"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div className="portrait-fallback" style={{
                                        display: 'flex', // Force flex display on error state
                                        width: '100%',
                                        height: '100%',
                                        background: `linear-gradient(135deg, ${categoryColors[selectedPerson.category] || '#333'}, #000)`,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '5rem',
                                        fontWeight: 'bold',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontFamily: 'Exo 2'
                                    }}>
                                        {selectedPerson.name.charAt(0)}
                                    </div>
                                )}

                            </div>
                            <div className="info">
                                <div className="meta">
                                    <span className="category-tag" style={{
                                        borderColor: categoryColors[selectedPerson.category],
                                        color: categoryColors[selectedPerson.category]
                                    }}>
                                        {selectedPerson.category}
                                    </span>
                                    <span className="year">{selectedPerson.birth < 0 ? `${Math.abs(selectedPerson.birth)} BC` : selectedPerson.birth}</span>
                                </div>
                                <h2 className="name">{selectedPerson.name}</h2>
                                <h3 className="location">{selectedPerson.country}, {selectedPerson.continent}</h3>
                                <p className="bio">{selectedPerson.bio}</p>
                                <div className="achievement">
                                    <strong>🏆 Legacy:</strong> {selectedPerson.achievement}
                                </div>
                                <a
                                    href={`https://en.wikipedia.org/wiki/${selectedPerson.name.replace(/ /g, '_')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginTop: '1.5rem',
                                        padding: '0.6rem 1.2rem',
                                        background: 'rgba(6, 182, 212, 0.15)',
                                        border: '1px solid #06b6d4',
                                        borderRadius: '8px',
                                        color: '#06b6d4', // Neon cyan text
                                        textDecoration: 'none',
                                        fontFamily: 'Rajdhani',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#06b6d4';
                                        e.currentTarget.style.color = '#000';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                                        e.currentTarget.style.color = '#06b6d4';
                                    }}
                                >
                                    <ExternalLink size={16} />
                                    Read Full Biography
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Controls Info (Bottom Right) */}
            <div className="controls-info">
                <p>Left Click: Select</p>
                <p>Right Click: Pan</p>
                <p>Scroll: Zoom</p>
            </div>

        </div>
    );
}
