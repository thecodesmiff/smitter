import { useCookies } from "react-cookie";
// import SideNav from "../components/SideNav";
import { useEffect, useState } from 'react';


export default function Profile() {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const authToken = cookies.AuthToken;
    const email = cookies.Email;
    const userName = cookies.UserName;
    const [smeets, setSmeets] = useState(null);


    const getData = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${userName}`);
            const json = await response.json();
            setSmeets(json);
            console.log(smeets)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if(authToken){
            getData()
        }
    }, []);


    return (
        <>
            <p>Wecome {userName}</p>
            {/* {smeets.map((smeet) => <p key={smeet.id}>{smeet.smeet}</p>)} */}
        </>
    )
}