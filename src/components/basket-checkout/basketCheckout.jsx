import {useDispatch, useSelector} from 'react-redux';
import {sendOrder} from '../../redux/actions/ordersActions';
import {createStyles, makeStyles, Button, Input} from '@material-ui/core';
import {useState} from 'react';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '48%',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            backgroundColor: 'rgba(50, 50, 50, 0.05)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            boxSizing: 'border-box',
            position: 'relative',
            height: '50%'
        },
        form: {
            width: '100%',
        },
        close: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            '&:hover': {
                cursor: "pointer",
                color: 'red',
            },
        },
        input: {
            marginTop: '20px',
            width: '100%',
            padding: '5px'
        },
        buttonContainer: {
            width: '100%',
            marginTop: '20px'
        },
        button: {},
        error: {
            width: '100%',
        },
        errorText: {
            color: 'red',
            fontSize: '16px'
        }
    })
)

export default function BasketCheckout({toggleShowCheckout}) {
    const classes = useStyles();
    const [formValue, setFormValue] = useState({
        country: '',
        address: '',
        phone: '',
        city: ''
    })
    const dispatch = useDispatch();
    const basket = useSelector((store) => store.basket.basket);
    const error = useSelector((store) => store.orders.errorMessage)

    const onChange = (e) => {
        setFormValue((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }

    function clearForm() {
        setFormValue({
            country: '',
            address: '',
            phone: '',
            city: ''
        })
    }

    function submit(e) {
        e.preventDefault();

        dispatch(sendOrder({formValue, basket, toggleShowCheckout, clearForm}))
    }

    return (
        <div className={classes.root}>
            <span className={classes.close} onClick={toggleShowCheckout}>X</span>
            <h3>??????????????</h3>
            <form onSubmit={submit}>
                <Input className={classes.input} value={formValue.country} placeholder="????????????" name='country'
                       type="text" onChange={onChange} required/>
                <Input className={classes.input} value={formValue.city} placeholder="??????????" name='city' type="text"
                       onChange={onChange} required/>
                <Input className={classes.input} value={formValue.address} placeholder="??????????" name='address'
                       type="text" onChange={onChange} required/>
                <Input
                    value={formValue.phone}
                    name='phone'
                    type="tel"
                    placeholder="??????????????"
                    className={classes.input}
                    pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                    onChange={onChange}
                    required
                />
                <div className={classes.buttonContainer}>
                    <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                        ????????????
                    </Button>
                </div>
                <div className={classes.error}>
                    <ul>
                        {error &&
                        (Array.isArray(error) ? error.map(err => <li key={err}
                                                                     className={classes.errorText}>{err}</li>) :
                            <li className={classes.errorText}>{error}</li>)
                        }
                    </ul>
                </div>
            </form>
        </div>
    )
}
