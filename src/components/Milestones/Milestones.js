import React, {useEffect, useState} from 'react';
import './Milestones.css';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {detailsMilestone} from "../Issues/Issues";

let projectID = '';

export function detailsProjects(projectId) {
    projectID = projectId;
}

function milestoneHandler(id) {
    detailsMilestone(id, projectID);
}

export default props => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        async function getProjects () {
            const response = await  axios.get(`http://gitlab.utip.org/api/v4/projects/${projectID}/milestones?state=active&private_token=Fq7oP-fUhnaSSqVjRz3b&page=1&per_page=10000`);
            setProject(response.data);
        };
        getProjects();
    }, []);

    return (
        <div>
            <h1>Проект WebOffice</h1>
            <Grid container  item xs={12}>
                {
                    project.map((item, index) => {
                        return (
                            <Link
                                to='/issues'
                                key={index}
                            >
                                <Button
                                    onClick={() => milestoneHandler(item.title)}
                                >
                                    <Card className='card'>
                                        <div className='cardItem'>
                                            <Typography
                                                className='title'
                                                gutterBottom
                                            >
                                                {item.title}
                                            </Typography>
                                        </div>
                                    </Card>
                                </Button>
                            </Link>
                        )
                    })
                }
            </Grid>
        </div>
    );
};