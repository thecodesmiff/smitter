import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';
import ProfileHeader from "../components/ProfileHeader";
import SideNav from "../components/SideNav";
import FormModal from "../components/FormModal";
import Post from '../components/Post';



export default function Profile() {

    const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const userName = cookie.UserName;
    const authToken = cookie.AuthToken;
    const [smeets, setSmeets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState([]);


    const getData = async () => {
        try{
            const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets/${userName}`);
            const json = await response.json();
            setSmeets(json);
            setLoading(false);
        } catch(err) {
            console.error(err)
        }
    }

    const getUserInfo = async () => {
        try {
            const userInfo = await fetch(`${process.env.REACT_APP_SERVERURL}/info/${userName}`);
            const json = await userInfo.json();
            setUserInfo(json);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
        getUserInfo();
    }, []);


    if(loading) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    } return (
        <>
            <ProfileHeader userInfo={userInfo} userName={userName} />
            {smeets && smeets.map((post) => <Post key={post.id} userInfo={userInfo} smeets={post} userName={userName} />)}
            {showModal && <FormModal setShowModal={setShowModal} showModal={showModal} />}
        </>
    )
}