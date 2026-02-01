import React, { useState, useMemo } from 'react';
import { Experience } from './components/Experience';
import { UI } from './components/UI';
import { legends, categories } from './data/legends';
import { distributeLegends } from './utils/fibonacciSphere';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredPerson, setHoveredPerson] = useState(null);
  const [category, setCategory] = useState('All');
  const [viewMode, setViewMode] = useState('globe'); // 'globe', 'galaxy', 'timeline'
  const [searchQuery, setSearchQuery] = useState('');

  // Distribute legends evenly across the globe
  const distributedLegends = useMemo(() => distributeLegends(legends), []);

  const filteredPeople = useMemo(() => {
    return distributedLegends.filter(p => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, searchQuery, distributedLegends]);

  // Auto-select when search narrows to one result
  React.useEffect(() => {
    if (searchQuery.trim() && filteredPeople.length === 1) {
      setSelectedId(filteredPeople[0].id);
    } else if (!searchQuery.trim() && selectedId) {
      // Clear selection when search is cleared
      setSelectedId(null);
    }
  }, [filteredPeople, searchQuery]);

  const selectedPerson = useMemo(() =>
    legends.find(p => p.id === selectedId),
    [selectedId]
  );

  return (
    <>
      <Experience
        people={filteredPeople}
        onSelect={(p) => setSelectedId(p.id)}
        selectedId={selectedId}
        setHoveredPerson={setHoveredPerson}
        viewMode={viewMode}
      />
      <UI
        selectedPerson={selectedPerson}
        hoveredPerson={hoveredPerson}
        onCloseInfo={() => setSelectedId(null)}
        categories={categories}
        currentCategory={category}
        onSetCategory={setCategory}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
    </>
  );
}

export default App;
