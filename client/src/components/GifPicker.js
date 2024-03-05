
import { useState } from "react";
import GifPick from "gif-picker-react";


export default function GifPicker() {
    const [gif, setGif] = useState(null);

    console.log(gif)
    
    return (
        <div>
            <GifPick tenorApiKey={process.env.REACT_APP_TENOR_KEY} onGifClick={(TenorImage) => setGif(TenorImage.description)} />
        </div>
    )
}