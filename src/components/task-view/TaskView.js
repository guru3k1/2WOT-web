import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import TaskForm from '../task-form/TaskForm';
import LogView from '../log-view/LogView';
import TaskGroup from "../task-group/TaskGroup";
import { saveTask, setModalState, updateTask, closeOpenTask, getTimeLogByTask, setLogViewState} from "../ducks/action";

const TaskView = () => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = React.useState("");
    const [sprint, setSprint] = React.useState("");
    const [description,setDescription] = React.useState("");
    const [type,setType] = React.useState("");
    const [ecp,setEcp] = React.useState("");
    const [taskId,setTaskId] = React.useState(0);
    const tasks = useSelector((state) => state.user.tasks)
    const user = useSelector((state) => state.user.user);

    const task = {
        name: taskName,
        currentSprint: sprint,
        details: description,
        type,
        expectedCompletionTime: ecp,
        userId: user.userId,
        taskId: taskId
      }
    
      const resetValues = ()=>{
        setTaskName("");
        setSprint("");
        setDescription("");
        setEcp("");
        setType("");
        setTaskId(0);
      } 

    const saveTaskAndCleanForm = () =>{
        if(task.taskId === 0){
            dispatch(saveTask(task));
        }else{
            dispatch(updateTask(task));
        }
        resetValues();
    }

    const editTask = (editedTask) =>{
        setTaskName(editedTask.name)
        setDescription(editedTask.details)
        setType(editedTask.type)
        setSprint(editedTask.currentSprint)
        setEcp(editedTask.expectedCompletionTime)
        setTaskId(editedTask.taskId)
        dispatch(setModalState(true));
    }
    const getTimeLog = task =>{
        dispatch(getTimeLogByTask(task));
        dispatch(setLogViewState(true));
    }
    const closeTask = task => {
        dispatch(closeOpenTask(task))
    }

    return(
        <div className='taskView'>
            <TaskForm 
                task={{taskName,sprint, description,type,ecp}}
                setTaskName={setTaskName} 
                setSprint={setSprint}
                setDescription={setDescription}
                setType={setType}
                setEcp={setEcp}
                saveTaskAndCleanForm={saveTaskAndCleanForm}
            />
            <LogView/>
            <Grid2 container justifyContent={'space-around'}>
                <TaskGroup type={'fixed'}
                    editTask={editTask} 
                    getTimeLog={getTimeLog} 
                    closeTask={closeTask}
                    tasks={tasks}
                />
                <TaskGroup type={'normal'}
                    editTask={editTask} 
                    getTimeLog={getTimeLog} 
                    closeTask={closeTask}
                    tasks={tasks}
                />
            </Grid2>
        </div>
    ) 
}

export default TaskView;