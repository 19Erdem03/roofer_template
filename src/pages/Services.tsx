import React from 'react';
import { Home, Wrench, Zap, Droplets, Search, Store as Storm, Shield, Award, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Home className="w-12 h-12 text-blue-700" />,
      title: "Roof Replacement",
      description: "Complete roof replacement using premium materials with manufacturer warranties up to 30 years.",
      features: ["Premium shingles", "Structural assessment", "Permit handling", "Cleanup included"],
      price: "Starting at $8,000"
    },
    {
      icon: <Wrench className="w-12 h-12 text-blue-700" />,
      title: "Roof Repair",
      description: "Expert repairs for leaks, damaged shingles, flashing issues, and storm damage restoration.",
      features: ["Leak detection", "Shingle replacement", "Flashing repair", "Same-day service"],
      price: "Starting at $300"
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-700" />,
      title: "Emergency Services",
      description: "24/7 emergency response for urgent roofing issues including tarping and temporary fixes.",
      features: ["24/7 availability", "Emergency tarping", "Storm response", "Insurance claims"],
      price: "Call for quote"
    },
    {
      icon: <Droplets className="w-12 h-12 text-blue-700" />,
      title: "Gutter Services",
      description: "Complete gutter installation, repair, and maintenance to protect your foundation.",
      features: ["Seamless gutters", "Downspout installation", "Gutter guards", "Maintenance plans"],
      price: "Starting at $1,200"
    },
    {
      icon: <Search className="w-12 h-12 text-blue-700" />,
      title: "Roof Inspection",
      description: "Comprehensive roof inspections with detailed reports for maintenance or claims.",
      features: ["Drone inspection", "Detailed report", "Photo documentation", "Maintenance plan"],
      price: "Starting at $150"
    },
    {
      icon: <Storm className="w-12 h-12 text-blue-700" />,
      title: "Storm Damage",
      description: "Specialized storm damage assessment and restoration with insurance claim assistance.",
      features: ["Insurance coordination", "Emergency repairs", "Complete restoration", "Wind/hail damage"],
      price: "Insurance covered"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Comprehensive roofing solutions for residential and commercial properties. 
            Quality workmanship backed by industry-leading warranties.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700 mb-4">{service.price}</div>
                      <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                        Get Free Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and professional from start to finish</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Free Inspection", description: "We assess your roof and provide a detailed quote" },
              { step: "2", title: "Project Planning", description: "We create a timeline and secure permits if needed" },
              { step: "3", title: "Quality Installation", description: "Our certified team completes your project efficiently" },
              { step: "4", title: "Final Walkthrough", description: "We ensure everything meets our high standards" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Warranty & Guarantees</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 mt-1 text-orange-500" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Workmanship Warranty</h3>
                    <p className="text-blue-100">5-year guarantee on all labor and installation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="w-6 h-6 mt-1 text-orange-500" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Material Warranties</h3>
                    <p className="text-blue-100">Up to 30-year manufacturer warranties on premium materials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 mt-1 text-orange-500" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Satisfaction Guarantee</h3>
                    <p className="text-blue-100">100% satisfaction or we'll make it right</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Why Our Warranty Matters</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span>Peace of mind for years to come</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span>Protection against defects</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span>Transferable to new homeowners</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span>Local company you can trust</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;