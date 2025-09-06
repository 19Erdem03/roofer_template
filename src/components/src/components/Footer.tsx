import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">RC</span>
              </div>
              <span className="text-2xl font-bold">Roofing City</span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Your trusted local roofing experts. We provide quality roofing solutions 
              with over 20 years of experience serving the community.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+1234567890" className="text-orange-500 hover:text-orange-400 transition-colors">
                <Phone size={24} />
              </a>
              <a href="mailto:info@roofingcity.com" className="text-orange-500 hover:text-orange-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone size={16} />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail size={16} />
                <span>info@roofingcity.com</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin size={16} />
                <span>123 Main St, Your City, ST 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Clock size={16} />
                <span>Mon-Fri: 7AM-6PM</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link 
                  to="/" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/reviews" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link 
                  to="/services" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Roof Replacement
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Roof Repair
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Gutter Installation
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Roof Inspection
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
          <p>&copy; 2025 Roofing City. All rights reserved. Licensed & Insured.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;