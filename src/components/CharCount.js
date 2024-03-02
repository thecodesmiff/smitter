import styles from './CharCount.module.css';

export default function CharCount({ smeetText, maxLength }) {

    let progressValue = (smeetText.length/maxLength) * 100;
    let charsLeft = maxLength - smeetText.length;
    let countColor = '';

    switch(true) {
        case charsLeft === 0:
            countColor = 'red'
            break;
        case charsLeft <= 20:
            countColor = 'yellow'
            break;
        default:
            countColor = '#1D99EC'

    }


    return (
        <div>
            <div className={styles.charContainer}>
                <div className={styles.charProgress} style={{
                    background: `conic-gradient(${countColor} ${progressValue * 3.6}deg,
                        #333333 ${progressValue * 3.6}deg`
                }}>
                    <div className={styles.countdown}>{charsLeft <= 20 ? charsLeft : ""}</div>
                </div>
            </div>
        </div>
    )
}