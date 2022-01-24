import {useState, useEffect} from 'react';
import { AuthProvider } from './context/UserContext';
import Auth from "./pages/Auth"
import Navigation from './routes/Navigation';
import './App.scss'

function App() {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    getTokenLocalStorage();
  }, []);

  const TOKEN = "token";

  const getTokenLocalStorage = () => {
    const tokenLocal = localStorage.getItem(TOKEN);
    setToken(tokenLocal);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setToken(null);
};

  return (
    <AuthProvider>
      {!token ? <Auth className='auth' setToken={setToken} /> : <Navigation logout={logout}/>}
    </AuthProvider>
  );
}

export default App;
