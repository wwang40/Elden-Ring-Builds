import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AttributeSelector from '../components/AttributeSelector';
import supabase from '../supabaseClient';

function CreateBuild() {
  const navigate = useNavigate();
  
  const [buildData, setBuildData] = useState({
    name: '',
    vigor: 10,
    mind: 10,
    endurance: 10,
    strength: 10,
    dexterity: 10,
    intelligence: 10,
    faith: 10,
    arcane: 10,
    notes: ''
  });

  const handleAttributeChange = (attribute, value) => {
    setBuildData(prev => ({
      ...prev,
      [attribute]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('builds')
        .insert([buildData])
        .select();
        
      if (error) throw error;
      navigate(`/build/${data[0].id}`);
    } catch (err) {
      console.error('Error creating build:', err);
      alert('Failed to create build. Please try again.');
    }
  };

  return (
    <div className="create-build">
      <h1>Create New Elden Ring Build</h1>
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
        
        <button type="submit">Create Build</button>
      </form>
    </div>
  );
}

export default CreateBuild;