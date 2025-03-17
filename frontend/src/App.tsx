// import { useState } from 'react'
import Layout from './layouts/Layout.tsx'
import Register from './pages/Register.tsx'
import { BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
 } from 'react-router-dom'
import SignIn from './pages/SignIn.tsx'
import AddHotel from './pages/AddHotel.tsx'
import { useAppContext } from './contexts/AppContext.tsx'
import MyHotels from './pages/MyHotels.tsx'

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}/> 
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>}/>
        <Route path="*" element={<div>asdfff</div>}/>
        <Route path="/register" element={<Layout><Register></Register></Layout>}/>
        <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>}></Route>
        {isLoggedIn && 
        (<>
          <Route path="/my-hotels" element={<Layout><MyHotels></MyHotels></Layout>}></Route>
          <Route path="/add-hotel" element={<Layout><AddHotel></AddHotel></Layout>}></Route>
        </>)}
      </Routes>
    </Router>
  )
}

export default App
