import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';
import ProfileHeader from "../components/ProfileHeader";
import FormModal from "../components/FormModal";
import Post from '../components/Post';
import { useParams, useLocation } from 'react-router-dom';



export default function Profile() {

    const thisUser = useLocation().pathname.split('/')[1];
    const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const userName = cookie.UserName;
    const authToken = cookie.AuthToken;
    const [loading, setLoading] = useState(true);
    const [smeetList, setSmeetList] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const { smeetUser } = useParams();

    const getData = async () => {
        try{
            const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/smeets/${thisUser}`);
            const json = await response.json();
            setSmeetList(json);
            setLoading(false);
        } catch(err) {
            console.error(err)
        }
    }

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
            <ProfileHeader userInfo={userInfo} userName={userName} thisUser={thisUser} />
            {smeetList && smeetList.map((post) => <Post key={post.id} userInfo={userInfo} smeets={post} userName={userName} setShowModal={setShowModal} />)}
        </>
    )
}