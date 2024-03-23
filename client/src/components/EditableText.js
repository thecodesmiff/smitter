import { useState } from 'react';
import styles from './EditableText.module.css';

export default function EditableText({ initialText }) {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);

    const handleDoubleClick = () => {
        setIsEditing(true);
    }

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleBlur = () => {
        setIsEditing(false);
    }

    console.log(text)

    return (
        <div className={styles.billy} onDoubleClick={handleDoubleClick}>
            {handleChange.length > 0 && <p>Biscuits</p>}
            {isEditing ? (
                <input 
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />) : (
                    <span>{text}</span>
            )}
        </div>
    )
}