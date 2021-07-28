import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
    <div id="footerdiv">
      <p>Copyright ⓒ {year}</p>
      <Link to={"/terms"} >Terms & Conditions</Link>
      <Link to={"/policy"} >Terms & Conditions</Link>
    </div>
    </footer>
  );
}

export default Footer;