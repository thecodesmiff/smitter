import { useState, useEffect } from 'react';
import Cover from "./Cover";
import styles from './EditProfile.module.css';
import { FileDrop } from 'react-file-drop';


export default function EditProfile({setShowEdit, userInfo}) {

    const  [isFileNearby, setIsFileNearby] = useState(true);
    const [isFileOver, setIsFileOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const username = userInfo.username;
    const [displayName, setDisplayName] = useState(userInfo.display_name);
    const [coverImg, setCoverImg] = useState(userInfo.cover);
    const [biography, setBiography] = useState(userInfo.bio);
    const [avatarImg, setAvatarImg] = useState(userInfo.avatar);
    const [location, setLocation] = useState(userInfo.location);
    const [website, setWebsite] = useState(userInfo.website);


    const updateImage = async (files, e) => {
        e.preventDefault();
        setIsFileOver(false);
        setIsUploading(false);
        setIsUploading(true);
        const data = new FormData();
        data.append('avatar', files[0]);
        const response = await fetch(`http://localhost:8000/uploadAvatar/${username}`, {
            method: 'POST',
            body: data
        })

        const imgData = await response.json();
        setAvatarImg(imgData[0].location)
    }

    const updateInfo =  (e) => {
        e.preventDefault();
        
        const info = {
            display_name : displayName,
            bio: biography,
            location: location,
            website: website
        }

        const response =  fetch(`http://localhost:8000/profile/edit/${username}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })      
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.editContainer}>

                <div className={styles.profileHeader}>
                    <div className={styles.headerLeft} onClick={()=> setShowEdit(false)}>
                        X
                    </div>
                    <div className={styles.headerRight}>
                        <h3>Edit Profile</h3>
                        <button form="updateForm" onClick={updateInfo}>Save</button>
                    </div>
                </div>
                {/* <img src="http://placekitten.com/600/200" alt="" className={styles.headerImg} /> */}
                <Cover />
                <FileDrop
                    onDrop={updateImage}
                    onDragOver={() => setIsFileOver(true)}
                    onDragLeave={() => setIsFileOver(false)}
                    onFrameDragEnter={() => setIsFileNearby(true)}
                    onFrameDragLeave={() => setIsFileNearby(false)}
                >
                <div className={styles.profileImg} >
                    <img src={avatarImg} alt="" />
                </div>
                </FileDrop>
                <div className={styles.profileForm}>
                    <form action="" id="updateForm">
                        <input type="text" placeholder="Name" onChange={(e) => setDisplayName(e.target.value)} value={displayName}></input><br/>
                        <textarea name="" id="" cols="8" rows="2" placeholder="Bio" onChange={(e) => setBiography(e.target.value)} value={biography}></textarea> <br />
                        <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} value={location} /><br />
                        <input type="text" placeholder="Website" onChange={(e) => setWebsite(e.target.value)} value={website} />
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}