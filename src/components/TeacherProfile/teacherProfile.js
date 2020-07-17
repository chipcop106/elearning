import React from 'react';
import ReactDOM from 'react-dom';
import TeacherForm from './TeacherForm';
import { randomId } from '~src/utils';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const initialState = {
    locationOptions: [
        {
            id: 1,
            name: 'New York',
            value: 'NY',
        },
        {
            id: 2,
            name: 'Viet Nam',
            value: 'VN',
        },
    ],
    stateOptions:[
        {
            ID: 1,
            StateName:'Viet Nam'
        },
        {
            ID: 2,
            StateName:'Paraquay'
        }
    ],
    majorOptions:[
        {
            ID: 1,
            MajorName: 'Business Studies/Administration/Management'
        },
        {
            ID: 2,
            MajorName: 'Automation Testing'
        }
    ],
    englishProficienOptions:[],
    otherCertificateOptions: [],
    levelOfPurposeOptions:[],
    levelOfEducationOptions: [],
    teylCertificateOptions:[],
    tesolCertificateOptions:[],
    englishProficiency: [],
    timeZoneOptions:[],
    teacherExperiences: [],
    avatar: "",
    fullName: "Truong Van Lam",
    skypeId: "mona.media",
    phoneNumber: "0886706289",
    location: {},

    levelOfPurpose:null,
    levelOfEducation: null,
    teylCertificate: null,
    tesolCertificate: null,
    otherCertificate: null,
   
    state: null,
    postalCode: "10010",
    timeZone: null,
    schoolName: "Bach Khoa University",
 
    major: null,

    introduce: `While I have no soccer skills, I once played in a fairly competitive adult soccer league with my then-teenage stepson. I was terrible, but I played because he asked me to. (When your kids get older and ask you to do something with them, the first time you say no might be the last time you get asked.) I was trying to match the drollness of my "Wow" when my stepson stepped in, half-smile on his lips and full twinkle in his eyes, and rescued me by saying, "Come on, we need to get ready." Was Louis cocky? Certainly, but only on the surface. His $400 cleats, carbon fiber shin guards, and "I'm the king of the business world" introduction was an unconscious effort to protect his ego. His introduction said, "Hey, I might not turn out to be good at soccer, but out there in the real world, where it really matters, I am the Man." As we took the field before a game, a guy on the other team strutted over, probably picking me out because I was clearly the oldest player on the field. (There's a delightful sentence to write.)`,
   
    teacherExp: [],
    experienceLists: [
        {
            id: 1,
            name: "Moan Media",
            jobTitle: "fe",
            timePeriod: "2018",
        },
        {
            id: 2,
            name: "Mona Media",
            jobTitle: "be",
            timePeriod: "2019",
        }
    ],
 
}

const Schema = Yup.object().shape({
    fullName: Yup.string()
        .required('First name is not empty'),
    skypeId: Yup.string()
        .required('Skype id is not empty'),
    phoneNumber: Yup.number()
        .typeError('Invalid phone number')
        .integer('Invalid phone number')
        .required('Phone is not empty'),
    introduce: Yup.string().min(50, `Introduce must have minimum 50 characters..`)
        .required('Introduce must have minimum 50 characters.. '),
});

const TeacherProfile = () => {
    const FormikForm = withFormik({
        mapPropsToValues() { // Init form field
            return initialState;
        },
        validationSchema: Schema,
        validate: (values) => {
            const errors = {};
            if (values.passwordChange) {
                if (values.password.length < 6)
                    errors.password = 'Password at least 6 characters';
                if (values.newPassword.length < 6)
                    errors.newPassword = 'Password at least 6 characters';
            }
            return errors;
        },
        handleSubmit: (values) => {
            console.log(values)
        },

    })(TeacherForm);

    return <FormikForm />;
}


const domContainer = document.getElementById('react-teacher-form');
ReactDOM.render(<TeacherProfile />, domContainer);