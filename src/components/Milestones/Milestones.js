import React, {useEffect, useState} from 'react';
import './Milestones.css';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default props => {
    const [project, setProject] = useState([]);
    useEffect(() => {
        async function getProjects () {
            const response = await  axios.get(`http://assessment.git/api/getMilestone/project/${props.match.params.project_id}`);
            setProject(response.data);
        };
        getProjects();
    }, []);

    return (
        <div>
            <Button
                className='goBack'
                onClick={() => props.history.goBack()}
            >
                <ArrowBackIcon />
            </Button>
            <h1>Проект {props.match.params.project_name}</h1>
            <Grid container  item xs={12}>
                {
                    project.map((item, index) => {
                        return (
                            <Link
                                to={'/issues/project_id/' + props.match.params.project_id +'/milestone/' + item.title}
                                key={index}
                            >
                                <Button>
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