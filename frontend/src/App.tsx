// import { useState } from 'react'
import Layout from './layouts/Layout.tsx'
import Register from './pages/Register.tsx'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import SignIn from './pages/SignIn.tsx'
import AddHotel from './pages/AddHotel.tsx'
import { useAppContext } from './contexts/AppContext.tsx'
import MyHotels from './pages/MyHotels.tsx'
import EditHotel from './pages/EditHotel.tsx'
import Search from './pages/Search.tsx'
import Detail from './pages/Details.tsx'
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p><Search/></p></Layout>} />
        <Route path="/search" element={<Layout><Search></Search></Layout>} />
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/register" element={<Layout><Register></Register></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>}></Route>
        <Route path="/detail/:hotelId" element={<Layout><Detail /></Layout>}/>
        {isLoggedIn &&
          (<>
            <Route path="/hotel/:hotelId/booking" element={<Layout><Booking /></Layout>}/>
            <Route path="/my-hotels" element={<Layout><MyHotels></MyHotels></Layout>}></Route>
            <Route path="/add-hotel" element={<Layout><AddHotel></AddHotel></Layout>}></Route>
            <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel></EditHotel></Layout>}></Route>
            <Route path="/my-bookings" element={<Layout><MyBookings /></Layout>}/>
          </>)}
      </Routes>
    </Router>
  )
}

export default App
