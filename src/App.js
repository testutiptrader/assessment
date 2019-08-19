import React from 'react';
import './App.css';
import GitLab from './components/api/GitLab/GitLab';
import Auth from './components/Auth/Auth';

function App() {
    return (
        <div className="App">
            {/*<GitLab/>*/}
            <Auth/>
        </div>
    );
}

export default App;
