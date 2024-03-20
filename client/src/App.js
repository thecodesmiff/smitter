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
import { useState, useEffect } from 'react';
import EditProfile from './components/EditProfile';
import EditSmeet from './components/EditSmeet';

function App() {
  const [cookie] = useCookies(null);
  const authToken = cookie.AuthToken;
  const userName = cookie.UserName;
  const [showModal, setShowModal] = useState(false);
  const [smeetList, setSmeetList] = useState([]);
  const [userSmeets, setUserSmeets] = useState([]);
  const [user, setUser] = useState('');

  const router = 
    createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<Main showModal={showModal} setShowModal={setShowModal} setSmeetList={setSmeetList}  userName={userName}/> }>,
        <Route path='/' element={<PostList userName={userName}  setSmeetList={setSmeetList} />} />
        <Route path='/:username' element={<Profile userSmeets={userSmeets} setUserSmeets={setUserSmeets} user={user} />} />
        <Route path='/settings/profile' element={<EditProfile/>} />
        <Route path='/smeet/edit/:id' element={<EditSmeet />} />
      </Route>
    ))

  //   useEffect(() =>  {
  //     // setSocket(io(`${process.env.REACT_APP_SERVERURL}`, { autoConnect: false}));
  //     socket.emit("newUser", userName)
  // }, [])


  return (
    <div className="App">
      {!authToken && <Auth />}
      {authToken && <RouterProvider router={router} />}
    </div>
  );
}

export default App;