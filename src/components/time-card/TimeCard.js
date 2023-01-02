import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { IconButton, CardHeader, Collapse, Grid, Divider } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function TimeCard({date, duration, logTime}) {
    const [expand, setExpand] = useState(false);

    const getDurationTime = (loggedDuration) => {
      var time = loggedDuration.split("PT")[1].split(".")[0];
      return time+"S";
    }

    const getDate = (dateTime) => {
      var dateArray = dateTime.split("T")
      const date = dateArray[0]
      const time = dateArray[1].split(".")[0]
      return date+" "+time
    }

    return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader className={"logCard"}
        action={
          <IconButton aria-label="settings" onClick={()=>setExpand(!expand)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={`Date: ${date}`}
        subheader={`Time used: ${getDurationTime(duration)}`}
      />
      <Collapse in={expand}>
        <CardContent className={"logCardGrid"}>
          <Grid container justifyContent={"space-around"}>
            <Grid item xs={3}>
                Start time
            </Grid>
            <Grid item xs={0.1} sx={{height: 15}}>
                <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={3}>
               End time
            </Grid>
            <Grid item xs={0.1} sx={{height: 15}}>
                <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={3}>
               Duration
            </Grid>
            <Grid item xs={12}>
              <Divider orientation="horizontal" />
            </Grid>
            {logTime[date].sort((a, b) => a.timeId - b.timeId).map((log,index) => {
              return(
                    <React.Fragment key={index}>
                      <Grid item xs={3} className={"gridText"}>
                        {getDate(log.startTime)}
                      </Grid>
                      <Grid item xs={0.1} sx={{height: 15}}>
                          <Divider orientation="vertical" />
                      </Grid>
                      <Grid item xs={3} className={"gridText"}>
                        {getDate(log.endTime)}
                      </Grid>
                      <Grid item xs={0.1} sx={{height: 15}}>
                          <Divider orientation="vertical" />
                      </Grid>
                      <Grid item xs={3} className={"gridText"}>
                        {getDurationTime(log.duration)}
                      </Grid>
                    </React.Fragment>)}
                    )}
          </Grid>
            
        </CardContent>
      </Collapse>
    </Card>
  );
}