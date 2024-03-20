import { useState } from 'react';
import { 
         HiOutlineTrash
} from "react-icons/hi2";
import styles from './PostOptions.module.css';
import EditSmeet from './EditSmeet';
import {  Link, useNavigate } from 'react-router-dom';


export default function PostOptions({ setShowOption, smeetId }) {

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

    const [showEdit, setShowEdit] = useState(false);

    const deleteTweet = async () => {
        try {
            const response = await fetch(`http://localhost:8000/deleteSmeet/${smeetId}`, {
                method: 'POST'
            });
            setShowOption(false);
            refreshPage();

        } catch(err) {
            console.error(err);
        }
    }

    const openThings = () => {
        setShowEdit(true)
    }

    return(
        <>
            <div className={styles.optionsModal}>
                            {/* <ul>
                                <li onClick={deleteTweet}><HiOutlineTrash />Delete Tweet</li>
                                <li onClick={openThings}>Edit Tweet</li>
                                
                            </ul> */}
                            <div onClick={deleteTweet} style={{paddingBottom: '30px'}}><HiOutlineTrash />Delete Smeet</div>
                                <Link to={`/smeet/edit/${smeetId}`}>
                                <div>Edit Smeet</div>
                                </Link>
                        </div>
        </>
    )
}