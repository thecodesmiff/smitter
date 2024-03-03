import { useState } from 'react';
import styles from './SmeetForm.module.css';
// import { GoHome, GoImage } from 'react-icons/go';
import { HiOutlineGif,
         HiOutlinePhoto,
         HiOutlineHome,
         HiOutlineListBullet,
         HiOutlineFaceSmile,
} from 'react-icons/hi2';
import CharCount from './CharCount';


export default function SmeetForm({ setShowModal }) {

    const [smeetText, setSmeetText] = useState("");


    return (
        <>
            <div className={styles.container}>
                <div className={styles.smeetform_container}>
                    <span onClick={() => setShowModal(false)}>X</span>
                    <div className={styles.smeetform_top}>
                        <form id="smeet">
                            <textarea 
                                name="smeetContent" 
                                id="smeetcontent" 
                                cols="42" 
                                rows="7"
                                placeholder='What is happening?!'
                                maxLength='240'  
                                onChange={(e)=> {setSmeetText(e.target.value)}}  
                            >
                            </textarea>
                        </form>
                    </div>
                    <div className={styles.smeetform_bottom}>
                        <div className={styles.smeetform_options}>
                            <div className={styles.options_left}>
                                <HiOutlinePhoto className={styles.homeIcon} />
                                <HiOutlineGif className={styles.homeIcon} />
                                <HiOutlineListBullet className={styles.homeIcon} />
                                <HiOutlineFaceSmile className={styles.homeIcon} />
                            </div>
                            <div className={styles.options_right}>
                                {smeetText && <CharCount smeetText={smeetText} maxLength={240} />}
                            </div>
                        </div>
                        <div className={styles.smeetform_submit}>
                            <div className={styles.button}>Post</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}