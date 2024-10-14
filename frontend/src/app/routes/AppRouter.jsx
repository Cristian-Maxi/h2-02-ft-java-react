import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Partidos from '../pages/Partidos';
import ScoutPlayers from '../pages/ScoutPlayers';
import Divisiones from '../pages/Divisiones';
import Predictions from '../pages/Predictions';
import PrivateRoute from '../routes/PrivateRoute';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Anidamos /predictions dentro de /partidos */}
        <Route path="/partidos" element={<Partidos />}>
          <Route path="predictions" element={<Predictions />} />
        </Route>

        <Route path="/scout-players" element={<ScoutPlayers />} />
        <Route path="/divisiones" element={<Divisiones />} />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
