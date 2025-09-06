import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, Phone, CheckCircle, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-700" />,
      title: "Licensed & Insured",
      description: "Fully licensed contractors with comprehensive insurance coverage"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-700" />,
      title: "20+ Years Experience", 
      description: "Two decades of roofing expertise in residential and commercial projects"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-700" />,
      title: "Local Experts",
      description: "Community-focused team that understands local weather challenges"
    }
  ];

  const services = [
    "Roof Replacement",
    "Roof Repair", 
    "Emergency Roofing",
    "Gutter Installation",
    "Roof Inspection",
    "Storm Damage Repair"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="relative bg-cover bg-center h-screen flex items-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/259685/pexels-photo-259685.jpeg?auto=compress&cs=tinysrgb&w=1200")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-slate-800/60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Expert Roofing<br />
              <span className="text-orange-500">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Protecting your home with quality craftsmanship and reliable service for over 20 years
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-all transform hover:scale-105"
              >
                <Phone size={20} />
                <span>Call Now: (123) 456-7890</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Roofing City?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering exceptional roofing services with unmatched quality and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Roofing Services</h2>
              <p className="text-lg text-gray-600 mb-8">
                From minor repairs to complete roof replacements, we handle all your roofing needs 
                with professional expertise and quality materials.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
              
              <Link
                to="/services"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                View All Services
              </Link>
            </div>
            
            <div className="relative">
              <img
                src="https://i.imgur.com/tben7zP.jpeg"
                alt="Professional roofing work"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center space-x-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-600 mb-6 italic">
              "Roofing City did an outstanding job replacing our roof. Their team was professional, 
              efficient, and cleaned up perfectly. Highly recommend them for any roofing needs!"
            </p>
            <div className="text-gray-900 font-semibold">Sarah Johnson</div>
            <div className="text-gray-500">Homeowner</div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/reviews"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free estimate today and discover why thousands of homeowners trust Roofing City
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1234567890"
              className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-all"
            >
              <span>Call For Free Quote</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"
            >
              Free Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;