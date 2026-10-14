import {
  FaGoogle,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="app-footer">
    <div className="social-icons-list">
      <button className="social-icon-button" type="button">
        <FaGoogle className="social-icon" />
      </button>
      <button className="social-icon-button" type="button">
        <FaTwitter className="social-icon" />
      </button>
      <button className="social-icon-button" type="button">
        <FaInstagram className="social-icon" />
      </button>
      <button className="social-icon-button" type="button">
        <FaYoutube className="social-icon" />
      </button>
    </div>
    <p className="contact-us-text">Contact us</p>
  </footer>
)

export default Footer
