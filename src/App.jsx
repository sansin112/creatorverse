import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import './App.css'

function App() {
  // Define our URL paths and connect them to our custom page components
  let element = useRoutes([
    {
      path: "/",
      element: <ShowCreators />
    },
    {
      path: "/new",
      element: <AddCreator />
    },
    {
      path: "/edit/:id", // :id is a dynamic parameter for editing a specific creator
      element: <EditCreator />
    },
    {
      path: "/view/:id", // :id allows us to look up a single specific creator
      element: <ViewCreator />
    }
  ]);

  return (
    <div className="App">
      {/* Simple Navigation Header bar that stays on every single page */}
      <header style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ margin: 0 }}>💫 Creatorverse :D</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/new">➕ Add a Creator</Link>
        </nav>
      </header>

      {/* The main content area where the pages will swap out depending on the URL */}
      <main style={{ padding: '20px' }}>
        {element}
      </main>
    </div>
  )
}

export default App