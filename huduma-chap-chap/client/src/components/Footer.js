import React from 'react';
import { FaFacebook, FaInstagram} from "react-icons/fa"

const theFooter = (props) =>{
return (
    <footer className="footer">
      <hr></hr>
    <div className="row welcome text-center">
  <div className="col-12">
      <h1 className="display-7">Contact Us</h1>
  </div>

<div className="col-md-6 col-xs-12 col-sm-6">
 <br></br>
<p> P.O Box 3565-00100, Nairobi, Kenya</p>
<p>Flamingo Towers, 4th Floor Wing A, Mara Road, Upper Hill</p>
<p>Call us at <a href="#">+254123456789</a></p>
<p>Email us at <a href="mailto:info@premiercamelmilk.com">info@eService.com</a> </p>
</div>
<div className="col-md-6 col-xs-12 col-sm-6">
  <br></br>
<p>Find Us On</p>
<a href="#"><FaInstagram size="40px" color="black"/></a>
<a href="#"><FaFacebook size="40px" color="black"/></a>
</div>
</div>
      
    </footer>
);


}

export default theFooter;