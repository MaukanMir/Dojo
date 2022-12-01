//Import css styles here
import './App.css';
//import react router dom imports here
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
//import pages here
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Create from "./Pages/Create/Create";
import Project from './Pages/Project/Project';
import Signup from "./Pages/Signup/Signup";

//firestore imports here
import { useAuthContext } from "./Hooks/useAuthContext";

//Import components here
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import OnlineUsers from './Components/OnlineUsers/OnlineUsers';


function App() {

  const {user, authIsReady} = useAuthContext();

  return (

    <div className="App">
    {authIsReady && (
  
    <BrowserRouter> 
    { user && <Sidebar/>}
    <div className="container">
    <Navbar/>
    <Switch>

      <Route exact path ="/">
        {!user && <Redirect to="/login"/>}
        {user && <Dashboard/>}
      </Route>

      <Route path ="/login">
        {!user && <Login/>}
        {user && <Redirect to="/"/>}
      </Route>

      <Route path="/signup">
        {!user && <Signup/>}
        {user && <Redirect to="/"/>}
      </Route>

      <Route path="/projects/:id">
      {!user && <Redirect to="/login"/>}
        {user && <Project/>}
      </Route>

      <Route path ="/create">
      {!user && <Redirect to="/login"/>}
        {user && <Create/>}
      </Route>

    </Switch>
  
    </div>
    {user && <OnlineUsers/>}
    </BrowserRouter>
  )}
    </div>

  );
}

export default App
