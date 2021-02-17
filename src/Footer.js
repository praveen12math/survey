import React from 'react';
import {Link} from "react-router-dom"


const Footer = () => {
    return ( 
        <>
        <br/><br/><br/><br/>
            <div style={{textAlign:"center",fontSize:"200%"}}><a href="https://github.com/praveen12math" className="text-dark" style={{textDecoration:"none"}}>
    <i class="fab fa-github">&nbsp;&nbsp;
    </i></a> <a href="https://github.com/beingabhi007"><i class="fab fa-github text-dark"></i></a></div>
    <span className="fixed-bottom" style={{textAlign:"end"}}><Link to="/admin" style={{textDecoration:"none"}}><h5 style={{color:"black"}}>Admin</h5></Link></span>
        </>
     );
}
 
export default Footer;