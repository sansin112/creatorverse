import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', url: '', description: '', imageURL: '' })

  useEffect(() => {
    const fetchCreatorToEdit = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Error fetching creator:', error)
      } else {
        setFormData({ name: data.name, url: data.url, description: data.description, imageURL: data.imageURL || '' })
      }
    }
    fetchCreatorToEdit()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id)

    if (error) {
      console.error('Error updating creator:', error)
    } else {
      navigate('/')
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this creator?")
    if (!confirmDelete) return

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting creator:', error)
    } else {
      navigate('/')
    }
  }

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>Modify Creator Information</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></label>
        <label>URL: <input type="url" name="url" value={formData.url} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></label>
        <label>Description: <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '8px', height: '80px' }} /></label>
        <label>Image URL: <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} style={{ width: '100%', padding: '8px' }} /></label>
        
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <button type="submit" style={{ flex: 1, padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update Details</button>
          <button type="button" onClick={handleDelete} style={{ flex: 1, padding: '10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete Creator</button>
        </div>
      </form>
    </div>
  )
}