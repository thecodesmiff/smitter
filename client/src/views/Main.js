import { useState } from "react";
import SmeetForm from "../components/SmeetForm";
// import styles from './Main.module.css';
// import { HiOutlineMagnifyingGlass,
//          HiOutlineHome,
//          HiOutlineBell,
//          HiOutlineEnvelope,
//          HiOutlineUser
// } from "react-icons/hi2";
import { useCookies } from "react-cookie";
import ProfileHeader from "../components/ProfileHeader";
import SideNav from "../components/SideNav";
import Profile from "./Profile";

export default function Main() {

    const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);

    const signOut = () => {
        console.log('signout');
        removeCookie('Email');
        removeCookie('AuthToken');

        window.location.reload();
    }

    return (
        <>
            <div className="mainContainer">
                <div className="navSection">
                    <SideNav setShowModal={setShowModal} signOut={signOut} />
                </div>

                <div className="mainFeed">
                    {/* <ProfileHeader /> */}
                    <Profile />
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