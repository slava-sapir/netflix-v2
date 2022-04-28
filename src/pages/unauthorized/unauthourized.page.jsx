import { Link } from "react-router-dom";
import {ArrowBackOutlined} from '@material-ui/icons';
import './unauthourized.page.scss';
//import "../../app.scss";

const UnauthourizedPage = () => {

    return (

    <div className="container401">

    <div className='navbar401'>
          <div className='nav_container401'>
             <div className='nav_left401'>
                <img
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                   alt="" />
             </div>
          </div>
      </div>
      <div className="bodyInfo401">
         <div className="description401">
            <span>401</span>
            Ooops! Please sign in/sign up to see this page.
            <Link to="/home" className="link">
               <div className="backHome401">
                  <ArrowBackOutlined />
                  Back to home
               </div>
            </Link>
         </div>
      </div>

    </div>
    
   );
}

export {UnauthourizedPage};