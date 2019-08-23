import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import  './Auth.css';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Milestones from "../Milestones/Milestones";
import Project from "../Projects/Project";

export default () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        returnSecureToken: true,
        user: {
            displayName: '',
            email: '',
            expiresIn: '',
            idToken: '',
            kind: '',
            localId: '',
            refreshToken: '',
            registered: false
        }
    });
    async function loginHandler(event)  {
        event.preventDefault();
        localStorage.setItem('refreshToken', true);
        // const user = await axios.post('', data);
        // await setData({
        //     ...data,
        //     user: user.data
        // });
        // localStorage.setItem('refreshToken', true);
    }

    /*
        return(
            <div className='Auth'>
                <h1>Авторизация</h1>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <div>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            onChange={e => setData({...data, email: e.target.value})}
                        /><br/>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className='password'
                            type="password"
                            name='password'
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={e => setData({...data, password: e.target.value})}
                        /><br/>
                        <Button
                            variant="outlined"
                            color="primary"
                            className='btnAuth'
                            onClick={loginHandler}
                        >
                            Войти
                        </Button>
                    </div>
                </Grid>
            </div>
        );
    * */
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Project />
            </Grid>
        );


};
