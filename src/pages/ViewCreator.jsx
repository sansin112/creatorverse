import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
  const fetchSingleCreator = async () => {
    // 1. Log to confirm the ID from the URL is exactly what we think it is
    console.log("Attempting to fetch UUID:", id);

    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id) // Matches your lowercase 'id' column against the string UUID
      .single();    // Tells Supabase we only expect exactly 1 row back
    
    if (error) {
      // 2. This will print the exact reason Supabase rejected the lookup
      console.error('Supabase View Error:', error.message);
    } else {
      // 3. This will print the data if it successfully found it
      console.log("Successfully found creator data:", data);
      setCreator(data);
    }
  }

  if (id) {
    fetchSingleCreator();
  }
}, [id]);

  if (!creator) return <p>Loading creator details...</p>

  return (
    <div style={{ maxWidth: '600px', margin: '20px 0' }}>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />}
      <h1>{creator.name}</h1>
      <p style={{ color: '#b6b6b6'}}>{creator.description}</p>
      <br />
      <a href={creator.url} target="_blank" rel="noreferrer" style={{ fontSize: '18px', color: '#007bff' }}>Go to Channel Page</a>
      <div style={{ marginTop: '20px' }}>
        <Link to={`/edit/${creator.id}`} style={{ padding: '8px 16px', background: '#ffc107', borderRadius: '4px', textDecoration: 'none', color: '#333', marginRight: '10px' }}>Edit This Creator</Link>
        <Link to="/" style={{ padding: '8px 16px', background: '#ccc', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>Back to Home</Link>
      </div>
    </div>
  )
}