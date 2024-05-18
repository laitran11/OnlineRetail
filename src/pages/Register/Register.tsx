import { Box, Grid, Typography, TextField, Button, Divider } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
export default function Register() {
    
    return (
        <Grid
            container
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            style={{ minHeight: '100vh' }} // Ensure full height of the viewport
        >
            <Grid item xs={10} sm={6} md={4} lg={3} xl={3}>
                <Box sx={{ p: 3, border: '1px solid #D9D9D9', borderRadius: 5, }} >
                    <Typography variant='h5' align='center' style={{ fontWeight: '600', fontFamily: "Briem Hand", marginBottom: 20, color:'GrayText'}}>E-Comershop Wellcome</Typography>
                    <Divider />
                    <Typography variant='h6' align='center' mb={3} style={{ fontWeight: '600', marginTop: 20  }}>REGISTER FORM</Typography>
                    <TextField fullWidth variant='outlined' margin='normal' label="Fullname" />
                    <TextField fullWidth variant='outlined' margin='normal' label="Username" />
                    <TextField fullWidth variant='outlined' margin='normal' type="password" label="Password" />
                    <Box sx={{ textAlign: 'right' }}>
                        <Button variant='outlined'>JOIN</Button>
                    </Box>
                    <Link to="/login" >
                    <Typography align='center' mt={3} >Have acount? Sign In</Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
}

