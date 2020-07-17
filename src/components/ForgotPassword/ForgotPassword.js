import React from 'react';
import ReactDOM from 'react-dom';
import styles from '~components/Login/Login.module.scss';
import { Formik, withFormik } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  phone: Yup.number()
    .typeError('Invalid phone number')
    .integer('Invalid phone number')
    .required('Phone is not empty'),
  newPassword: Yup.string()
    .required('Password is not empty')
    .min(6, "Password must at least 6 characters")
});

const ForgotPassword = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return <form className="login100-form validate-form" onSubmit={handleSubmit} autoComplete="off">
    <span className="login100-form-title">Reset password</span>
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
      touched.phone && errors.phone &&
      <span className="text-danger d-block mb-2">{errors.phone}</span>
    }
    <div className="wrap-input100 validate-input" data-validate="Password is required">
      <input className="input100" type="password" name="newPassword" placeholder="New password"
        onChange={handleChange}
        value={values.newPassword} />
      <span className="focus-input100" />
      <span className="symbol-input100">
        <i className="fa fa-lock" aria-hidden="true" />
      </span>
    </div>
    {
      touched.newPassword && errors.newPassword &&
      <span className="text-danger d-block mb-2">{errors.newPassword}</span>
    }
    <div className="container-login100-form-btn">
      <button type="submit" className="login100-form-btn">Send</button>
    </div>
  </form>
}


const FormikForm = withFormik({
  mapPropsToValues(props) {
    return {
      phone: "",
      newPassword: ""
    }
  },
  validationSchema: Schema,
  handleSubmit: (values) => {
    console.log(values)
  },

})(ForgotPassword)

ReactDOM.render(<FormikForm />, document.getElementById('forgotpassword'));