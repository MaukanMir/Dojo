//Styles imports here
import "./Create.css"
//react imports here
import { useState, useEffect } from "react";
// react select import here
import Select from "react-select";
// import hooks here
import { useCollection } from "../../Hooks/useCollection";
import {useAuthContext} from "../../Hooks/useAuthContext";
// import firestore
import { timestamp } from "../../Firebase/config";
import { useFirestore } from "../../Hooks/useFirestore";
// import react router dom imports here
import { useHistory } from "react-router-dom";


// assigned categories
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]



const Create = () => {

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);
  
  const history = useHistory();

  const { documents } = useCollection("users");
  const {user} = useAuthContext();
  const {addDocument, response} = useFirestore("projects");


  useEffect(()=>{
    documents ? setUsers(documents.map(user=> {return {value:user,label:user.displayName}})): setUsers("");
  },[documents])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setFormError(null)
    if(!category){
      setFormError("Please select a project category");
      return
    }
    if(assignedUsers.length === 0){
      setFormError("Please assign the the project atleast one user");
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL:user.photoURL,
      id:user.uid,
    }
    const assignedUsersList =assignedUsers.map((user)=>{
      return {
        displayName:user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    const project ={
      name,
      details,
      category:category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comment:[],
      createdBy,
      assignedUsersList
    };

    await addDocument(project);
    if(!response.error){
      history.push("/")
    }

  }


  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type ="text"
            onChange ={(e)=> setName(e.target.value)}
            value ={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            required
            type ="text"
            onChange ={(e)=> setDetails(e.target.value)}
            value ={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type ="date"
            onChange ={(e)=> setDueDate(e.target.value)}
            value ={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
          onChange ={(option)=> setCategory(option)}
          options ={categories}
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
          options={users}
          onChange= {(option)=> setAssignedUsers(option)}
          isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className ="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create