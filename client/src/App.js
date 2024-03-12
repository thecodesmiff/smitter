import './App.css';
import Auth from './components/Auth';
import Main from './views/Main';
import { useCookies } from 'react-cookie';
import Profile from './views/Profile';
import  { Route,
          RouterProvider,
          createBrowserRouter,
          createRoutesFromElements
        } from 'react-router-dom';
import PostList from './components/PostList';
import { useState } from 'react';
import EditProfile from './components/EditProfile';


function App() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const authToken = cookie.AuthToken;
  const userName = cookie.UserName;
  const [showModal, setShowModal] = useState(false);

  const router = 
    createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<Main showModal={showModal} setShowModal={setShowModal}/>}>,
        <Route path='/' element={<PostList userName={userName} />} />
        <Route path='/:smeetUser' element={<Profile/>} />
        <Route path='/settings/profile' element={<EditProfile/>} />
      </Route>
    ))

  return (
    <div className="App">
      {!authToken && <Auth />}
      {authToken && <RouterProvider router={router} />}
    </div>
  );
}

export default App;