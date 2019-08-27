import React, {useEffect, useState} from 'react';
import './Issues.css';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Select from "../UI/Select/Select";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";

export default props => {
    let flag = 0;
    const [issues, setIssues] = useState([
        {
            id: '',
            iid: '',
            status: '',
            nameIssue: '',
            responsible: '',
            milestone: '',
            assessments: [
                {
                    id: '',
                    name: '',
                    assessment: '',
                    completed: false
                }
            ],
            average: ''
        },
    ]);

    useEffect(() => {
        async function getProjects () {
            const response = await axios.get(`http://assessment.git/api/getTask/project/${props.match.params.project_id}/milestone/${props.match.params.milestone_id}`);
            let issue = [];
            response.data.map((item, index) => {
                console.log(item);
                issue.push({
                    id: index,
                    iid: item.iid,
                    status: item.state,
                    nameIssue: item.title,
                    responsible: item.assignee !== null ? item.assignee.name : '-',
                    milestone: item.milestone.title,
                    url: item.web_url,
                    assessments: [
                        {
                            id: 0,
                            name: 'Сергей Дружинин',
                            assessment: 0,
                            completed: false
                        },
                        {
                            id: 1,
                            name: 'Никита Абрамов',
                            assessment: 0,
                            completed: false
                        },
                        {
                            id: 2,
                            name: 'Игорь Чунарев',
                            assessment: 0,
                            completed: false
                        }
                    ],
                    average: 0
                });

            });
            setIssues(issue);
        };
        getProjects();

    }, []);

    async function updateState(value, issueId, responsibleId) {
        setIssues(issues.filter(issue => {
            if (issue.id === issueId) {
                issue.assessments[responsibleId].assessment = value;
                issue.assessments[responsibleId].completed = true;
            }
            let count = 0;
            for (let i = 0; i < issue.assessments.length; i++) {
                count += issue.assessments[i].assessment;
            }
            issue.average = Math.round(count / issue.assessments.length);
            return issue;
        }));
        const params = new URLSearchParams();
        params.append('title', issues[issueId].nameIssue);
        // params.append('title', issues[issueId].nameIssue + ' (Вес: ' + issues[issueId].average + ')');
        params.append('average', issues[issueId].average);
        params.append('task', issues[issueId].iid);
        params.append('assessment', issues[issueId].assessments[responsibleId].assessment);
        axios.post('http://assessment.git/api/updateTask/project/' + props.match.params.project_id, params);
    }

    function getClick(issueId, responsibleId) {
        setIssues(issues.filter(issue => {
            if (issue.id === issueId) {
                issue.assessments[responsibleId].completed = !issue.assessments[responsibleId].completed;
            }
            return issue;
        }));
    }

    return (
        <div>
            <Button
                className='goBack'
                onClick={() => props.history.goBack()}
            >
                <ArrowBackIcon />
            </Button>
            <h1>Задачи</h1>
            <Paper className='root'>
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">О/С</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Ответственный</TableCell>
                            <TableCell align="right">Milestone</TableCell>
                            {
                                issues.map((item, index) => {
                                    if (flag < 1) {
                                        flag++;
                                        return (
                                            item.assessments.map((value, key) => {
                                                return (<TableCell key={key} align="center">Оценил {value.name}</TableCell>);
                                            })
                                        );
                                    }
                                })
                            }
                            <TableCell align="right">Средняя оценка</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            issues.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="right">
                                            {
                                                item.status === 'opened' ?
                                                    <Tooltip title="Открытая задача" placement="right-end">
                                                        <span className='opened'/>
                                                    </Tooltip> :
                                                    <Tooltip title="Закрытая задача" placement="right-end">
                                                        <span className='closed'/>
                                                    </Tooltip>
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <a href={item.url}>{item.nameIssue}</a>
                                        </TableCell>
                                        <TableCell align="right">{item.responsible}</TableCell>
                                        <TableCell align="right">{item.milestone}</TableCell>
                                        {
                                            issues.map((itemValue, itemKey) => {
                                                if (index === itemValue.id) {
                                                    return (
                                                        itemValue.assessments.map((value, key) => {
                                                            return (
                                                                <TableCell
                                                                    key={key}
                                                                    align="center"
                                                                    onClick={getClick.bind(null, index, key)}
                                                                >
                                                                    <Select
                                                                        isDisabled={issues[index].assessments[key].completed}
                                                                        isUpdate={updateState}
                                                                        idClicked={index}
                                                                        responsibleId={key}
                                                                    />
                                                                </TableCell>
                                                            );
                                                        })
                                                    );
                                                }
                                            })
                                        }
                                        <TableCell align="center">
                                            {
                                                issues[index].average
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}