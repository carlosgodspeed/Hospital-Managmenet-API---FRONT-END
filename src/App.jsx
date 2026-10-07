import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Compromissos from './pages/Compromissos/Compromissos';
import Notificacoes from './pages/Notificacoes/Notificacoes';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="compromissos" element={<Compromissos />} />
          <Route path="notificacoes" element={<Notificacoes />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
