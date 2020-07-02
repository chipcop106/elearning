import React from 'react';
import ReactDOM from 'react-dom';
import StudentForm from './StudentForm';

const StudentProfile = () => {
    return (<StudentForm/>)
}
ReactDOM.render(<StudentProfile />, document.getElementById('react-student-form'));