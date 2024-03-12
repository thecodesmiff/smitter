import { useState, useEffect } from 'react';
import { HiOutlineMagnifyingGlass,
    HiOutlineHome,
    HiOutlineBell,
    HiOutlineEnvelope,
    HiOutlineUser,
    HiOutlineEllipsisHorizontal
} from "react-icons/hi2";
import SmeetForm from "./SmeetForm";
import { useCookies } from "react-cookie";
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css'

export default function SideNav({ showModal, setShowModal }) {

    const [cookie, setCookie, removeCookie] = useCookies(null);
    const username = cookie.UserName;
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);


    const signOut = () => {
        console.log('signout');
        removeCookie('Email');
        removeCookie('AuthToken');
        removeCookie('UserName');

        window.location.reload();
    }

    const getUserInfo = async () => {
        try{
            const info = await fetch(`${process.env.REACT_APP_SERVERURL}/info/${username}`)
            const result = await info.json();
            setUserInfo(result);
            setLoading(false);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    if(loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <>
            <div className={styles.nav}>
                <div className="logo">X</div>
                    <NavLink to='/'>
                <div className={styles.menuItems}>
                        <HiOutlineHome className={styles.icon} />
                        <span>Home</span>
                </div>
                    </NavLink>
                <div className={styles.menuItems}>
                    <HiOutlineMagnifyingGlass className={styles.icon} />
                    <span>Explore</span>
                </div>
                <div className={styles.menuItems}>
                    <HiOutlineBell className={styles.icon} />
                    <span>Notifications</span>
                </div>
                <div className={styles.menuItems}>
                    <HiOutlineEnvelope className={styles.icon} />
                    <span>Messages</span>
                </div>
                    <NavLink to={`/${cookie.UserName}`} reloadDocument >
                <div className={styles.menuItems}>
                        <HiOutlineUser className={styles.icon} />
                        <span>Profile</span>    
                </div>
                    </NavLink>
                <div className="makePost">
                    <button onClick={() => setShowModal(true)}>Post</button>
                </div>
            </div>
            <div className={styles.userStuff}>
                <div>
                    <div className={styles.accountMenu} onClick={signOut}>
                        <div className={styles.avatar}>
                            <img src={userInfo.avatar} alt="" />
                        </div>
                        <div className={styles.activeUser}>
                            <div className={styles.displayName}>{userInfo.display_name}</div>
                            <div className={styles.userN}>@{userInfo.username}</div>
                        </div>
                            <div><HiOutlineEllipsisHorizontal/></div>
                    </div>
                </div>
            </div>
            </>
    )
}