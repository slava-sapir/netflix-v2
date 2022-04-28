import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import User from '../../models/user';
import AuthenticationService from './../../services/authentication.service';
import './register.scss';

export default function Register() {
  
  const [user, setUser] = useState( new User('', '', ''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

    const currentUser = useSelector(state => state.user);
    const navigate = useNavigate();

    //mounted
    useEffect(() => {
       if(currentUser?.id) {
           //navigate
           navigate('/login');
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

    const handleRegister = (e) => {

        e.preventDefault();
        setSubmitted(true);

        if(!user.username || !user.password || !user.name) {
            return;
        }
        setLoading(true);

        AuthenticationService.register(user).then(_ => {
            navigate('/login');
        }).catch(error => {
            console.log(error);
            if(error?.status === 409) {
                setErrorMessage('Username or password not valid!');
            } else {
                setErrorMessage('User already exist!');
            }
           setLoading(false);
        });
       
    };

  return (
    <div className='register'>
        <div className='top'>
            <div className='wrapper'>
            <img className='logo'
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
             alt=""
             />
             <button className='loginButton'>Sign In</button>
           </div>
        </div>


        <div className="container">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
            Ready to watch? Enter your email to create or restart your membership.
            </p>
            
            { errorMessage &&
            <div className="alert">
              <span className="closebtn" onClick={() => setErrorMessage('')}>&times;</span> 
              {errorMessage}
            </div>
            }

             <form
              onSubmit={ (e) => handleRegister(e) }
              noValidate
             >
              <input 
               type="text" 
               placeholder='name'
               name='name'
               value={ user.name }
               onChange={ (e) => handleChange(e) }
               required
               />
              <input 
               type="text" 
               placeholder='username'
               name='username'
               value={ user.username }
               onChange={ (e) => handleChange(e) }
               required
               />
              <input 
               type="password" 
               placeholder='password'
               name='password'
               value={ user.password }
               onChange={ (e) => handleChange(e) }
               required
               />
              <button 
               disabled={user.name === ''|| user.password === '' || user.username === '' ? true : false}>
                  Sign Up
              </button>
             </form>

        </div>
    </div>
  
  );
}
