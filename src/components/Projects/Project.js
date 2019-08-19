import React, {useEffect, useState} from 'react';
import './Project.css';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default () => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        async function getProjects () {
            const response = await  axios.get('http://gitlab.utip.org/api/v4/projects?private_token=Fq7oP-fUhnaSSqVjRz3b&page=1&per_page=10000');
            setProjects(response.data);
        };
        getProjects();
    }, []);

    function projectDetailsHandler(name ) {
        console.log(name);
    }

    return (
        <div>
            <h1>Список проектов</h1>
            <Grid container  item xs={12}>
                {
                    projects.map((item, index) => {
                        return (
                            <Link
                                to='/milestone'

                                key={index}
                            >
                                <Button
                                    onClick={() => projectDetailsHandler(item.name)}
                                >
                                    <Card className='card'>
                                        <div className='cardItem'>
                                            <Typography
                                                className='title'
                                                gutterBottom
                                            >
                                                {item.name}
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
}