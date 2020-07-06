import React from 'react';
import ReactDOM from 'react-dom';
import styles from '~components/Signup/Signup.module.scss';

const initialState = {
  email:"",
  name:"",
  password: "",
  passwordConfirm: "",
}

const reducer = (prevState, { type, payload }) => {
  switch (type) {
      case "STATE_CHANGE": {
          return {
              ...prevState,
              [payload.key]: payload.value
          }
      }
      default: return prevState;
      break;
  }
}

const Signup = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChange = (e) => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const key = target.getAttribute("name");
      dispatch({ type: "STATE_CHANGE", payload: { key, value } })
  }
  
  const onSubmit = (e) => {
      e.preventDefault()
      console.log(state)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-envelope" /></span>
        </div>
        <input type="text" name="email" className="form-control" placeholder="Email" onChange={handleChange}/>
      </div>
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-user" /></span>
        </div>
        <input type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange}/>
      </div>
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-key" /></span>
        </div>
        <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange}/>
      </div>
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-key" /></span>
        </div>
        <input type="password" name="passwordConfirm" className="form-control" placeholder="Confirm password" onChange={handleChange}/>
      </div>
      <div className="confirm">
        <input className="mr-2" id="confirm" type="checkbox" />
        <label className="mb-0" htmlFor="confirm">Agree to our Terms of Services</label>
      </div>
      <div className="form-group">
        <button type="submit" className="btn signup_btn mr-2">Signup</button>
        <a href="login.html">Login</a>
      </div>
    </form>
  )
}

ReactDOM.render(<Signup />, document.getElementById('signup'));