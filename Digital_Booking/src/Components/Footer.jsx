import React from "react";
import logo from "../assets/images/logo1.png";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="logoSlogan">
				<img src={logo} id="logoFooter" alt="DB🎷" className="logo" width={80} height={50} />
				<p className="Pfooter">Lleva la musica con vos</p>
				<p className="copyright" style={{display: "inline-block"}}>© 2023 Digital Booking</p>
			</div>
			{/*<img src="logoconSlogan.png" id="logoFooter" alt="DB🎷" width={200} />*/}
		</footer>
	);
};

export default Footer;
