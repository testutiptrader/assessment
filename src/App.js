import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Project from "./components/Projects/Project";
import Milestones from "./components/Milestones/Milestones";
import Issues from "./components/Issues/Issues";
function App() {
    return (

        <div className="App">
            <Switch>
                <Route exact path='/' component={Auth}/>
                {/*<Route path='/project' component={Milestones}/>*/}
                <Route path='/milestone/project_id/:project_id/:project_name' component={Milestones}/>
                <Route path='/issues/project_id/:project_id/milestone/:milestone_id' component={Issues}/>
            </Switch>
            {/*<Auth/>*/}
        </div>
    );
}

export default withRouter(App);
