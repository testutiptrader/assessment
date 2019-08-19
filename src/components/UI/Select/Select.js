import TextField from "@material-ui/core/TextField";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export default props => {
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 100,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        }
    }));

    const classes = useStyles();
    const [values, setValues] = React.useState({
        score: '',
        name: 'hai',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));

        if (event.target.value !== '' && event.target.value !== null && event.target.value !== undefined) {
            props.isUpdate(event.target.value, props.idClicked, props.responsibleId);
        }
    }

    return(
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                Оценка
            </InputLabel>
            <Select
                value={values.score}
                onChange={handleChange}
                input={<OutlinedInput labelWidth={labelWidth} name="score" id="outlined-age-simple" />}
                disabled={props.isDisabled}
            >
                <MenuItem value=""><em>Нет</em></MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={16}>16</MenuItem>
            </Select>
        </FormControl>
    );
}