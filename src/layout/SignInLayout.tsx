import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DefaultLayout = () => {
  return (
    <>
        <Box sx={{ flexGrow: 1, width: 1}}>
            <Grid container spacing={2}>
                <Grid xs={4}>
                </Grid>
                <Grid xs={4}>
                    <Item><Outlet /></Item>
                </Grid>
                <Grid xs={4}>
                </Grid>
            </Grid>
        </Box>
    </>
  );
};

export default DefaultLayout;
