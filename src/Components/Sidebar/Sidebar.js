//import styles here
import "./Sidebar.css";
//import svg logo icons here
import add_icon from "../../assets/add_icon.svg";
import dashboard_icon from "../../assets/dashboard_icon.svg"
//import react router dom here
import { NavLink } from "react-router-dom";
//import component here
import Avatar from "../Avatar/Avatar";
//import hooks here
import {useAuthContext} from "../../Hooks/useAuthContext";

const Sidebar = () => {
    const {user} = useAuthContext();
    
  return (
    <div className ="sidebar">
    <div className ="sidebar-content">
        <div className ="user">
        <Avatar src={user && user.photoURL}/>
        <p>Hello, {user && user.displayName[0].toUpperCase() + user.displayName.substring(1)}!</p>
        <nav className="links">
            <ul>
                <li>
                    <NavLink exact to ="/">
                        <img src ={dashboard_icon} alt="dashboard icon"/>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to ="/create">
                        <img src ={add_icon} alt="add project icon"/>
                        <span>New Project</span>
                    </NavLink>
                </li>
            </ul>
        </nav>

        </div>
    </div>

    </div>
  )
}

export default Sidebar