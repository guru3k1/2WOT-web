import React from "react";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import TaskCard from '../task-card/TaskCard';
import { Typography } from "@mui/material";


const TaskGroup = ({type,tasks,editTask,closeTask,getTimeLog}) =>{
    const getTypeName=()=> {
        if(type){
            return type.charAt(0).toUpperCase() + type.slice(1);
        }
    }

    return(
        <Grid2 xs={12} md={5}>
            <div className="taskContainer sprintTasks">
                <Typography sx={{padding: 1}} variant="h6">
                    {`${getTypeName()} tasks`}
                </Typography>
                <div className='taskList'>
                    <Grid2 container spacing={1}  justifyContent="center">
                        {tasks.map((task) => {
                            if(task.type.toLowerCase() === type){
                            return(
                            <Grid2 xs={"auto"}>
                                <TaskCard
                                    key={task.taskId}
                                    task={task}
                                    className='card'
                                    editTask={editTask} 
                                    getTimeLog={getTimeLog} 
                                    closeTask={closeTask}
                                />
                            </Grid2>)
                            }else{
                                return <></>
                            }
                            })}
                        
                    </Grid2>
                </div>
                
            </div>
        </Grid2>
    )
}

export default TaskGroup; 