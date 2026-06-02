import React, { useState, useEffect } from 'react'
import { supabase } from '../client'
import Card from '../components/Card'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
      
      if (error) {
        console.error('Error fetching creators:', error)
      } else {
        setCreators(data)
      }
    }
    fetchCreators()
  }, [])

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Centered Heading */}
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>All Creators</h2>
        
        {creators.length > 0 ? (
        /* 1. This container aligns everything in the middle and wraps columns */
        <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '30px', 
            width: '100%'
        }}>
            {creators.map((creator) => (
            /* 2. Each card wrapper is set to roughly 45% width to fit 2 per row side-by-side */
            <div key={creator.id} style={{ 
                flex: '1 1 calc(45% - 15px)', 
                maxWidth: '500px', 
                minWidth: '300px' 
            }}>
                <Card 
                key={creator.id}
                id={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageURL={creator.imageURL}
                />
            </div>
            ))}
        </div>
        ) : (
        <p style={{ textAlign: 'center' }}>No content creators found in the database yet. Click "Add a Creator" above to add your first one!</p>
        )}
    </div>
    )
}