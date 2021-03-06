import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../_actions/AlertActions';
import { signupUser } from '../../_actions/AuthActions';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alert/Alert';
import { APP_NAME, SIGNUP_FAIL } from '../../_actions/types';

const Signup = ({ match, setAlert, signupUser, isAuthenticated }) => {
  
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    confirm_password: '',
    role:  match.params.role
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({...prev, [name]: value.trim()}))
  };
  const handleSubmit = e => {
    e.preventDefault();
    const {  password,  confirm_password } = data;
    if (password !== confirm_password) {
      return setAlert('Password does not match', 'SIGNUP_INPUT_ERROR');
    }

    return signupUser(data);
  };

  const { firstname, lastname, email, password, phone, confirm_password } = data;
  if(isAuthenticated) return <Redirect to="/dashboard" />
  return ( 
    <Fragment>
      <Navbar />

      <div className="container">
        <form className="form" onSubmit={handleSubmit} id="signup-form">
          <div className="card-wrapper">
            <Link to="/signup/investor"> Investor</Link>
            <Link to="/signup/sme"> SMEs </Link>
          </div>
          <Alert origin="SIGNUP_INPUT_ERROR" />
          <Alert origin={SIGNUP_FAIL} />
          <div className="tip p-1" style={{ textAlign: "right"}}>
            Already on { APP_NAME } ? <Link to="/login" className=""> Login</Link>
          </div>
          <div className="form-group">
            <label htmlFor="firstname"> Firstname<sup>*</sup></label>
            <input type="text" name="firstname" value={firstname} onChange={handleChange} id="firstname" className="form-control" required placeholder="Firstname" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname"> Lastname<sup>*</sup></label>
            <input type="text" name="lastname" value={lastname} onChange={handleChange} id="lastname" className="form-control" required placeholder="Lastname" />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email<sup>*</sup></label>
            <input type="email" name="email" value={email} onChange={handleChange} id="email" className="form-control" required placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone"> Phone<sup>*</sup></label>
            <input type="text" name="phone" value={phone} onChange={handleChange} id="phone" className="form-control" required placeholder="Phone" />
          </div>
          <div className="form-group">
            <label htmlFor="password"> Password<sup>*</sup></label>
            <input type="password" name="password" value={password} onChange={handleChange} id="password" className="form-control" required placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password"> Confirm Password<sup>*</sup></label>
            <input type="password" name="confirm_password" value={confirm_password} onChange={handleChange} id="confirm_password" className="form-control" required placeholder="Confirm Password" />
          </div>

          <button type="submit" className="btn btn-primary"> Signup </button>
        </form>
      </div>
      <Footer />
    </Fragment>
   );
}
 
Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
}
const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect( mapStatetoProps, { setAlert, signupUser })(Signup);