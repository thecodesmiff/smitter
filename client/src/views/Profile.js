import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';
import ProfileHeader from "../components/ProfileHeader";
import FormModal from "../components/FormModal";
import Post from '../components/Post';
import { useParams, useLocation } from 'react-router-dom';
import getUserSmeets from '../functions/GetUserSmeets'
import GetUserInfo from "../functions/GetUserInfo";



export default function Profile({ userSmeets, socket, user }) {

    const thisUser = useLocation().pathname.split('/')[1];
    const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const userName = cookie.UserName;
    const authToken = cookie.AuthToken;
    const [loading, setLoading] = useState(true);
    const [smeetList, setSmeetList] = useState([]);
    const { smeetUser } = useParams();
    const [userInfo, setUserInfo] = useState();

    const getUserInfo = async () => {
        try {
            const userInfo = await fetch(`${process.env.REACT_APP_SERVERURL}/info/${thisUser}`);
            const json = await userInfo.json();
            setUserInfo(json);
        } catch(err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getUserSmeets(thisUser).then((smeets) => setSmeetList(smeets))
        GetUserInfo(thisUser).then(info => setUserInfo(info))
    }, [])



    return (
        <>
            <ProfileHeader userInfo={userInfo} userName={userName} thisUser={thisUser} smeets={smeetList[0]}/>
            {smeetList && smeetList.map((post) => <Post key={post.id} userInfo={userInfo} smeets={post} userName={userName} setShowModal={setShowModal} socket={socket} user={user} />)}
        </>
    )
}