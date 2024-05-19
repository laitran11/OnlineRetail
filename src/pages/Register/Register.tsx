import { Box, Grid, Typography, TextField, Button, Divider } from '@mui/material';
import React ,{ useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Member,RegisterModel,fetchregister} from '../../api/auth';
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleRegister = async() => {
        try{
            const registerData: RegisterModel ={
                fullName: fullname,
                Usr : username,
                Pwd : password
            };
            const member: Member[] | null = await fetchregister(registerData);
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
                    <Typography variant='h6' align='center' mb={3} style={{ fontWeight: '600', marginTop: 20  }}>REGISTER FORM</Typography>
                    <TextField fullWidth variant='outlined' margin='normal' label="Fullname" onChange={(e) => setFullname(e.target.value)}/>
                    <TextField fullWidth variant='outlined' margin='normal' label="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <TextField fullWidth variant='outlined' margin='normal' type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Box sx={{ textAlign: 'right' }}>
                        <Button variant='outlined'  onClick={handleRegister}>JOIN</Button>
                    </Box>
                    <Link to="/login" >
                    <Typography align='center' mt={3} >Have acount? Sign In</Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
}

