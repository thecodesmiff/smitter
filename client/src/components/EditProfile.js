import { useState, useEffect } from 'react';
import Cover from "./Cover";
import styles from './EditProfile.module.css';
import { FileDrop } from 'react-file-drop';
import { useNavigate } from 'react-router-dom';


export default function EditProfile({setShowEdit, userInfo}) {

    const [isFileNearby, setIsFileNearby] = useState(true);
    const [isFileOver, setIsFileOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const username = userInfo.username;
    const [displayName, setDisplayName] = useState(userInfo.display_name);
    const [cover, setCover] = useState(userInfo.cover);
    const [biography, setBiography] = useState(userInfo.bio);
    const [avatarImg, setAvatarImg] = useState(userInfo.avatar);
    const [location, setLocation] = useState(userInfo.location);
    const [website, setWebsite] = useState(userInfo.website);
    const [color, setColor ] = useState();
    const [nameFocus, setNameFocus] = useState(false);
    const [bioFocus, setBioFocus] = useState(false);
    const [locationFocus, setLocationFocus] = useState(false);
    const [webFocus, setWebFocus] = useState(false);
    
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

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
        refreshPage();
    }

    // const changeFocus = () => {
    //     !onFocus ? setOnFocus(true) : setOnFocus(false);
    //     if(onFocus) {
    //         setColor('Blue')
    //     } else {
    //         setColor('Gray');
    //     }
    // }

    const handleOnFocus = (type) => {
        switch(type) {
            case 'name':
                setNameFocus(true)
                break;
            case 'bio':
                setBioFocus(true)
                break;
            case 'location':
                setLocationFocus(true)
                break;
            case 'website':
                setWebFocus(true)
                break;
            default:
                
        }        
    }

    const handleOnBlur = (type) => {
        switch(type) {
            case 'name':
                setNameFocus(false)
                break;
            case 'bio':
                setBioFocus(false)
                break;
            case 'location':
                setLocationFocus(false)
                break;
            case 'website':
                setWebFocus(false)
                break;
            default:
                
        }
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
                    {/* <img src={coverImg} alt="" className={styles.headerImg} /> */}
                <Cover cover={cover} />
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
                        {/* <EditableText initialText="Samuel" /> */}
                        <div className={styles.billy} style={nameFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className={styles.fieldInfo}>
                                {displayName.length > 0 || nameFocus ? <p style={nameFocus ? {color: '#1D99EC'}: {color: '#777'}}>Name</p> : ''}
                                {nameFocus && <p>{displayName.length}/50</p>}
                            </div>
                            <input type="text" placeholder="Name" onChange={(e) => setDisplayName(e.target.value)} onFocus={() => handleOnFocus('name')} onBlur={() => handleOnBlur('name')} value={displayName} />
                        </div>
                        <br />
                        <div className={styles.billy} style={bioFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className={styles.fieldInfo}>
                                {biography.length > 0 || bioFocus ? <p style={bioFocus ? {color: '#1D99EC'}: {color: '#777'}}>Bio</p> : ''}
                                {bioFocus && <p>{biography.length}/160</p>}
                            </div>
                            <textarea name="" id="" cols="8" rows="2" placeholder="Bio" onChange={(e) => setBiography(e.target.value)} onFocus={() => handleOnFocus('bio')} onBlur={() => handleOnBlur('bio')} value={biography}></textarea>
                        </div>
                        <br />
                        <div className={styles.billy} style={locationFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className={styles.fieldInfo}>
                                {location.length > 0 || locationFocus ? <p style={locationFocus ? {color: '#1D99EC'}: {color: '#777'}}>Location</p> : ''}
                                {locationFocus && <p>{location.length}/30</p>}
                            </div>
                            <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} onFocus={() => handleOnFocus('location')} onBlur={() => handleOnBlur('location')} value={location} />
                        </div>
                        <br />
                        <div className={styles.billy} style={webFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className={styles.fieldInfo}>
                                {website.length > 0 || webFocus ? <p style={webFocus ? {color: '#1D99EC'}: {color: '#777'}}>Website</p> : ''}
                                {webFocus && <p>{website.length}/100</p>}
                            </div>
                            <input type="text" placeholder="Website" onChange={(e) => setWebsite(e.target.value)} onFocus={() => handleOnFocus('website')} onBlur={() => handleOnBlur('website')} value={website} />
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}