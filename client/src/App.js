import './App.css';
import Auth from './components/Auth';
import Main from './views/Main';
import { useCookies } from 'react-cookie';


function App() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookie.Email;
  const authToken = cookie.AuthToken;
  const userName = cookie.UserName;
 

  return (
    <div className="App">
      {!authToken && <Auth />}
      {authToken && <Main  />}
    </div>
  );
}

export default App;