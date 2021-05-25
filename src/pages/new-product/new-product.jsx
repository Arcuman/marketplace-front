import {useDispatch, useSelector} from 'react-redux';
import {createProduct} from '../../redux/actions/productsActions';
import {createStyles, makeStyles, Button, Input} from '@material-ui/core';
import {useRef, useState} from 'react';

import {useHistory} from 'react-router';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '60%',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            padding: '40px',
            boxSizing: 'border-box',
            margin: '0 auto'
        },
        form: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        cardButtons: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        input: {
            marginTop: '20px',
            width: '100%',
            padding: '5px'
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
            zIndex: 1
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
            objectFit: 'contain'
        },
        imgPreviewClose: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            "&:hover": {
                cursor: 'pointer'
            }
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

export default function NewProduct() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const form = useRef(null)
    const error = useSelector((store) => store.userProducts.errorMessage)

    const [formValue, setFormValue] = useState({
        name: '',
        description: '',
        quantity: '',
        price: 0
    })
    const [img, setImg] = useState({
        image: null,
    })

    const onChange = (e) => {
        setFormValue((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const imageHandler = (e) => {
        console.log(e.target.files)
        if (e.target.files[0]) {
            let reader = new FileReader();
            let newFile = e.target.files[0];
            setImg({
                image: newFile,
                imagePreview: null
            })
            reader.onloadend = () => {
                setImg({
                    image: newFile,
                    imagePreview: reader.result
                })
            };
            reader.readAsDataURL(newFile);
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

    function clearForm() {
        setFormValue({
            name: '',
            description: '',
            quantity: '',
            price: 0
        });
        setImg({
            image: null,
            imagePreview: null
        });
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(img.image)
        const newProduct = {
            ...formValue, photo: Object.assign(img.image)
        }
        console.log(newProduct)
        for (const key in newProduct) {
            formData.append(key, newProduct[key]);
        }

        dispatch(createProduct(formData, history, clearForm));
    }

    return (
        <div className={classes.root}>
            <h3 style={{textAlign: 'center'}}>Новый Продукт</h3>
            <form id='form' ref={form} className={classes.form} onSubmit={onSubmit}>
                <div className={classes.imgInputContainer}>
                    <label htmlFor='file' className={classes.imgInputLabel}>
                        <Button color='secondary' variant="contained">Загрузите картинку</Button>
                    </label>
                    <input className={classes.inputFile} id='file' type='file' onChange={(e) => imageHandler(e)}
                           placeholder='Загрузите картинку' required>
                    </input>
                </div>
                {img.imagePreview && (
                    <div className={classes.imgPreview}>
                        <img className={classes.img} src={img.imagePreview} alt=""/>
                        <span className="image-name">
                                {img.image.name.slice(0, 8)}
                            </span>
                        <span className={classes.imgPreviewClose} onClick={(e) => removeImage(e)}>X</span>
                    </div>
                )}
                <Input className={classes.input} value={formValue.name} placeholder="Имя" name='name' type="text"
                       onChange={onChange} required/>
                <Input className={classes.input} value={formValue.description} placeholder="Описание" name='description'
                       type="text" onChange={onChange} required/>
                <Input className={classes.input} value={formValue.quantity} placeholder="Количество" name='quantity'
                       type="number" onChange={onChange} required/>
                <Input className={classes.input} value={formValue.price} placeholder="Цена" min={0} name='price'
                       type="number" onChange={onChange} required/>
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
        </div>
    )
}
