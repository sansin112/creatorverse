import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ id, name, url, description, imageURL }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '15px 0', maxWidth: '400px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#414141'}}>{name}</h2>
      {imageURL && <img src={imageURL} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />}
      <br />
      <br />
      <p style={{ color: '#414141'}}>{description}</p>
      <br />
      <a href={url} target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '10px', color: '#007bff' }}>Visit Channel</a>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to={`/view/${id}`} style={{ padding: '5px 10px', background: '#e0e0e0', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>Details</Link>
        <Link to={`/edit/${id}`} style={{ padding: '5px 10px', background: '#ffc107', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>Edit</Link>
      </div>
    </div>
  )
}