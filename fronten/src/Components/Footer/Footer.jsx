import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      alert('Thank you for contacting us!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='footer'>
      <div className="footer-content">

        {/* LOGO */}
        <div className="footer-logo">
          <img src={footer_logo} alt="Logo" />
          <p>SHOPSY</p>
        </div>

        {/* INTERNAL LINKS */}
        <ul className='footer-links'>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
        </ul>

        {/* CONTACT ME FORM */}
        <div className="footer-contact-form">
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="footer-socials">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <img src={pintester_icon} alt="Pinterest" />
          </a>
          <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copyright">
          <hr />
          <p>© 2025 Shopsy. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};
