import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import styles from './PageHeader.module.css';

export default function PageHeader({ type }) {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return(
        <>
            <div className={styles.profileHeader}>
                    <div className={styles.headerLeft}>
                        <HiOutlineArrowSmallLeft className={styles.backArrow} onClick={goBack} />
                    </div>
                    <div className={styles.headerRight}>
                        <h4>{type}</h4>
                    </div>
                </div>
        </>
    )
}