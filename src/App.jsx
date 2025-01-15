import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen.jsx";
import BookingScreen from "./screens/BookingScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx"
import LoginScreen from "./screens/LoginScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";

export default function App() {
  

  return (
      <div>
          <NavBar></NavBar>
          <BrowserRouter>
          <Routes>
                  <Route path="/home" element={<HomeScreen />}></Route>
                  <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />}></Route>
                  <Route path="/register" element={<RegisterScreen></RegisterScreen>}></Route>
                  <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
                  <Route path="/profile" element={<ProfileScreen></ProfileScreen>}></Route>
                  <Route path="/admin" element={<AdminScreen></AdminScreen>}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  )
}

