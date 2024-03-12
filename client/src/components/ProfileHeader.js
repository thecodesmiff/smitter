
import { useState, useEffect } from 'react';
import Cover from './Cover';
import styles from './ProfileHeader.module.css';
import { HiOutlineArrowSmallLeft,
         HiOutlineEllipsisHorizontal,
         HiOutlineEnvelope,
         HiOutlineBell,
         HiOutlineMapPin,
         HiOutlineGift,
         HiOutlineCalendarDays
} from "react-icons/hi2";
import { useParams } from 'react-router-dom';
import EditProfile from './EditProfile';


export default function ProfileHeader({ userInfo, userName }) {

    const { username, cover, display_name, avatar, bio, location, website } = userInfo;
    const [smeetTotal, setSmeetTotal] = useState();
    const [isUser, setIsUser] = useState();
    const { smeetUser } = useParams();
    const [showEdit, setShowEdit] = useState(false)

    const userCheck = () => {
        username === smeetUser ? setIsUser(true) : setIsUser(false);
    }


    const getCount = async () => {
        try{
            const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeetcount/${username}`);
            const json = await response.json();
            setSmeetTotal(json.count);
        } catch(err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getCount();
        userCheck();
    });


    return (
        <>
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    <div className={styles.headerLeft}>
                        <HiOutlineArrowSmallLeft className={styles.backArrow} />
                    </div>
                    <div className={styles.headerRight}>
                        <h4>{display_name}</h4>
                        <p>{smeetTotal} posts</p>
                    </div>
                </div>
                {/* <img src="http://placekitten.com/600/200" alt="" className={styles.headerImg} /> */}
                <Cover username={username} cover={cover} />
                <div className={styles.profileImg}>
                    <img src={userInfo.avatar} alt="" />
                </div>
                <div className={styles.profileDetailsContainer}>
                    <div className={styles.profileMenu}>
                        {!isUser &&
                            <div>
                            <HiOutlineEllipsisHorizontal  className={styles.moreButton}/>
                            <HiOutlineEnvelope className={styles.envelope} />
                            <HiOutlineBell className={styles.notification} />
                            </div>
                        }
                        <p className={styles.followButton} onClick={() => setShowEdit(true)}>Following</p>
                        {showEdit && <EditProfile userInfo={userInfo} setShowEdit={setShowEdit} />}
                    </div>
                    <div className={styles.displayName}>
                        <h4>{display_name}</h4>
                        <p>@{username}</p>
                    </div>
                    <div className={styles.profileDetails}>
                        <div className={styles.bio}>
                            <p>{bio}</p>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.location}>
                                <HiOutlineMapPin /> 
                                <p>USA</p>
                            </div>
                            <div className={styles.birthday}>
                                <HiOutlineGift />
                                <p>Born June 27</p>
                            </div>
                            <div className={styles.joinDate}>
                                <HiOutlineCalendarDays />
                                <p>Joined February 2012</p>
                            </div>
                        </div>
                        <div className={styles.stats}>
                            <p><span>652</span> Following</p>
                            <p><span>1613</span> Followers</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}