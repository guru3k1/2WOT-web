import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton, CardHeader, Avatar, Collapse, Grid, Divider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { purple, cyan } from '@mui/material/colors';
import ProgressBar from '../progress-bar/ProgressBar';
import { startTask, stopTask } from '../ducks/action';
import Stop from '@mui/icons-material/Stop'

export default function MultiActionAreaCard({task, editTask, getTimeLog, closeTask}) {
    const [expand, setExpand] = useState(false);
    const dispatch = useDispatch();
    const getDurationTime = (loggedDuration) => {
      var time = loggedDuration.split("PT")[1].split(".")[0];
      if(time === "0S"){
        return time
      }
      return time+"S";
    }
    let startStopButton;
    if(task.state ==='open'){
      startStopButton =  <IconButton aria-label="play/pause" disabled={task.completed} onClick={()=>dispatch(startTask(task))}>
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
    } else {
      startStopButton = <IconButton aria-label="play/pause" disabled={task.completed} onClick={()=>dispatch(stopTask(task))}>
      <Stop sx={{ height: 38, width: 38 }} />
    </IconButton>
    }
  return (
    <Card sx={{ maxWidth: 320, bgcolor: task.state==='active' ? cyan.A700 : undefined }}>
      <CardActionArea>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={()=>setExpand(!expand)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={task.name}
        subheader={`Sprint: ${task.currentSprint}`}
      />
      <Collapse in={expand}>
        <CardContent>
          <Typography sx={{ paddingBottom: 2}}variant="body2" color="text.secondary">
            {task.details}
          </Typography>
          <Grid container justifyContent={"space-around"}>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                    {`ETA: ${task.expectedCompletionTime}`}
                </Typography>
            </Grid>
            <Grid item xs={0.1} sx={{height: 15}}>
                <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                    {`Time used: ${getDurationTime(task.loggedDuration)}`}
                </Typography>
            </Grid>
          </Grid>
            <ProgressBar value={task.completedPercentage}/>
        </CardContent>
      </Collapse>

      </CardActionArea>
      <CardActions>
        { startStopButton }
        <Button size="small" disabled={task.completed} color="primary" onClick={()=>editTask(task)}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={()=>getTimeLog(task)}>
          Time Log
        </Button>
        <Button size="small" disabled={task.completed} color="primary" onClick={()=>closeTask(task)}>
          Close task
        </Button>
      </CardActions>
    </Card>
  );
}