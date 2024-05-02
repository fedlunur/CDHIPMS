// import logo from "./logo.svg";
//import routes
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//pribvate route
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Dashboard from "./views/Dashboard";
import Navbar from "./views/Navbar";
import Homepage from "./views/Homepage";
import Loginpage from "./views/Loginpage";
import Registerpage from "./views/Registerpage";
import ActivityList from "./views/ActivityList";
import TaskActivitiesTutorial from "./views/TaskActivitiesTutorial";
import TaskList from "./views/TaskList";
import TaskActivitiesCorrect from "./views/TaskswithToDoCorrect";
import ProjectListDT from "./views/ProjectsListDT";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          {/* private means users need to have access to dashboard */}
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />
          <Route component={Registerpage} path="/register" exact />
          <Route component={Homepage} path="/" exact />
          {/* <Route component={TodoList} path="/todos" exact /> */}
          <Route component={ProjectListDT} path="/project" exact />
          <Route component={ActivityList} path="/activitylist" exact />

          <Route
            component={TaskActivitiesTutorial}
            path="/taskactivitiestutor"
            exact
          />
          <Route component={TaskList} path="/tasklist" exact />
          <Route
            component={TaskActivitiesCorrect}
            path="/taskactivities"
            exact
          />

          {/*Working task list  */}
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
