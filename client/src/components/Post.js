
import styles from './Post.module.css';
import { HiOutlineChatBubbleOvalLeft,
    HiOutlineArrowPathRoundedSquare,
         HiOutlineHeart,
         HiOutlineBookmark,
         HiOutlineArrowUpTray
} from "react-icons/hi2";

export default function Post({ smeets, userInfo }) {

    const {id, smeet, date} = smeets;
    const { username, display_name } = userInfo;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.postContainer}>
                    <div className={styles.avatar}>
                        <div className={styles.img}></div>
                    </div>
                    <div className={styles.postHeader}>
                        <div className={styles.postHeaderContainer}>    
                            <h4>{display_name}</h4>
                            <p>@{username}</p>
                        </div>
                    </div>
                    <div className={styles.postBody}>
                        <p>{smeet}</p>
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