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
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const authToken = cookie.AuthToken;
  const userName = cookie.UserName;
  const [showModal, setShowModal] = useState(false);
  const [smeetList, setSmeetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  const getData = async () => {
    try{
        const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets`);
        const json = await response.json();
        setSmeetList(json);
        setLoading(false);
    } catch(err) {
        console.error(err)
    }
}

const getUserInfo = async () => {
  try {
      const userInfo = await fetch(`${process.env.REACT_APP_SERVERURL}/info/${userName}`);
      const json = await userInfo.json();
      setUserInfo(json);
  } catch(err) {
      console.log(err);
  }
}


useEffect(() => {
  getData();
  getUserInfo();
}, [])

  const router = 
    createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<Main showModal={showModal} setShowModal={setShowModal} smeetList={smeetList} setSmeetList={setSmeetList}/>}>,
        <Route path='/' element={<PostList userName={userName} />} />
        <Route path={`/${userName}`} element={<Profile />} />
        <Route path='/:username' element={<Profile />} />
        <Route path='/settings/profile' element={<EditProfile/>} />
        <Route path='/smeet/edit/:id' element={<EditSmeet />} />
      </Route>
    ))

    if(loading) {
      return(
        <>
          <p>Loading...</p>
        </>
      )
    }

  return (
    <div className="App">
      {!authToken && <Auth />}
      {authToken && <RouterProvider router={router} />}
    </div>
  );
}

export default App;