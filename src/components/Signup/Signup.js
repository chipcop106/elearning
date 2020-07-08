import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, withFormik } from 'formik';
import * as Yup from 'yup';

import styles from '~components/Login/Login.module.scss';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
  .required('Name is must not empty'),
  phone: Yup.number()
    .typeError('Invalid phone number')
    .integer('Invalid phone number')
    .required('Phone is must not empty'),
  password: Yup.string()
    .required('Password is must not empty')
    .min(6, "Password must at least 6 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = (props) => {
  
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form className="login100-form validate-form" onSubmit={handleSubmit} autoComplete="off">
    <span className="login100-form-title">Signup</span>
    <div className="wrap-input100 validate-input">
      <input className="input100" type="text" name="phone" placeholder="Phone"
       onChange={handleChange}
       value={values.phone} />
      <span className="focus-input100" />
      <span className="symbol-input100">
        <i className="fa fa-phone" aria-hidden="true" />
      </span>
    </div>
    {
      errors.phone ? <span className="text-danger d-block mb-2">{errors.phone}</span> : ""
    }
    <div className="wrap-input100 validate-input">
      <input className="input100" type="text" name="name" placeholder="Name"
       onChange={handleChange}
       value={values.name} />
      <span className="focus-input100" />
      <span className="symbol-input100">
        <i className="fa fa-user" aria-hidden="true" />
      </span>
    </div>
    {
      errors.name ? <span className="text-danger d-block mb-2">{errors.name}</span> : ""
    }
    <div className="wrap-input100 validate-input" data-validate="Password is required">
      <input className="input100" type="password" name="password" placeholder="Password"
       onChange={handleChange}
       value={values.password} />
      <span className="focus-input100" />
      <span className="symbol-input100">
        <i className="fa fa-lock" aria-hidden="true" />
      </span>
    </div>
    {
      errors.password ? <span className="text-danger d-block mb-2">{errors.password}</span> : ""
    }
    <div className="wrap-input100 validate-input" data-validate="Password is required">
      <input className="input100" type="password" name="passwordConfirm" placeholder="Confirm password"
       onChange={handleChange}
       value={values.passwordConfirm} />
      <span className="focus-input100" />
      <span className="symbol-input100">
        <i className="fa fa-lock" aria-hidden="true" />
      </span>
    </div>
    {
      errors.passwordConfirm ? <span className="text-danger d-block mb-2">{errors.passwordConfirm}</span> : ""
    }
    <div className="container-login100-form-btn">
      <button type="submit" className="login100-form-btn">Signup</button>
    </div>
    <div className="text-center p-t-136">
      <span className="txt2">
        Already have account? <a className="txt2 text-hl" href="login.html">Login</a>
    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
      </span>
    </div>
</form >)
}

const FormikForm = withFormik({
  mapPropsToValues(props) {
    return {
      phone: "",
      name: "",
      password: "",
      passwordConfirm: ""
    }
  },
  validationSchema: SignupSchema,
  handleSubmit: (values) => {
    console.log(values)
  },
})(Signup)

ReactDOM.render(<FormikForm />, document.getElementById('signup'));