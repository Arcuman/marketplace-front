import {Button, Input} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {clearProfilError, fetchProfile, updateProfile} from '../../redux/actions/profileAction'
import EditIcon from '@material-ui/icons/Edit';
import {BASE_URL} from '../../constants/constants';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '40%',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
            boxSizing: 'border-box',
            margin: '0 auto',
            position: 'relative'
        },
        title: {},
        info: {
            display: 'flex',
            flexDirection: 'column',
        },
        text: {
            fontWeight: 500,
            color: 'gray',
            marginTop: "20px"
        },
        button: {
            marginTop: '20px'
        },
        cardItemButtonsEdit: {
            color: 'blue',
            position: 'absolute',
            top: '20px',
            right: '15px',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        cardItemButtonsCloseEdit: {
            color: 'red',
            position: 'absolute',
            top: '20px',
            right: '25px',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        profileImg: {
            width: '100%',
            objectFit: 'cover'
        },
        imgInputContainer: {
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: '40px'
        },
        imgInputLabel: {
            position: 'absolute',
            top: '0',
            zIndex: 1,
        },
        imgPreview: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        },
        img: {
            width: '40%',
            maxWidth: '250px',
            maxHeight: '200px',
            objectFit: 'cover'
        },
        imgPreviewClose: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            "&:hover": {
                cursor: 'pointer'
            }
        },
        form: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        input: {
            marginTop: '20px',
            width: '100%',
            padding: '5px'
        },
        cardButtons: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        inputFile: {
            height: '36px',
            width: '194px',
            opacity: 0,
            zIndex: 2,
            "&:hover": {
                cursor: 'pointer'
            }
        },
        error: {
            width: '100%',
        },
        errorText: {
            color: 'red',
            fontSize: '16px'
        }
    })
)

export default function Profile() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const profileData = useSelector((store) => store.profile.profileData);
    const error = useSelector((store) => store.profile.errorMessage);
    const history = useHistory();
    const [formValue, setFormValue] = useState({
        name: '',
        description: '',
        quantity: '',
        price: 0
    })

    const [img, setImg] = useState({
        image: null,
        imagePreview: null
    })

    const imageHandler = (e) => {
        if (e.target.files[0]) {
            let reader = new FileReader();
            let newFile = e.target.files[0];
            reader.readAsDataURL(newFile);

            reader.onloadend = () => {
                setImg({
                    image: newFile,
                    imagePreview: reader.result
                })
            };
        } else {
            removeImage();
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        setImg({
            image: null,
            imagePreview: null
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        const newProduct = {
            ...formValue, photo: img.image
        }

        for (const key in newProduct) {
            formData.append(key, newProduct[key]);
        }


        dispatch(updateProfile(formData, clearForm, setIsEdit));
    }

    const onChange = (e) => {
        setFormValue((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function toggleIsEdit() {
        setIsEdit(!isEdit);
        dispatch(clearProfilError());
    }

    function clearForm() {
        setFormValue({
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
        });
        setImg({
            image: {
                name: profileData?.photo.split('/')[1]
            },
            imagePreview: `${BASE_URL}${profileData?.photo}`
        })
        toggleIsEdit();
    }


    useEffect(() => {
        dispatch(fetchProfile());

    }, [dispatch])

    useEffect(() => {
        console.log(profileData);
        setFormValue({
            name: profileData?.name,
            email: profileData?.email,
            phone: profileData?.phone,
        })
        if (profileData && profileData.photo) {
            console.log({photo: profileData.photo})
            setImg({
                image: {
                    name: profileData?.photo.split('/')[1]
                },
                imagePreview: `${BASE_URL}${profileData?.photo}`
            })
        }
        else {
            console.log('here')
            setImg({
                image: {
                    name: 'name'
                },
                imagePreview: `https://i.stack.imgur.com/l60Hf.png`
            })
        }
    }, [profileData])


    return (
        <div className={classes.root}>
            {!isEdit && <EditIcon className={classes.cardItemButtonsEdit} onClick={toggleIsEdit}/>}
            {isEdit && <span className={classes.cardItemButtonsCloseEdit} onClick={toggleIsEdit}>X</span>}
            <h3 className={classes.title}>Профиль</h3>
            <div className={classes.info}>
                {!isEdit && (<>
                    <img className={classes.profileImg} src={`${img.imagePreview}`} alt='Phot'/>
                    <span className={classes.text}>Имя: {profileData?.name}</span>
                    <span className={classes.text}>Почта: {profileData?.email}</span>
                    <span className={classes.text}>Телефон: {profileData?.phone}</span>
                    <Button onClick={() => history.push('my-orders')} className={classes.button} color='primary'
                            variant="contained">Мои покупки</Button>
                    <Button onClick={() => history.push('my-products')} className={classes.button} color='primary'
                            variant="contained">Мои продукты</Button>
                    <Button onClick={() => history.push('my-auctions')} className={classes.button} color='primary'
                            variant="contained">Мои аукционы</Button>
                </>)}
                {isEdit && (
                    <form onSubmit={onSubmit} className={classes.form}>
                        <div className={classes.imgInputContainer}>
                            <label htmlFor='file' className={classes.imgInputLabel}>
                                <Button color='secondary' variant="contained">Загрузите картинку</Button>
                            </label>
                            <input className={classes.inputFile} id='file' type='file' onChange={imageHandler}>
                            </input>
                        </div>
                        {img.imagePreview && (
                            <div className={classes.imgPreview}>
                                <img className={classes.img} src={`${img.imagePreview}`} alt=""/>
                                <span className="image-name">
                                {img?.image?.name}
                            </span>
                                <span className={classes.imgPreviewClose} onClick={(e) => removeImage(e)}>X</span>
                            </div>
                        )}
                        <Input className={classes.input} value={formValue.name} placeholder="Имя" name='name'
                               type="text" onChange={onChange} required/>
                        <Input className={classes.input} value={formValue.email} placeholder="Описание" name='email'
                               type="text" onChange={onChange} required/>
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
                        <div className={classes.cardButtons}>
                            <Button variant="contained" type='submit' color='primary'>Отправить</Button>
                            <Button variant="contained">Отмена</Button>
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
                )}
            </div>
        </div>
    )
}
