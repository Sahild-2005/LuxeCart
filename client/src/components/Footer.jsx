import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            LuxeCart
          </Link>

          <p>
            A modern shopping experience built for
            quality, simplicity, and style.
          </p>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-column">

          <h4>Explore</h4>

          <Link to="/">Home</Link>

          <Link to="/products">
            Products
          </Link>

        </div>

        {/* ACCOUNT */}

        <div className="footer-column">

          <h4>Account</h4>

          <Link to="/admin/login">
            Admin Login
          </Link>

        </div>

        {/* CONTACT */}

        <div className="footer-column">

          <h4>Contact</h4>

          <span>Mumbai, India</span>

          <span>support@luxecart.com</span>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} LuxeCart.
          All rights reserved.
        </p>

        <p>
          Built with React, Node.js & MongoDB
        </p>

      </div>

    </footer>
  );
}

export default Footer;