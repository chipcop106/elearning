import React from 'react';
import ReactDOM from 'react-dom';
import styles from '~components/Login/Login.module.scss';
import { Formik, withFormik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  phone: Yup.number()
    .typeError('Invalid phone number')
    .integer('Invalid phone number')
    .required('Phone is not empty'),
  password: Yup.string()
    .required('Password is not empty')
    .min(6, "Password must at least 6 characters")
});

const Login = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return <form className="login100-form validate-form" onSubmit={handleSubmit} autoComplete="off">
    <span className="login100-form-title">Login</span>
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
    <div className="container-login100-form-btn">
      <button type="submit" className="login100-form-btn">Login</button>
    </div>
    <div className="text-center p-t-12">
      <span className="txt1">Forgot</span>{" "}
      <a className="txt2 text-hl" href="#">Username / Password?</a>
    </div>
    <div className="text-center p-t-136">
      <a className="txt2 text-hl" href="signup.html">
        Create your Account
      <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
      </a>
    </div>
  </form>
}


const FormikForm = withFormik({
  mapPropsToValues(props) {
    return {
      phone: "",
      password: ""
    }
  },
  validationSchema: LoginSchema,
  handleSubmit: (values) => {
    console.log(values)
  },

})(Login)

ReactDOM.render(<FormikForm />, document.getElementById('login'));