//import styles here
import "./ProjectList.css"
//react router dom imports here
import {Link} from "react-router-dom";
//import pages here
import Avatar from "../Avatar/Avatar"


const ProjectList = ({projects}) => {

return (
    <div className="project-list">
    {projects.length === 0 && <p>No Projects Yet!</p>}
    {projects.map(doc =>(
        <Link to ={`/projects/${doc.id}`} key ={doc.id}>
            <h4>{doc.name}</h4>
            <p> Due By {doc.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
            <ul>
                {doc.assignedUsersList.map(user=>(
                    <li key ={user.photoURL}>
                        <Avatar src ={user.photoURL}/>
                    </li>
                ))}
            </ul>
            </div>
        </Link>
    ))}
    </div>
)
}

export default ProjectList