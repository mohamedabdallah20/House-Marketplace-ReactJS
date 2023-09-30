import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Offers from './pages/Offers'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword'
import NavBar from './components/layout/NavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Category from './pages/Category'
import CreatingList from './pages/CreatingList'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreatingList />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <NavBar />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
