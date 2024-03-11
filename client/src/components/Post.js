
import { useState, useEffect } from 'react';
import styles from './Post.module.css';
import { HiOutlineChatBubbleOvalLeft,
    HiOutlineArrowPathRoundedSquare,
         HiOutlineHeart,
         HiOutlineBookmark,
         HiOutlineArrowUpTray,
         HiOutlineEllipsisHorizontal,
         HiOutlineTrash
} from "react-icons/hi2";
import PostOptions from './PostOptions';

export default function Post({ userName, smeets, userInfo }) {

    const {id, smeet, date, tweetimg, username, tweetgif, display_name} = smeets;
    // const { display_name } = userInfo;
    const [showOption, setShowOption] = useState(false);

    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.postContainer} >
                       {showOption && <PostOptions setShowOption={setShowOption} smeetId={id} /> }
                    <div className={styles.avatar}>
                        <div className={styles.img}></div>
                    </div>
                    <div className={styles.postHeader}>
                        <div className={styles.postHeaderContainer}>    
                            <h4>{display_name}</h4>
                            <p>@{username}</p>
                        </div>
                        <div>
                            { userName === username && <HiOutlineEllipsisHorizontal onClick={() => setShowOption(true)}/>}
                        </div>
                    </div>
                    <div className={styles.postBody}>
                        <p>{smeet}</p>
                    </div>
                    <div>
                        <img src={tweetimg} alt="" />
                    </div>
                    <div>
                        <img src={tweetgif} alt="" />
                    </div>
                    <div className={styles.postFooter}>
                        <HiOutlineChatBubbleOvalLeft  className={`${styles.icon} ${styles.chatBubble}`} />
                        <HiOutlineArrowPathRoundedSquare className={`${styles.icon} ${styles.arrows}`} />
                        <HiOutlineHeart className={`${styles.icon} ${styles.heart}`} />
                        <HiOutlineBookmark className={styles.icon} />
                        <HiOutlineArrowUpTray className={styles.icon} />
                    </div>
                </div>
            </div>
        </>
    )
}