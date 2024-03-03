import { useState } from "react";
import SmeetForm from "../components/SmeetForm";
import styles from './Main.module.css';
import { HiOutlineMagnifyingGlass,
         HiOutlineHome,
         HiOutlineBell,
         HiOutlineEnvelope,
         HiOutlineUser
} from "react-icons/hi2";

export default function Main() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* <h2>This is  a placeholder</h2>
            <button onClick={() => setShowModal(true)}>Open</button>
            {showModal && <SmeetForm setShowModal={setShowModal} />} */}
            <div className={styles.container}>
                <div className={styles.navSection}>
                    <div className={styles.nav}>
                    <div className={styles.logo}>X</div>
                        <div>
                            <HiOutlineHome className={styles.icon} />
                            <span>Home</span>
                        </div>
                        <div>
                            <HiOutlineMagnifyingGlass className={styles.icon} />
                            <span>Explore</span>
                        </div>
                        <div>
                            <HiOutlineBell className={styles.icon} />
                            <span>Notifications</span>
                        </div>
                        <div>
                            <HiOutlineEnvelope className={styles.icon} />
                            <span>Messages</span>
                        </div>
                        <div>
                            <HiOutlineUser className={styles.icon} />
                            <span>Profile</span>
                        </div>
                    <div className={styles.makePost}>
                        <button onClick={() => setShowModal(true)}>Post</button>
                    </div>
                    </div>
                    <div className={styles.userStuff}>

                    </div>
                </div>
                <div className={styles.mainFeed}>
                    
                </div>
                <div className={styles.trendSection}>

                </div>
            </div>
            {showModal && <SmeetForm setShowModal={setShowModal} />}
        </>
    )
}