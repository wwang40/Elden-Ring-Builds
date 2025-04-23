// pages/BuildDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

function BuildDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBuild() {
      try {
        const { data, error } = await supabase
          .from('builds')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setBuild(data);
      } catch (err) {
        setError('Failed to fetch build');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadBuild();
  }, [id]);

  const getBuildFocus = () => {
    if (!build) return '';
    
    const stats = {
      'Physical': build.strength + build.dexterity,
      'Magic': build.intelligence,
      'Faith': build.faith,
      'Mixed': build.intelligence + build.faith + build.arcane
    };
    
    let maxStat = 'Physical';
    for (const stat in stats) {
      if (stats[stat] > stats[maxStat]) {
        maxStat = stat;
      }
    }
    
    return maxStat;
  };

  if (loading) return <div>Loading build details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!build) return <div>Build not found</div>;

  return (
    <div className="build-details">
      <h1>{build.name}</h1>
      <div className="build-focus">
        <h3>Build Focus: {getBuildFocus()}</h3>
      </div>
      
      <div className="attribute-details">
        <h2>Attributes</h2>
        <div className="attribute-grid">
          <div className="attribute-item">
            <strong>Vigor:</strong> {build.vigor}
          </div>
          <div className="attribute-item">
            <strong>Mind:</strong> {build.mind}
          </div>
          <div className="attribute-item">
            <strong>Endurance:</strong> {build.endurance}
          </div>
          <div className="attribute-item">
            <strong>Strength:</strong> {build.strength}
          </div>
          <div className="attribute-item">
            <strong>Dexterity:</strong> {build.dexterity}
          </div>
          <div className="attribute-item">
            <strong>Intelligence:</strong> {build.intelligence}
          </div>
          <div className="attribute-item">
            <strong>Faith:</strong> {build.faith}
          </div>
          <div className="attribute-item">
            <strong>Arcane:</strong> {build.arcane}
          </div>
        </div>
      </div>
      
      {build.notes && (
        <div className="build-notes">
          <h2>Notes</h2>
          <p>{build.notes}</p>
        </div>
      )}
      
      <div className="recommended-equipment">
        <h2>Recommended Equipment</h2>
        {getBuildFocus() === 'Physical' && (
          <p>Consider using weapons that scale with Strength/Dexterity like Greatswords or Katanas.</p>
        )}
        {getBuildFocus() === 'Magic' && (
          <p>Consider using staffs and weapons that scale with Intelligence like Moonveil.</p>
        )}
        {getBuildFocus() === 'Faith' && (
          <p>Consider using seals and weapons that scale with Faith like Godslayer's Greatsword.</p>
        )}
        {getBuildFocus() === 'Mixed' && (
          <p>Consider using hybrid weapons that scale with multiple attributes like Dark Moon Greatsword.</p>
        )}
      </div>
      
      <div className="build-actions">
        <Link to={`/edit/${build.id}`}>
          <button>Edit Build</button>
        </Link>
        <Link to="/">
          <button>Back to Builds</button>
        </Link>
      </div>
    </div>
  );
}

export default BuildDetails;