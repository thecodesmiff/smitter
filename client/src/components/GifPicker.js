
import { useState } from "react";
import GifPick from "gif-picker-react";


export default function GifPicker({setGifs, gifs}) {
    // const [gif, setGif] = useState(null);

    // console.log(gif)

    // const gifUpload = async (e) => {
    //     const { files } = e.target;

    //     e.preventDefault();
    //     setIsUploading(false);
    //     setIsUploading(true);
    //     const gifData = new FormData();
    //     gifData.append('gif', files[0]);
    //     const response = await fetch(`http://localhost:8000/uploadPostImg`, {
    //         method: 'POST',
    //         body: gifData
    //     })

    //     const info = await response.json();
    //     setImages(info[0].location);
    //     // .then(() => {
    //     //     setIsUploading(false);
    //     //     console.log(files[0]);
    //     // });
    // }
    
    return (
        <div>
            <GifPick tenorApiKey={process.env.REACT_APP_TENOR_KEY} onGifClick={(TenorImage) => setGifs(TenorImage.url)} />
        </div>
    )
}