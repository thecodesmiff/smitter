import { useState, useRef, useEffect } from 'react';
import styles from './EditSmeet.module.css';
import  {   HiOutlineGif,
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
import { useLocation, useNavigate } from 'react-router-dom';


export default function EditSmeet() {

    const [smeets, setSmeets] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [smeetText, setSmeetText] = useState();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [cookie, setCookie] = useCookies(null);
    const [images, setImages] = useState();
    const [gifs, setGifs] = useState();
    const username = cookie.UserName;
    const location = useLocation();

    const locationURL = location.pathname.split('/');
    const tweetId = locationURL[3];

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }
    const closeEditPage = () => {
        navigate(-1);
    }


    const handleEditSub = async (e) => {
        e.preventDefault();
        
        const info = {
            smeet: smeetText,
            tweetimg: images,
            tweetgif: gifs
        }

        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/editsmeet/${tweetId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info),
        })
        const data = await response.json();
        closeEditPage();
        // refreshPage();
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

    }

    const fileInputRef = useRef(null);

    const onTargetClick= ()  => {
        fileInputRef.current.click();
    }

    const getSmeets = async () => {
        const smeet = await fetch(`${process.env.REACT_APP_SERVERURL}/getsmeet/${tweetId}`)
        const response = await smeet.json();
        setSmeets(response);
        setSmeetText(response.smeet)
        setIsLoading(false);
    }

    useEffect(() => {
        getSmeets();
    }, [])

    if(isLoading) {
        return(
            <>
                <p>loading...</p>
            </>
        )
    }


    return(
        <>
            <div className={styles.container}>
                <div className={styles.smeetform_container}>
                    <span onClick={() => {navigate(-1)}}>X</span>
                    <div className={styles.smeetform_top}>
                        <form id="smeet">
                            <textarea 
                                // name="smeetContent" 
                                id="smeetcontent" 
                                cols="40" 
                                rows="3"
                                // placeholder='What is happening?!'
                                maxLength='240'  
                                onChange={(e)=> setSmeetText(e.target.value)} 
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
                            {smeets.tweetimg && <div>
                                    <img src={smeets.tweetimg} alt="" style={{height: '100%', width: '100%'}}/>
                                </div>}
                            {smeets.tweetgif && <div>
                                    <img src={smeets.tweetgif} alt="" style={{height: '100%', width: '100%'}} />
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
                            <button form="smeet" className={styles.button} type="submit" onClick={handleEditSub}>Post</button>
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
                    </div>}
            </div>
        </>
    )
}