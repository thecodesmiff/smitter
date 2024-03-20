import { useState, useEffect } from 'react';
import Post from "./Post";
import SmeetForm from './SmeetForm';
import getSmeets from '../functions/GetSmeets';


export default function PostList({ userName, setShowModal, smeetList, setSmeetList }) {
    const [smeets, setSmeets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();


    // const getData = async () => {
    //     try{
    //         const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets`)
    //         const json = await response.json();
    //         setSmeets(json);
    //         setLoading(false);
    //     } catch(err) {
    //         console.error(err)
    //     }
    // }

    // const getUserInfo = async () => {
    //     try {
    //         const userInfo = await fetch(`${process.env.REACT_APP_SERVERURL}/info/${userName}`);
    //         const json = await userInfo.json();
    //         setUserInfo(json);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }
    
    // useEffect(() => {
    //     getData();
    //     getUserInfo();
    // }, []);
    

    // if(loading) {
    //     return (
    //         <div>
    //             <p>Loading...</p>
    //         </div>
    //     )
    // }
useEffect(() => {
    getSmeets().then(smeets => setSmeets(smeets))
}, [])


    return (
        <>
            {/* {showModal && <FormModal setShowModal={setShowModal} setSmeetList={setSmeetList} />} */}
            <SmeetForm />
            {smeets && smeets.map((post) => <Post key={post.id} userName={userName} userInfo={userInfo} smeets={post} />)}
        </>
    )
}