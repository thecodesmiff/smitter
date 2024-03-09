import { useState, useEffect } from "react";
import SmeetForm from "../components/SmeetForm";
import { useCookies } from "react-cookie";
import SideNav from "../components/SideNav";
import Post from "../components/Post";
import ProfileHeader from "../components/ProfileHeader";
import Profile from "./Profile";


export default function Main() {

    const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const userName = cookie.UserName;
    const authToken = cookie.AuthToken
    const [smeets, setSmeets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState([]);

    const getData = async () => {
        try{
            const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets/${userName}`);
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
            console.log('info:', json)
        } catch(err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getData()
        getUserInfo()
    }, []);

    if(loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } return (
        <>
            <div className="mainContainer">
                <div className="navSection">
                    <SideNav setShowModal={setShowModal} />
                </div>

                <div className="mainFeed">
                    <ProfileHeader userInfo={userInfo} />
                    {smeets && smeets.map((post) => <Post key={post.id} userInfo={userInfo} smeets={post} />)}
                    {/* {smeets && smeets.map((post) => {
                        return <div key={post.id}>
                            <p>{post.smeet}</p>
                        </div>
                    })} */}
                </div>

                <div className="trendSection">

                </div>
                {showModal && <SmeetForm setShowModal={setShowModal} />}
            </div>
        </>
    )

    // return (
    //     <>
    //         {/* <h2>This is  a placeholder</h2>
    //         <button onClick={() => setShowModal(true)}>Open</button>
    //         {showModal && <SmeetForm setShowModal={setShowModal} />} */}
    //         <div className="container">
    //             {/* <div className="navSection"> */}
    //                 <SideNav setShowModal={setShowModal} signOut={signOut} />
    //                 {/* <div className={styles.nav}>
    //                 <div className={styles.logo}>X</div>
    //                     <div>
    //                         <HiOutlineHome className={styles.icon} />
    //                         <span>Home</span>
    //                     </div>
    //                     <div>
    //                         <HiOutlineMagnifyingGlass className={styles.icon} />
    //                         <span>Explore</span>
    //                     </div>
    //                     <div>
    //                         <HiOutlineBell className={styles.icon} />
    //                         <span>Notifications</span>
    //                     </div>
    //                     <div>
    //                         <HiOutlineEnvelope className={styles.icon} />
    //                         <span>Messages</span>
    //                     </div>
    //                     <div>
    //                         <HiOutlineUser className={styles.icon} />
    //                         <span>Profile</span>
    //                     </div>
    //                 <div className={styles.makePost}>
    //                     <button onClick={() => setShowModal(true)}>Post</button>
    //                 </div>
    //                 <div>
    //                 <button className="signout" onClick={signOut}>SIGN OUT</button>
    //                 </div>
    //                 </div>
    //                 <div className={styles.userStuff}>

    //                 </div> */}
    //             </div>
    //             <div className="mainFeed">
    //                 <ProfileHeader />
    //             </div>
    //             <div className="trendSection">
    //                 <ProfileHeader />
    //             </div>
    //         {/* </div> */}
    //         {showModal && <SmeetForm setShowModal={setShowModal} />}
    //     </>
    // )
}