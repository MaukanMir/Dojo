// react imports here
import {useState} from "react"
const filterList = ["all","mine","development","design","marketing","sales"];


const ProjectFilter = ({currentFilter, changeFilter}) => {



return (
    <div className ="project-filter">

    <nav>
    <p>Filter by:</p>
        {filterList.map(item=> (
            <button key ={item}
            onClick ={()=> changeFilter(item)}
            className = {item === currentFilter ? "active": ""}
            >
                {item}
            </button>
        ))}
    </nav>

    </div>
)
}

export default ProjectFilter