// import { useState } from 'react'
import Layout from './layouts/Layout.tsx'
import Register from './pages/Register.tsx'
import { BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
 } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}/> 
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>}/>
        <Route path="*" element={<div>asdfff</div>}/>
        <Route path="/register" element={<Layout><Register></Register></Layout>}/>
      </Routes>
    </Router>
  )
}

export default App
