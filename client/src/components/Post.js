
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
import { Link, useNavigate } from 'react-router-dom';
import EditSmeet from './EditSmeet';
import GetLikes from '../functions/GetLikes';
import socket from '../components/Socket';

export default function Post({ userName, smeets, user }) {

    const {id, smeet, date, tweetimg, username, tweetgif, display_name, avatar} = smeets;
    // const {cover, bio, location, website } = userInfo;
    const [showOption, setShowOption] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    // const [likedByUser, setLikedByUser] = useState(false);
    // const [liked, setLiked] = useState(false);
    // const initialCount = 0;

    const toggleOption = () => {
        !showOption ? setShowOption(true) : setShowOption(false);
    }

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

    const handleAction = async (type) => {
        // const data = {
        //     smeetid: id,
        //     username: username,
        //     likedby: userName
        // }

        // const sendLike = await fetch(`${process.env.REACT_APP_SERVERURL}/sendLike/${id}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })

        // const followUp = await sendLike.json();
        // refreshPage();


        socket.emit("sendNotification", {
            senderName: userName,
            receiverName: username,
            type,
        })
    }



    useEffect(() => {
        GetLikes(id).then(count => setLikeCount(count.count));
    }, [])


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

                        <div className={styles.interactionContainer}>
                            <HiOutlineChatBubbleOvalLeft  className={`${styles.icon} ${styles.chatBubble}`} onClick={() => handleAction('comment')} />
                            <p>0</p>    
                        </div>
                        <div className={styles.interactionContainer}>
                            <HiOutlineArrowPathRoundedSquare className={`${styles.icon} ${styles.arrows}`} /> 
                            <p>0</p>    
                        </div>
                        <div className={styles.interactionContainer}>
                            <HiOutlineHeart className={`${styles.icon} ${styles.heart}`} onClick={() => handleAction('like')} /> 
                            <p>{likeCount}</p>    
                        </div>
                        <div className={styles.interactionContainer}>
                            <HiOutlineBookmark className={styles.icon} /> 
                            <p>0</p>    
                        </div>
                        <div className={styles.interactionContainer}>
                            <HiOutlineArrowUpTray className={styles.icon} /> 
                            <p>0</p>    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}