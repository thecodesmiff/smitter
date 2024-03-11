import { 
         HiOutlineTrash
} from "react-icons/hi2";
import styles from './PostOptions.module.css';

export default function PostOptions({ setShowOption, smeetId }) {

    const deleteTweet = async () => {
        try {
            const response = await fetch(`http://localhost:8000/deleteSmeet/${smeetId}`, {
                method: 'POST'
            });
            setShowOption(false);
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <>
            <div className={styles.optionsModal}>
                            <ul>
                                <li onClick={deleteTweet}><HiOutlineTrash />Delete Tweet</li>
                            </ul>
                        </div>
        </>
    )
}