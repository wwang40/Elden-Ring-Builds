import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';

function BuildsList() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBuilds();
  }, []);

  async function fetchBuilds() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBuilds(data || []);
    } catch (err) {
      setError('Failed to fetch builds');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading builds...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="builds-list">
      <h1>Your Elden Ring Builds</h1>
      <Link to="/create" className="create-link">
        <button>Create New Build</button>
      </Link>
      
      {builds.length === 0 ? (
        <p>No builds yet. Create your first build!</p>
      ) : (
        builds.map(build => (
          <div key={build.id} className="build-card">
            <h2>{build.name}</h2>
            <div className="build-attributes-summary">
              <p>Vigor: {build.vigor} | Mind: {build.mind} | Endurance: {build.endurance}</p>
              <p>Strength: {build.strength} | Dexterity: {build.dexterity}</p>
              <p>Intelligence: {build.intelligence} | Faith: {build.faith} | Arcane: {build.arcane}</p>
            </div>
            <div className="build-actions">
              <Link to={`/build/${build.id}`}>
                <button>View Details</button>
              </Link>
              <Link to={`/edit/${build.id}`}>
                <button>Edit Build</button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BuildsList;