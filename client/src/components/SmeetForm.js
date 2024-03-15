import { useRef, useState } from 'react';
import styles from './SmeetForm.module.css';
// import { GoHome, GoImage } from 'react-icons/go';
import { HiOutlineGif,
         HiOutlineListBullet,
         HiOutlineFaceSmile,
         HiOutlinePhoto
} from 'react-icons/hi2';
import CharCount from './CharCount';
import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import GifPicker from './GifPicker';
import { FileDrop } from 'react-file-drop';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function SmeetForm({ setShowModal }) {

    const [smeetText, setSmeetText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const [images, setImages] = useState();
    const [gifs, setGifs] = useState();
    const username = cookie.UserName;

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

    const handleSubmission =  async (e) => {
        e.preventDefault();
        const date = new Date();
        
        const info = {
            content: smeetText,
            date: date,
            username: username,
            image: images,
            gif: gifs
        }

        const response =  await fetch(`http://localhost:8000/uploadSmeet`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })      

        await response.json();
        setSmeetText('');
        refreshPage();
        // window.location.reload();
    }


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

    const onFileInputChange = async (e) => {
        const { files } = e.target;

        e.preventDefault();
        setIsUploading(false);
        setIsUploading(true);
        const imgData = new FormData();
        imgData.append('cover', files[0]);
        const response = await fetch(`http://localhost:8000/uploadPostImg`, {
            method: 'POST',
            body: imgData
        })

        const info = await response.json();
        setImages(info[0].location);
        // .then(() => {
        //     setIsUploading(false);
        //     console.log(files[0]);
        // });
    }

    const fileInputRef = useRef(null);

    const onTargetClick= ()  => {
        fileInputRef.current.click();
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.smeetform_container}>
                    {/* <span onClick={() => setShowModal(false)}>X</span> */}
                    <div className={styles.smeetform_top}>
                        <form id="smeet" onSubmit={handleSubmission}>
                            <textarea 
                                // name="smeetContent" 
                                id="smeetcontent" 
                                cols="40" 
                                rows="3"
                                placeholder='What is happening?!'
                                maxLength='240'  
                                onChange={(e)=> {setSmeetText(e.target.value)}} 
                                onClick={() => {setShowEmojiPicker(false)}} 
                                value={smeetText}
                            >
                            </textarea>
                            <FileDrop
                                onTargetClick={onTargetClick}
                            >
                                

                            <input 
                                type="file"
                                id="file-input"
                                className={styles.file}
                                accept=".jpg, .png"
                                ref={fileInputRef}
                                onChange={onFileInputChange}
                            />
                            </FileDrop>
                            {images && <div>
                                    <img src={images} alt="" style={{height: '100%', width: '100%'}}/>
                                </div>}
                            {gifs && <div>
                                    <img src={gifs} alt="" style={{height: '100%', width: '100%'}} />
                                </div>}
                        </form>
                    </div>
                    <div className={styles.smeetform_bottom}>
                        <div className={styles.smeetform_options}>
                            <div className={styles.options_left}>
                                <label for='file-input'>
                                    <HiOutlinePhoto className={styles.homeIcon} />
                                </label>
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
                        setGifs={setGifs}
                    />
                </div> }
            </div>
        </>
    )
}