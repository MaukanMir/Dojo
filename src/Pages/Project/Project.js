// import styles here
import "./Project.css"
// import react router dom here
import { useParams } from "react-router-dom";
//firestore imports here
import { useDocument } from "../../Hooks/useDocument";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "../ProjectComments/ProjectComments";


const Project = () => {
  const {id} = useParams();
  const {document, error} = useDocument("projects",id)

  if(error){
    return <div className="error">{error}</div>
  }
  if(!document){
    return <div className ="loading">Loading....</div>
  }

  return (
    <div className="project-details">
    <ProjectSummary project ={document}/>
    <ProjectComments project = {document} />
    </div>
  )
}

export default Project