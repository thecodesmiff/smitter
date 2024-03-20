
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
import { useParams, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import getUserInfo from '../functions/GetUserInfo';



export default function ProfileHeader({ thisUser, userInfo, userName}) {


    const [smeetTotal, setSmeetTotal] = useState();
    // const [isUser, setIsUser] = useState(false);
    // const { smeetUser } = useParams();
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUser, setIsUser] = useState(false);

  



    const userCheck = () => {
        userName === thisUser ? setIsUser(true) : setIsUser(false);
    }


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }


    const getCount = async () => {
        try{
            const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeetcount/${thisUser}`);
            const json = await response.json();
            setSmeetTotal(json.count);
        } catch(err) {
            console.error(err);
        }
    };

    
    useEffect(() => {
        getCount()
}, []);



    return (
        <>
        {userInfo &&
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    <div className={styles.headerLeft}>
                        <HiOutlineArrowSmallLeft className={styles.backArrow} onClick={goBack} />
                    </div>
                    <div className={styles.headerRight}>
                        {isUser ? <h4>{userInfo.display_name}</h4> :  <h4>{userInfo.display_name}</h4>}
                        <p>{smeetTotal} posts</p>
                    </div>
                </div>
                {/* <img src="http://placekitten.com/600/200" alt="" className={styles.headerImg} /> */}
                <Cover username={thisUser} cover={userInfo.cover} />
                <div className={styles.profileImg}>
                    <img src={userInfo.avatar} alt="" />
                </div>
                <div className={styles.profileDetailsContainer}>
                    {thisUser !== userName ? 
                    <div className={styles.userProfileMenu}>
                            <HiOutlineEllipsisHorizontal  className={styles.moreButton}/>
                            <HiOutlineEnvelope className={styles.envelope} />
                            <HiOutlineBell className={styles.notification} />
                        <p className={styles.followButton} onClick={() => setShowEdit(true)}>Follow?</p>
                        {showEdit && <EditProfile userInfo={userInfo} setShowEdit={setShowEdit} />}
                    </div>
                        :
                    <div className={styles.profileMenu}>
                        <p className={styles.followButton} onClick={() => setShowEdit(true)}>Edit Profile</p>
                        {showEdit && <EditProfile userInfo={userInfo} setShowEdit={setShowEdit} />}
                    </div>
                        }  
                    <div className={styles.displayName}>
                        <h4>{userInfo.display_name}</h4>
                        <p>@{thisUser}</p>
                    </div>
                    <div className={styles.profileDetails}>
                        <div className={styles.bio}>
                            <p>{userInfo.bio}</p>
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
}
        </>
    )
}