import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client.js'

export default function AddCreator() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', url: '', description: '', imageURL: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1. Submit button clicked! Form data ready:", formData);

    try {
        const { data, error } = await supabase
            .from('creators') // <-- Double-check that your Supabase table is exactly named 'creators'
            .insert([formData]);

        if (error) {
            console.error("2. Supabase error caught:", error.message);
            alert("Database error: " + error.message);
        } else {
            console.log("3. Success! Inserted into database. Navigating home...");
            navigate('/');
        }
    } catch (err) {
        console.error("4. Unexpected system error:", err);
    }
  }

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>Add a New Content Creator</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></label>
        <label>URL: <input type="url" name="url" value={formData.url} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></label>
        <label>Description: <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '8px', height: '80px' }} /></label>
        <label>Image URL: <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} style={{ width: '100%', padding: '8px' }} /></label>
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Creator</button>
      </form>
    </div>
  )
}