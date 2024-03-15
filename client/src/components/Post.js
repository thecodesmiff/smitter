
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
import { Link } from 'react-router-dom';
import EditSmeet from './EditSmeet';

export default function Post({ userName, smeets, userInfo, setShowModal }) {

    const {id, smeet, date, tweetimg, username, tweetgif, display_name, avatar} = smeets;
    // const {cover, bio, location, website } = userInfo;
    const [showOption, setShowOption] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const toggleOption = () => {
        !showOption ? setShowOption(true) : setShowOption(false);
    }

    const toggleEdit = () => {
        !showEdit ? setShowEdit(true) : setShowEdit(false);
    }
    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.postContainer}>
                    {showEdit && <EditSmeet setShowEdit={setShowEdit} />}
                    <div className={styles.avatar}>
                        {
                            avatar ?  <img src={avatar} alt="" className={styles.img} /> :
                            <img src="http://placehold.co/100x100" className={styles.img} />
                        }
                    </div>
                    <div className={styles.postHeader}>
                        <Link to={`/${username}`}>

                        <div className={styles.postHeaderContainer}>    
                            <h4>{display_name}</h4>
                            <p>@{username}</p>
                        </div>
                        </Link>
                        <div className={styles.options} onClick={toggleOption}>
                            { userName === username && <HiOutlineEllipsisHorizontal />}
                            {showOption && <PostOptions setShowOption={setShowOption} smeetId={id} /> }
                        </div>
                    </div>
                    <div className={styles.postBody}>
                        <p>{smeet}</p>
                    </div>
                    {tweetimg && <div>
                        <img src={tweetimg} alt="" />
                    </div>}
                    {tweetgif && <div>
                        <img src={tweetgif} alt="" />
                    </div>}
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