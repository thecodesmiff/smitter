import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import SideNav from "../components/SideNav";
import Post from "../components/Post";
import ProfileHeader from "../components/ProfileHeader";
import Profile from "./Profile";
import { Outlet } from "react-router-dom";
import PostList from "../components/PostList";
import FormModal from '../components/FormModal';


export default function Main({ showModal, setShowModal }) {

    // const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const userName = cookie.UserName;
    const authToken = cookie.AuthToken
    const [smeets, setSmeets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState([]);

    const getData = async () => {
        try{
            const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets`)
            const json = await response.json();
            setSmeets(json);
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
    }, []);
    

    if(loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } return (
        // <>
        //     <div className="mainContainer">
        //         <div className="navSection">
        //             <SideNav setShowModal={setShowModal} showModal={showModal} />
        //         </div>

        //         <div className="mainFeed">
        //             <Outlet />
        //             {/* <PostList userName={userName} setShowModal={setShowModal} /> */}
        //             {/* {smeets && smeets.map((post) => <Post key={post.id} userInfo={userInfo} smeets={post} />)} */}
        //         </div>

        //         <div className="trendSection">
        //             <div style={{color: 'yellow'}}>
        //                 <h1>this is here</h1>
        //             </div>
        //         </div>
        //         {showModal && <FormModal setShowModal={setShowModal} />}
        //     </div>
        // </>
        <>
            <div className="mainContainer">
                <div className="navContainer">
                    <div className="nav">
                    <SideNav setShowModal={setShowModal} showModal={showModal} />
                    </div>
                </div>
                <div className="feedContainer">
                    <div className="feed">
                        <Outlet />
                    </div>
                </div>
                <div className="trendContainer">
                    <div className="trends">
                        <p>This is just a thing</p>
                    </div>
                </div>
                {showModal && <FormModal setShowModal={setShowModal} />}
            </div>
        </>
    )

}