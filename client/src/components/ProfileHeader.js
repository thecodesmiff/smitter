
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

export default function ProfileHeader({ userInfo }) {

    const { username, cover, display_name } = userInfo;
    const [smeetTotal, setSmeetTotal] = useState();

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
                    <img src="http://placekitten.com/100/100" alt="" />
                </div>
                <div className={styles.profileDetailsContainer}>
                    <div className={styles.profileMenu}>
                        <HiOutlineEllipsisHorizontal  className={styles.moreButton}/>
                        <HiOutlineEnvelope className={styles.envelope} />
                        <HiOutlineBell className={styles.notification} />
                        <p className={styles.followButton}>Following</p>
                    </div>
                    <div className={styles.displayName}>
                        <h4>{display_name}</h4>
                        <p>@{username}</p>
                    </div>
                    <div className={styles.profileDetails}>
                        <div className={styles.bio}>
                            <p>I've eaten nine birthday cakes and I still feel empty. He/Him. Sober AF.</p>
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