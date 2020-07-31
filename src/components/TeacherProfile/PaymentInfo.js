import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Tab, Nav } from 'react-bootstrap';
import styles from './ProfileInfor.module.scss'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm, Controller } from 'react-hook-form';
import { updatePassAPI } from '~src/api/optionAPI';
import { toast } from 'react-toastify';
import Select from 'react-select';
import MaskedInput from 'react-text-mask';
import { appSettings } from '~src/config';
const cardOptions = [
    {
        id: 1,
        name: 'Visa'
    },
    {
        id: 2,
        name: 'Master Card'
    },
    {
        id: 3,
        name: 'Napas | National Payment Corporation of Vietnam '
    }
]

const bankOptions = [
    {
        id:1,
        name:'Vietcombank - VCB'
    },
    {
        id:2,
        name:'Á Châu - ACB'
    }
]

const Schema = Yup.object().shape({
    cardName: Yup.string()
        .required('Old password is not empty'),
    cardNumber: Yup.string()
        .required('New password is not empty'),
});

const PaymentInfo = () => {
    const [typeCard, setTypeCard] = useState(cardOptions[0]);
    const [bank, setBank] = useState(bankOptions[0]);
    const [cardName, setCardName] = useState('thai viet dat');
    const [cardNumber, setCardNumber] = useState('2231-2212-3334-7831');
    const { errors, register, handleSubmit, setError, setValue, clearErrors } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(Schema),
    });

    const handleChangeType = (values) => {
        setTypeCard(values);
    }

    const onSubmit = async (data) => {
        feather.replace();
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card card-custom">
                    <div className="card-header align-items-center d-flex justify-content-between pd-x-20-f">
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h5 className="mg-b-5">Payment</h5>
                                <p className="tx-gray-300 mg-b-0">Your payment information</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-visual wd-sm-450 wd-300 pos-relative mg-b-60">
                            <span className="visual-name">{cardName.toUpperCase()}</span>
                            <span className="visual-number">{cardNumber}</span>
                            <span className="visual-bank">{typeCard.id === 1 ? 'Visa' : typeCard.id === 2 ? 'Master' : bank && bank.name.split('-')[1]}</span>
                            <img src="../assets/img/visa-2.png" className="wd-100p" />
                        </div>
                        {!!errors && !!errors.wrongPassword && (
                            <div className="alert alert-danger mg-b-30 d-flex justify-content-between" role="alert">
                                <div className="pd-r-15">
                                    <i class="fas fa-exclamation-circle mg-r-10"></i> <span className="">{errors.wrongPassword?.message}</span>
                                </div>
                                <span onClick={() => clearErrors("wrongPassword")} ><i data-feather="x"></i></span>
                            </div>)}
                        <div className="row ">
                            <div className="form-group col-sm-4 mg-sm-t-10 mg-b-0 mg-sm-b-30">
                                <p className="mg-b-0">Card type:</p>
                            </div>
                            <div className="form-group col-sm-8 col-lg-6">
                                <Select
                                    key={option => `${option.id}`}
                                    isSearchable={false}
                                    loadingMessage={() => 'Select option is loading...'}
                                    options={cardOptions}
                                    getOptionLabel={option => `${option.name}`}
                                    getOptionValue={option => `${option.id}`}
                                    onChange={handleChangeType}
                                    styles={appSettings.selectStyle}
                                    placeholder="Select your location..."
                                    defaultValue={typeCard}
                                />

                            </div>
                        </div>
                        {
                            typeCard.id == 3 && (
                                <div className="row ">
                                    <div className="form-group col-sm-4 mg-sm-t-10 mg-b-0 mg-sm-b-30">
                                        <p className="mg-b-0">Bank:</p>
                                    </div>
                                    <div className="form-group col-sm-8 col-lg-6">
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={bankOptions}
                                            getOptionLabel={option => `${option.name}`}
                                            getOptionValue={option => `${option.id}`}
                                            onChange={setBank}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select your location..."
                                            defaultValue={bank}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        <div className="row ">
                            <div className="form-group col-sm-4 mg-sm-t-10 mg-b-0 mg-sm-b-30" >
                                <p className="mg-b-0">Card holder name:</p>
                            </div>
                            <div className="form-group col-sm-8 col-lg-6">
                                <div className="input-float">
                                    <input type="text" className="form-control tx-uppercase" placeholder="Full name" name="cardName" ref={register} onChange={(e) => setCardName(e.target.value.toUpperCase())} defaultValue={cardName} />
                                </div>
                                {!!errors && !!errors.cardName && (<span className="tx-danger mg-t-5 d-block">{errors.cardName?.message}</span>)}
                            </div>
                        </div>
                        <div className="row ">
                            <div className="form-group col-sm-4 mg-sm-t-10 mg-b-0 mg-sm-b-30">
                                <p className="mg-b-0">Card number:</p>
                            </div>
                            <div className="form-group col-sm-8 col-lg-6">
                                <div className="input-float">
                                    <MaskedInput
                                        mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        className="form-control"
                                        ref={register}
                                        name="cardNumber"
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        defaultValue={cardNumber}
                                        showMask={true}
                                        keepCharPositions={true}
                                    />
                                </div>
                                {!!errors && !!errors.cardNumber && (<span className="tx-danger mg-t-5 d-block">{errors.cardNumber?.message}</span>)}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8 offset-sm-4">
                                <button type="submit" className="btn btn-primary"><i className="fa fa-save mg-r-5"></i>Update payment</button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}


export default PaymentInfo;