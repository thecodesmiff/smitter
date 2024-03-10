import { useState } from 'react';
import styles from './FormModal.module.css';
import  {   HiOutlineGif,
            HiOutlineListBullet,
            HiOutlineFaceSmile,
        } from 'react-icons/hi2';
import CharCount from './CharCount';
import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import GifPicker from './GifPicker';


export default function FormModal({ setShowModal }) {


    const [smeetText, setSmeetText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    // const [showModal, setShowModal] = useState(false);


    const addEmoji = (e) => {
        const symbol = e.unified.split("_");
        const codeArray = [];
        symbol.forEach((emoji) => codeArray.push("0x" + emoji));
        let emoji = String.fromCodePoint(...codeArray);
        setSmeetText(smeetText + emoji);
    }


    const toggleShowEmoji =  () => {
        showGifPicker ? setShowGifPicker(false) : setShowGifPicker(false);
        !showEmojiPicker ? setShowEmojiPicker(true) : setShowEmojiPicker(false);
    }

    const toggleShowGif =  () => {
        showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(false);
        !showGifPicker ? setShowGifPicker(true) : setShowGifPicker(false);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.smeetform_container}>
                    <span onClick={() => {setShowModal(false)}}>X</span>
                    <div className={styles.smeetform_top}>
                        <form id="smeet" action="">
                            <textarea 
                                name="smeetContent" 
                                id="smeetcontent" 
                                cols="38" 
                                rows="7"
                                placeholder='What is happening?!'
                                maxLength='240'  
                                onChange={(e)=> {setSmeetText(e.target.value)}} 
                                onClick={() => {setShowEmojiPicker(false)}} 
                                value={smeetText}
                            >
                            </textarea>
                            <input 
                                type="file"
                                id="file"
                                className={styles.file}
                                accept=".jpg, .png"
                            />
                        </form>
                    </div>
                    <div className={styles.smeetform_bottom}>
                        <div className={styles.smeetform_options}>
                            <div className={styles.options_left}>
                                <HiOutlineGif className={styles.homeIcon} onClick={(toggleShowGif)} />
                                <HiOutlineListBullet className={styles.homeIcon} />
                                <HiOutlineFaceSmile className={styles.homeIcon} onClick={(toggleShowEmoji)} />
                            </div>
                            <div className={styles.options_right}>
                                {smeetText && <CharCount smeetText={smeetText} maxLength={240} />}
                            </div>
                        </div>
                        <div className={styles.smeetform_submit}>
                            <button form="smeet" className={styles.button} type="submit">Post</button>
                        </div>
                    </div>
                </div>
                { showEmojiPicker && 
                <div className={styles.emojiStuff}>
                    <EmojiPicker 
                        data={data}
                        onEmojiSelect={addEmoji}
                    />
                </div> }
                { showGifPicker && 
                <div className={styles.emojiStuff}>
                    <GifPicker 
                        data={data}
                        onEmojiSelect={addEmoji}
                    />
                </div> }
            </div>
        </>
    )
}