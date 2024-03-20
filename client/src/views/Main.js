import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import SideNav from "../components/SideNav";
import Post from "../components/Post";
import ProfileHeader from "../components/ProfileHeader";
import Profile from "./Profile";
import { Outlet } from "react-router-dom";
import FormModal from '../components/FormModal';




export default function Main({ showModal, setShowModal, setSmeetList }) {

    // const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const userName = cookie.UserName;
    const authToken = cookie.AuthToken


    


    return (
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
                    <SideNav setShowModal={setShowModal} showModal={showModal} setSmeetList={setSmeetList}/>
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
                {showModal && <FormModal setShowModal={setShowModal} setSmeetList={setSmeetList}  />}
            </div>
        </>
    )

}