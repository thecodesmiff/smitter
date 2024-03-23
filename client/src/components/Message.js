import styles from './Messages.module.css';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import GetUserInfo from '../functions/GetUserInfo';
import { HiOutlineArrowSmallLeft,
        HiOutlineChevronDoubleUp,
        HiOutlineChevronDoubleDown
} from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

export default function Messages() {
    const [cookie, setCookie] = useCookies();
    const userName = cookie.UserName;
    const [userInfo, setUserInfo] = useState();
    const [openDrawer, setOpenDrawer] = useState(false); 

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const showDrawer = ()  => {
        !openDrawer ? setOpenDrawer(true) : setOpenDrawer(false);
    }

    useEffect(() => {
        GetUserInfo(userName).then(info => setUserInfo(info))
    }, [])


    if(!userInfo) {
        return(
            <>
                <p>Loading...</p>
            </>
        )
    }

    return(
        <>
        <div className={`${styles.container} ${styles[openDrawer]}`} onAnimationEnd={() => alert('hi')} >
            <div className={styles.outer}>
                <div className={styles.profileHeader}>
                    <div className={styles.left}>
                        <div className={styles.headerLeft}>
                            <HiOutlineArrowSmallLeft className={styles.backArrow} onClick={goBack} />
                        </div>
                        <div className={styles.headerRight}>
                            <h4>{userInfo.display_name}</h4>
                            <p>@{userInfo.username}</p>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.action}>
                            {!openDrawer ? 
                            <HiOutlineChevronDoubleUp onClick={showDrawer} /> :
                            <HiOutlineChevronDoubleDown onClick={showDrawer} />
                            }
                        </div>
                    </div>
                </div>
                <div className={!openDrawer ? `${styles.hidden}` : `${styles.messages}`} >
                    <div className={styles.rightText}>
                        <p>This is random text</p>
                    </div>
                    <div className={styles.leftText}>
                        <p>This is random response text</p>
                    </div>
                    <div className={styles.rightText}>
                        <p>This is random text</p>
                    </div>
                    <div className={styles.leftText}>
                        <p>This is random response text</p>
                    </div>
                    <div className={styles.rightText}>
                        <p>This is random text</p>
                    </div>
                    <div className={styles.leftText}>
                        <p>This is random response text</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}