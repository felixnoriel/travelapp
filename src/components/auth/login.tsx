import React, { useState } from 'react'
import { TextField, Avatar, Button, CssBaseline, Grid, Box, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link'
import { NextPage } from 'next'
import { loginHook, federatedSignIn } from './withAuth';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	links: {
		margin: theme.spacing(3, 0, 2),
	}
}));

const LoginPage: NextPage = () => {
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { response, signInTrigger } = loginHook();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
        		</Typography>
				<form 
					className={classes.form} 
					onSubmit={(e) => {
						e.preventDefault();
						signInTrigger(username, password)
					}}
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address / Username"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{
						response && response.err &&
						<Typography color="secondary" >
							{response.err}
						</Typography>
					}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
          			</Button>
					<Button
						fullWidth
						variant="contained"
						color="secondary"
						onClick={() => federatedSignIn('Facebook')}
					>
						login with facebook
          			</Button>
					<Grid
						container
						className={classes.links}
					>
						<Grid item>
							<Link href="/account/register"><a>No account yet? Click here to sign up</a></Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			Your Website
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}


export default LoginPage
