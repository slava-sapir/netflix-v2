import React, {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCurrentUser } from '../../store/actions/user';
import './navbar.scss';
import SearchIcon from '@material-ui/icons/Search';
import Notifications from '@material-ui/icons/Notifications';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const Navbar = () => {
    const [isScrolled, setISscrolled] = useState(false);
    //console.log(window.pageYOffset);
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/home');
    }

    useEffect( () => {
      window.onscroll = () => {
        setISscrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }
  }, []);
    
  return (
    <div className={ isScrolled ? 'navbar scrolled' :  'navbar' }>
        <div className='container'>
            <div className='left'>
                <img  
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=""
                />
                <Link to="/" className="link">
                <span>Homepage</span>
                </Link>

                {currentUser && 
                  <div>
                    <Link to="/movies" className="link">
                    <span className="navbarmainLinks">Movies</span>
                    </Link>
                    <Link to="/series" className="link">
                    <span className="navbarmainLinks">Series</span>
                    </Link>
                  </div>
                }

            </div>

           { !currentUser && 
              <div className='right'>
                <Link to="/register" className="link">
                <button className='loginButton'>
                  <span>Sign Up</span>
                </button>
                </Link>
                <Link to="/login" className="link">
                <button className='loginButton'>
                  <span>Sign In</span>
                </button>
                </Link>
              </div>
           }

           { currentUser && 
              <div className='right'>
                <Link to="/" className="link">
                <button className='loginButton' onClick={() => logout()}>
                  <span>Sign Out</span>
                </button>
                </Link>
              </div>
           }
            
        </div>
    </div>
  );
}

export default Navbar;