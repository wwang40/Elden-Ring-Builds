import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AttributeSelector from '../components/AttributeSelector';
import supabase from '../supabaseClient';

function EditBuild() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [buildData, setBuildData] = useState(null);
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
        setBuildData(data);
      } catch (err) {
        setError('Failed to fetch build');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadBuild();
  }, [id]);

  const handleAttributeChange = (attribute, value) => {
    setBuildData(prev => ({
      ...prev,
      [attribute]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('builds')
        .update(buildData)
        .eq('id', id);
        
      if (error) throw error;
      navigate(`/build/${id}`);
    } catch (err) {
      console.error('Error updating build:', err);
      alert('Failed to update build. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this build?')) {
      try {
        const { error } = await supabase
          .from('builds')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        navigate('/');
      } catch (err) {
        console.error('Error deleting build:', err);
        alert('Failed to delete build. Please try again.');
      }
    }
  };

  if (loading) return <div>Loading build data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!buildData) return <div>Build not found</div>;

  return (
    <div className="edit-build">
      <h1>Edit Build: {buildData.name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Build Name</label>
          <input
            type="text"
            id="name"
            value={buildData.name}
            onChange={(e) => setBuildData({...buildData, name: e.target.value})}
            required
          />
        </div>
        
        <div className="attribute-section">
          <h2>Attributes</h2>
          <AttributeSelector 
            attribute="vigor" 
            value={buildData.vigor} 
            onChange={(value) => handleAttributeChange('vigor', value)} 
          />
          <AttributeSelector 
            attribute="mind" 
            value={buildData.mind} 
            onChange={(value) => handleAttributeChange('mind', value)} 
          />
          <AttributeSelector 
            attribute="endurance" 
            value={buildData.endurance} 
            onChange={(value) => handleAttributeChange('endurance', value)} 
          />
          <AttributeSelector 
            attribute="strength" 
            value={buildData.strength} 
            onChange={(value) => handleAttributeChange('strength', value)} 
          />
          <AttributeSelector 
            attribute="dexterity" 
            value={buildData.dexterity} 
            onChange={(value) => handleAttributeChange('dexterity', value)} 
          />
          <AttributeSelector 
            attribute="intelligence" 
            value={buildData.intelligence} 
            onChange={(value) => handleAttributeChange('intelligence', value)} 
          />
          <AttributeSelector 
            attribute="faith" 
            value={buildData.faith} 
            onChange={(value) => handleAttributeChange('faith', value)} 
          />
          <AttributeSelector 
            attribute="arcane" 
            value={buildData.arcane} 
            onChange={(value) => handleAttributeChange('arcane', value)} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Build Notes</label>
          <textarea
            id="notes"
            value={buildData.notes}
            onChange={(e) => setBuildData({...buildData, notes: e.target.value})}
            rows="4"
          />
        </div>
        
        <div className="buttons-container">
          <button type="submit">Update Build</button>
          <button type="button" className="btn-delete" onClick={handleDelete}>Delete Build</button>
        </div>
      </form>
    </div>
  );
}

export default EditBuild;