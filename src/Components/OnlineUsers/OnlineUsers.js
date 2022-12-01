//import styles here
import "./OnlineUsers.css";
//import firestore hooks here
import {useCollection} from "../../Hooks/useCollection"
//import component here
import Avatar from "../Avatar/Avatar";


const OnlineUsers = () => {

    const { error, documents } = useCollection("users");

return (
    <div className="user-list">
    <h2>All Users</h2>
    {error && <div className="error">{error}</div>}
    {documents && documents.map(user=>(
        <div key ={user.id} className="user-list-item">
        {user.online && <span className ="online-user"></span>}
        <span>{user.displayName}</span>
        <Avatar src ={user.photoURL}/>
        </div>
    ))}
    </div>
)
}

export default OnlineUsers