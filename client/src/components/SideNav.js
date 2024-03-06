import { HiOutlineMagnifyingGlass,
    HiOutlineHome,
    HiOutlineBell,
    HiOutlineEnvelope,
    HiOutlineUser
} from "react-icons/hi2";
import SmeetForm from "./SmeetForm";

export default function SideNav({ setShowModal, signOut }) {
    return (
        // <div className="navSection">
        <>
            <div className="nav">
                <div className="logo">X</div>
                <div>
                    <HiOutlineHome className="icon" />
                    <span>Home</span>
                </div>
                <div>
                    <HiOutlineMagnifyingGlass className="icon" />
                    <span>Explore</span>
                </div>
                <div>
                    <HiOutlineBell className="icon" />
                    <span>Notifications</span>
                </div>
                <div>
                    <HiOutlineEnvelope className="icon" />
                    <span>Messages</span>
                </div>
                <div>
                    <HiOutlineUser className="icon" />
                    <span>Profile</span>
                </div>
                <div className="makePost">
                    <button onClick={() => setShowModal(true)}>Post</button>
                </div>
                <div>
                    <button className="signout" onClick={signOut}>SIGN OUT</button>
                </div>
            </div>
            <div className="userStuff">
            </div>
            </>
        // </div>
    )
}