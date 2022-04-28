import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import User from '../../models/user';
import AuthenticationService from './../../services/authentication.service';
import { setCurrentUser } from './../../store/actions/user';
import './login.scss';

export default function Login() {

  const [user, setUser] = useState( new User('', '', ''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   //mounted
   useEffect(() => {
      if(currentUser?.id) {
          //navigate
          navigate('/home');
      }
   }, []);

   //<input name='x' value='y' onChange=(event) => handleChange(event)>
   const handleChange = ( e ) => {

       const { name, value } = e.target;

       setUser( (prevState => {
           //e.g. prevState ({user:x, pass: y}) + newKeyValue( { user:xy }) => ({ user: xy, pass: x})
           return {
               ...prevState,
               [name] : value
           };
       }));
   };

  const handleLogin = (e) => {

      e.preventDefault();
      setSubmitted(true);

      if(!user.username || !user.password) {
          return;
      }
      setLoading(true);

   AuthenticationService.login(user).then(response => {
       //set user as a session
      dispatch(setCurrentUser(response.data));
      navigate('/');
   }).catch(error => {
      console.log(error);
      setErrorMessage('Username or password not valid!');
      setLoading(false);
  });
};

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>

      <div className="container">

      { errorMessage &&
          <div className="alert">
            <span className="closebtn" onClick={() => setErrorMessage('')}>&times;</span> 
            {errorMessage}
          </div>
      }

        <form
          onSubmit={ (e) => handleLogin(e) }
          noValidate
        >
          <h1>Sign In</h1>
          <input 
            type='text'
            name='username'
            className='form-control'
            placeholder='username'
            value={ user.username }
            onChange={ (e) => handleChange(e) }
            required
           />
          <input 
            type='password'
            name='password'
            className='form-control'
            placeholder='password'
            value={ user.password }
            onChange={ (e) => handleChange(e) }
            required
           />
          <button 
           disabled={user.username === ''|| user.password === '' ? true : false}>
                   Sign in
          </button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
