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
import Input from "../UI/Input/Input";

export default () => {
    const [issues, setIssues] = useState([
        {
            id: '',
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
            const response = await  axios.get('http://gitlab.utip.org/api/v4/projects/71/issues?milestone=2.12.6.0&private_token=Fq7oP-fUhnaSSqVjRz3b&page=1&per_page=100');
            let issue = [];
            response.data.map((item, index) => {
                issue.push(
                    {
                        id: index,
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
                                completed: 0
                            },
                            {
                                id: 1,
                                name: 'Никита Абрамов',
                                assessment: 0,
                                completed: 0
                            },
                            {
                                id: 2,
                                name: 'Игорь Чунарев',
                                assessment: 0,
                                completed: 0
                            }
                        ],
                        average: 0
                    }
                );
            });
            setIssues(issue);
        };

        getProjects();
    }, []);
console.log(issues)
    return (
        <div>
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
                                    if (index === 0) {
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
                                const indexItem = index;
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
                                                if (itemKey === 0) {
                                                    return (
                                                        itemValue.assessments.map((value, key) => {
                                                            return (
                                                                <TableCell
                                                                    key={key}
                                                                    align="center"
                                                                    onChange={e => {
                                                                        // setIssues(issues.filter(issue => {
                                                                        //     if (issue.id === indexItem) {
                                                                        //         return (
                                                                        //             issue.assessments[key].completed = 1,
                                                                        //             issue.assessments[key].assessment = Number(e.target.value),
                                                                        //             issue.average = issue.assessments[key].assessment
                                                                        //         );
                                                                        //     } else {
                                                                        //         return issue;
                                                                        //     }
                                                                        // }));
                                                                        console.log(value);
                                                                    }}
                                                                >
                                                                    <Input isDisabled={issues[index].assessments[0].completed}/>
                                                                </TableCell>
                                                            );
                                                        })
                                                    );
                                                }
                                            })
                                        }
                                        <TableCell align="center"></TableCell>
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