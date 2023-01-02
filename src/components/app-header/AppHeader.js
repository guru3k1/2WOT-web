import React from 'react';
import { Button, Stack, Divider, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setModalState } from '../ducks/action';



const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    return (
        <div>
            <div className='menu'>
                <svg width="1166" height="186" viewBox="0 0 1166 186" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 186H1166V0L100.336 25.5198L0 186Z" fill="#233541"/>
                </svg>
            </div>
            <div className='smallBlueBox'>
                <svg width="319" height="162" viewBox="0 0 319 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_10_10)">
                    <path d="M304 6H74.3936L5 148H265.306L304 6Z" fill="#273D55" fillOpacity="0.98"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_10_10" x="0" y="0" width="319" height="162" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="5" dy="4"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_10"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_10" result="shape"/>
                    </filter>
                    </defs>
                </svg>
            </div>
            <div className='blueBox'>
                <svg width="122" height="115" viewBox="0 0 122 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="122" height="115" fill="#21F2FF"/>
                </svg>
            </div>
            <div className='logo-text'>
                <Stack divider={<Divider orientation="horizontal" flexItem />}>
                <Typography variant="h3">2W</Typography>
                <Typography variant="h3">OT</Typography>
                </Stack>

            </div>
            <div className='createTask'> 
            
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                >
                    <Button variant="outlined" sx={{bgcolor: 'white'}} onClick={()=> dispatch(fetchUser())}>Connect</Button>
                    <Button disabled={user.userId === ""}
                        variant="contained" onClick={() => dispatch(setModalState(true))}>Create Task</Button>
                </Stack>
                <Box className={'userBox'}>
                    User: {user.firstName} {user.lastName}  ID: {user.userId}
                    <Divider sx={{ borderBottomWidth: 2 }} color="#FDA228"/>
                    Email: {user.email}
                </Box>
            </div>
        </div>
    )
}

export default AppHeader;