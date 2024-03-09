import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';
import ProfileHeader from "../components/ProfileHeader";
import SideNav from "../components/SideNav";
import SmeetForm from "../components/SmeetForm";
import Post from '../components/Post';


export default function Profile() {

    const [showModal, setShowModal] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const userName = cookie.UserName;
    const authToken = cookie.AuthToken;
    const [smeets, setSmeets] = useState(null);
    const [loading, setLoading] = useState(true);


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

    useEffect(() => {
        getData();
    }, []);

    if(loading) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    } return (
        <>
            <div className="mainContainer">
                <div className="navSection">
                    {/* <SideNav setShowModal={setShowModal} /> */}
                </div>
                <div className="mainFeed">
                    {/* <ProfileHeader userName={userName} />
                    {smeets && smeets.map((post) => <Post key={post.id} userName={userName} smeets={post} />)} */}
                </div>
                <div className="trendSection">

                </div>
                {showModal && <SmeetForm setShowModal={setShowModal} />}
            </div>
        </>
    )
}