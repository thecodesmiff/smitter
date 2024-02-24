import styles from './SmeetForm.module.css';

export default function SmeetForm() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.smeetform_container}>
                    <div className={styles.smeetform_top}>
                        <form id="smeet">
                            <textarea 
                                name="smeetContent" 
                                id="smeetcontent" 
                                cols="60" 
                                rows="10"
                                placeholder='What is happening?!'    
                            >
                            </textarea>
                        </form>
                    </div>
                    <div className={styles.smeetform_bottom}>
                        <div className={styles.smeetform_options}>
                            <p>side one</p>
                        </div>
                        <div className={styles.smeetform_submit}>
                            <p>side two</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}