import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getSmeet from '../functions/GetSmeet';
import Post from './Post';
import PageHeader from './PageHeader';
import SmeetForm from './SmeetForm';

export default function PostPage() {

    const [smeets, setSmeets] = useState({})
    const id = useLocation().pathname.split('/')[3];

    useEffect(() => {
        getSmeet(id).then((smeet) => setSmeets(smeet));
    }, [])


    if(!smeets) {
        return(
            <>
                <p>Loading...</p>
            </>
        )
    }

    return (
        <>
            <PageHeader type='Post' />
            <Post smeets={smeets} type='Post' />
            <SmeetForm type='Post' smeet={smeets} />
        </>
    )
}