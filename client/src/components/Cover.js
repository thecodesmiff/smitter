import { FileDrop } from 'react-file-drop';
import styles from './Cover.module.css';
import { useState } from 'react';

export default function Cover({ username, cover }) {

    const  [isFileNearby, setIsFileNearby] = useState(true);
    const [isFileOver, setIsFileOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [src, setSrc] = useState('');


    const updateImage = (files, e) => {
        e.preventDefault();
        setIsFileOver(false);
        setIsUploading(false);
        setIsUploading(true);
        const data = new FormData();
        data.append('cover', files[0]);
        fetch(`http://localhost:8000/uploadCover/${username}`, {
            method: 'POST',
            body: data
        }).then(() => {
            setIsUploading(false);
        });
    }

    return(
        <>
                <FileDrop
                    onDrop={updateImage}
                    onDragOver={() => setIsFileOver(true)}
                    onDragLeave={() => setIsFileOver(false)}
                    onFrameDragEnter={() => setIsFileNearby(true)}
                    onFrameDragLeave={() => setIsFileNearby(false)}
                >

            <div className={styles.coverContainer}>
                {isUploading ? 'upload' : ''}
                <img src={cover} alt="" />
            </div>
                </FileDrop>
        </>
    )
}