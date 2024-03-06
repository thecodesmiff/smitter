
import './App.css';
import Auth from './components/Auth';
import Main from './views/Main';
import { useCookies } from 'react-cookie';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  return (
    <div className="App">
      {!authToken && <Auth />}
      {authToken && <Main />}
    </div>
  );
}

export default App;
