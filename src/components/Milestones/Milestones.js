import React, {useEffect, useState} from 'react';
import './Milestones.css';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

export default () => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        async function getProjects () {
            const response = await  axios.get(' http://gitlab.utip.org/api/v4/projects/71/milestones?state=active&private_token=Fq7oP-fUhnaSSqVjRz3b&page=1&per_page=10000');
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
                            <a
                                to='/projects'
                                onClick={event => event.preventDefault()}
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
                            </a>
                        )
                    })
                }
            </Grid>
        </div>
    );
};