import {useState} from 'react';
import { createStyles, makeStyles, Button, Input } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import {signUpReq} from '../../redux/actions/registartionAction'
import { useHistory } from 'react-router';


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
		},
		       error: {
            width: '100%',
        },
        errorText: {
            color: 'red',
            fontSize: '16px'
        }
	})
);

export default function SignUp() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const authStoreError = useSelector((store) => store.auth.errorSignUp);
	const [formValue, setFormValue] = useState({
		name: '',
		email: '',
		phone: '',
		password: ''
	})

	function clearForm(){
		setFormValue({
			name: '',
			email: '',
			phone: '',
			password: ''
		})
	}

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
		dispatch(signUpReq({formValue, history, clearForm}));
	};
	// pattern="+375([0-9]{2})[0-9]{3}-[0-9]{2}-[0-9]{2}"
	return (
		<div className={classes.root}>
			<div className={classes.card}>
				<h2>Регистрация</h2>
				<form className={classes.form} onSubmit={onSubmit}>
					<Input className={classes.input} placeholder="Имя" name='name' type="text" value={formValue.name} onChange={onChange} required />
					<Input className={classes.input} placeholder="Почта" name='email' type="text" value={formValue.email} onChange={onChange} required />
					<Input
						value={formValue.phone}
						name='phone'
						type="tel"
						placeholder="Телефон"
						className={classes.input}
						pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
						onChange={onChange}
						required
					/>
					<Input
						name='password'
						value={formValue.password}
						className={classes.input}
						placeholder="Пароль"
						type="password"
						onChange={onChange}
						required
					/>
					<Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
						Отправить
					</Button>
					<div className={classes.error}>
						<ul>
							{authStoreError &&
							(Array.isArray(authStoreError) ? authStoreError.map(err => <li key={err}
																		 className={classes.errorText}>{err}</li>) :
								<li className={classes.errorText}>{authStoreError}</li>)
							}
						</ul>
                	</div>
				</form>
			</div>
		</div>
	);
}
