import { createStyles, makeStyles, Button, Input } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logInReq } from '../../redux/actions/registartionAction';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: '100%',
			marginTop: '80px',
			display: 'flex',
			justifyContent: 'center'
		},
		card: {
			width: '100%',
			maxWidth: '500px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.3)',
			padding: '20px'
		},
		form: {
			display: 'flex',
			width: '100%',
			flexDirection: 'column',
			alignItems: 'center'
		},
		submitButton: {
			marginTop: '40px'
		},
		input: {
			marginTop: '20px',
			width: '100%',
			padding: '5px'
		}
	})
);

export default function SignUp() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const authStoreError = useSelector((store) => store.auth.error);
	const [formValue, setFormValue] = useState({
		email: '',
		password: ''
	})

	const onChange = (e) => {
		setFormValue((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value
			}
		})
		
	}

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formValue);
		dispatch(logInReq({formValue, history}));
		setFormValue({
			name: '',
			email: '',
			phone: '',
			password: ''
		})
	};

	return (
		<div className={classes.root}>
			<div className={classes.card}>
				<h2>Войти</h2>
				<form className={classes.form} onSubmit={onSubmit}>
					<Input className={classes.input} name='email'  placeholder="Почта" type="text" onChange={onChange} />
					<Input className={classes.input} name='password'  placeholder="Пароль" type="password" onChange={onChange} />
					{authStoreError && <span style={{color: 'red'}}>{authStoreError}</span>}
					<Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
						отправить
					</Button>
				</form>
			</div>
		</div>
	);
}
