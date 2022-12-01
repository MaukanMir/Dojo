// react imports here
import {useState} from "react";
//firestore imports here
import { timestamp } from "../../Firebase/config";
import { useFirestore } from "../../Hooks/useFirestore";
//hooks import here
import {useAuthContext} from "../../Hooks/useAuthContext"
// import components here
import Avatar from "../../Components/Avatar/Avatar"


const ProjectComments = ({project}) => {
    
    const [newComment, setNewComment] = useState("");
    const {user} = useAuthContext();
    const {updateDocument, response} = useFirestore("projects");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(project.id, {
            comment:[...project.comment, commentToAdd]
        });

        if(!response.error){
            setNewComment("");
        }
    }

return (
    <div className ="project-comments">
    <h4>Project Comments</h4>
    <ul>
        {project.comment.length >0 && project.comment.map(comment =>(
            <li key ={comment.id}>
                <div className="comment-author">
                    <Avatar src ={comment.photoURL}/>
                    <p>{comment.displayName}</p>
                </div>
                <div className ="comment-date">
                    <p>Date Here: {comment.createdAt.toDate().toDateString()}</p>
                </div>
                <div className="comment-content">
                <p>{comment.content}</p>
                </div>
            </li>
        ))}
    </ul>

    <form onSubmit={handleSubmit} className="add-comment">
        <label>
            <span>Add new Comment</span>
            <textarea
            required
            onChange ={(e)=> setNewComment(e.target.value)}
            value={newComment}
            > 

            </textarea>
        </label>
        <button className="btn">Add Comment</button>
    </form>

    </div>
  )
}

export default ProjectComments