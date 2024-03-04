
import { useState } from "react";
import GifPick from "gif-picker-react";


export default function GifPicker() {
    const [gif, setGif] = useState(null);

    console.log(gif)
    
    return (
        <div>
            <GifPick tenorApiKey={"AIzaSyBSVO1_4EpBDQcboJwVKuokQPattYKa0vY"} onGifClick={(TenorImage) => setGif(TenorImage.description)} />
        </div>
    )
}