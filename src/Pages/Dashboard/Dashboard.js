//IMport styles here
import "./Dashboard.css";
//import firestore here
import {useCollection} from "../../Hooks/useCollection"
import { useAuthContext } from "../../Hooks/useAuthContext";
// import components here
import ProjectList from "../../Components/ProjectList/ProjectList";
// import pages here
import ProjectFilter from "./ProjectFilter";
// react imports here
import {useState} from "react";


const Dashboard = () => {
  const {documents, error} = useCollection("projects");
  const [currentFilter,setCurrrentFilter] = useState("all")
  const {user} = useAuthContext();

  const changeFilter = (newFilter)=>{
    setCurrrentFilter(newFilter);
  }


  const projects = documents ? documents.filter((document)=>{
    switch(currentFilter){
      case "all":
        return true
      case "mine":
        let assignedToMe = false;
        document.assignedUsersList.forEach((u)=> {
          if(user.uid === u.uid){
            assignedToMe = true;
          }
        })
        return assignedToMe;
      case "development":
      case "design":
      case "sales":
      case "marketing":
      console.log(document.category, currentFilter)
      return document.category === currentFilter
    default:
      return true
    }
  }):null;

  return (
    <div>
      <h2 className="page-title">Dashbaord</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter ={currentFilter} changeFilter= {changeFilter} />}
      {documents && <ProjectList projects = {projects}/>}
    </div>
  )
}

export default Dashboard