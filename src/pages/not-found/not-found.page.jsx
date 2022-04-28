import { Link } from "react-router-dom";
import {ArrowBackOutlined} from '@material-ui/icons';
import './not-found.page.scss';
//import "../../app.scss";

const NotFoundPage = () => {

    return (

    <div className="container404">

    <div className='navbar404'>
          <div className='nav_container'>
             <div className='nav_left'>
                <img
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                   alt="" />
             </div>
          </div>
      </div>
      <div className="bodyInfo">
         <div className="description">
            <span>404</span>
            Ooops! We can't see the page you are looking for.
            <Link to="/home" className="link">
               <div className="backHome">
                  <ArrowBackOutlined />
                  Back to home
               </div>
            </Link>
         </div>
      </div>

    </div>
    
   );
}

export {NotFoundPage};