import React from 'react';
import './App.css';
import GitLab from './components/api/GitLab/GitLab';
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
                <Route path='/milestone' component={Milestones}/>
                <Route path='/issues' component={Issues}/>
            </Switch>
            {/*<GitLab/>*/}
            {/*<Auth/>*/}
        </div>
    );
}

export default withRouter(App);
