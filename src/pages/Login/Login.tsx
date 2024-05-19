import { Box, Grid, Typography, TextField, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { Member,LoginModel,fetchlogin} from '../../api/auth';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleLogin = async() => {
        try{
            const loginData: LoginModel ={
                Usr : username,
                Pwd : password
            };
            const member: Member[] | null = await fetchlogin(loginData);
            if(member){
                localStorage.setItem('isLoggedIn', 'true');
                history('/dashboard');
            }
            else{
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Failed to login. Please try again later.');
        }
    }

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
                    <Typography variant='h6' align='center' mb={3} style={{ fontWeight: '600', marginTop: 20  }}>LOGIN FORM</Typography>
                    <TextField fullWidth variant='outlined' margin='normal' label="Username"  onChange={(e) => setUsername(e.target.value)} />
                    <TextField fullWidth variant='outlined' margin='normal' type="password" label="Password"  onChange={(e) => setPassword(e.target.value)}/>
                    <Box sx={{ textAlign: 'right' }}>
                        <Button variant='outlined' onClick={handleLogin}>JOIN</Button>
                    </Box>
                    <Link to="/register" >
                    <Typography align='center' mt={3} >Don't have acount? Sign Up</Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
}

