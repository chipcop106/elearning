import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Tab, Nav } from 'react-bootstrap';
import styles from './ProfileInfor.module.scss'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm, Controller } from 'react-hook-form';
import { updatePassAPI } from '~src/api/optionAPI';
import { getBankInfo, updateBankInfo } from '~src/api/teacherAPI';
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


const Schema = Yup.object().shape({
    cardName: Yup.string()
        .required('Card name is not empty'),
    cardNumber: Yup.string()
        .required('Card number is not empty'),
    bankName:  Yup.string()
    .required('Bank name is not empty'),
});

const PaymentInfo = () => {
    const [bank, setBank] = useState('');
    const [cardName, setCardName] = useState('thai viet dat');
    const [cardNumber, setCardNumber] = useState('2231-2212-3334-7831');
    const [submitLoading, setSubmitLoading] = useState(false);
    const { errors, register, handleSubmit, setError, setValue, clearErrors, control } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(Schema),
    });


    const onSubmit = async (data) => {
        setSubmitLoading(true);
        try {
            const res = await updateBankInfo({
                BankName:data?.bankName ?? '',
                CardHolderName:data?.cardName ?? '',
                CardNumber:parseInt(data?.cardNumber.split('-').join('')) ?? 0
            });
            res.Code === 1 && toast.success('Update payment success !!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            res.Code !== 1 && toast.error('Update payment failed, please try again !!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
        } catch (error) {
            
        }
        setSubmitLoading(false);
    }

    const getBank = async () => {
        try {
            const res = await getBankInfo();
            if(res.Code === 1) {
                setValue('bankName',res.Data?.BankName ?? '');
                setValue('cardName',res.Data?.CardHolderName ?? '');
                setValue('cardNumber',res.Data?.CardNumber ?? '');
            }
        } catch (error) {
            console.log(error?.message ?? 'Lỗi getBankInfo ')
        }
    }

    useEffect(() => {
        getBank();
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
                            {/* <span className="visual-bank">{typeCard.id === 1 ? 'Visa' : typeCard.id === 2 ? 'Master' : !!bank && bank}</span> */}
                            <img src="../assets/img/visa-2.png" className="wd-100p" />
                        </div>
            
                        
                        <div className="row ">
                            <div className="form-group col-sm-4 mg-sm-t-10 mg-b-0 mg-sm-b-30">
                                <p className="mg-b-0">Bank:</p>
                            </div>
                            <div className="form-group col-sm-8 col-lg-6">
                            <div className="input-float">
                                <input type="text" className="form-control tx-uppercase" placeholder="Bank name" name="bankName" ref={register}   />
                            </div>
                            {!!errors && !!errors.bankName && (<span className="tx-danger mg-t-5 d-block">{errors.bankName?.message}</span>)}
                            
                            </div>
                        </div>
                            

                        <div className="row ">
                            <div className="form-group col-sm-4 mg-sm-t-10 mg-b-0 mg-sm-b-30" >
                                <p className="mg-b-0">Card holder name:</p>
                            </div>
                            <div className="form-group col-sm-8 col-lg-6">
                                <div className="input-float">
                                    <input type="text" className="form-control tx-uppercase" placeholder="Full name" name="cardName" ref={register} onChange={(e) => setCardName(e.target.value.toUpperCase())} />
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
                                <Controller
                                    as={
                                        <MaskedInput
                                            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            className="form-control"
                                            name="cardNumber"
                                            showMask={true}
                                            keepCharPositions={true}
                                        />
                                    }
                                    control={control}
                                    name="cardNumber"
                                />
                                    
                                </div>
                                {!!errors && !!errors.cardNumber && (<span className="tx-danger mg-t-5 d-block">{errors.cardNumber?.message}</span>)}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8 offset-sm-4">
                            <button type="submit" className="btn btn-primary d-inline-flex align-items-center" disabled={submitLoading}>
                                    {
                                        submitLoading ? (
                                            <div className="spinner-border wd-20 ht-20 mg-r-5" role="status">
                                                <span className="sr-only">Submitting...</span>
                                            </div>
                                        )
                                            : (<><i className="fa fa-save mg-r-5"></i></>)
                                    }
                                    <span>{submitLoading ? 'Updating' : 'Update'} payment</span>

                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}


export default PaymentInfo;