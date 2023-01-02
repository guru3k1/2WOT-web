import React from "react";
import { Avatar, Box, Divider } from "@mui/material";
import { blueGrey } from '@mui/material/colors';

const UserDetails = () =>
    <div>
        <Box sx={{ display: 'flex',
          alignItems: 'end',
          width: 'fit-content',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 5.5,
          },
          '& hr': {
            mx: 5.5,
          },}}>
            <Divider orientation="vertical" flexItem />
            <Avatar sx={{ bgcolor: blueGrey[500] }}>C</Avatar>

        </Box>
    </div>


export default UserDetails;