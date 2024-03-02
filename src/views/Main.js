import { useState } from "react";
import SmeetForm from "../components/SmeetForm";

export default function Main() {

    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <h2>This is  a placeholder</h2>
            <button onClick={() => setShowModal(true)}>Open</button>
            {showModal && <SmeetForm setShowModal={setShowModal} />}
        </div>
    )
}