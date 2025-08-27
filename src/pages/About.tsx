import React from 'react';
import { Award, Users, Shield, Clock, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "20+", label: "Years in Business" },
    { number: "500+", label: "Completed Projects" },
    { number: "100%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Emergency Service" }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-700" />,
      title: "Quality Workmanship",
      description: "We use only premium materials and proven techniques to ensure your roof lasts for decades."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-700" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We work closely with you throughout every project."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-700" />,
      title: "Certified Professionals",
      description: "Our team consists of certified roofers with extensive training and experience."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-700" />,
      title: "Timely Service",
      description: "We respect your time and complete projects efficiently without compromising quality."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Roofing City</h1>
              <p className="text-xl mb-8 opacity-90">
                Built on trust, dedication, and craftsmanship, we’ve protected homes and businesses in our community for over 20 years with reliable roofing solutions that last.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-orange-500">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2003, Roofing City began as a small family business with a simple mission: 
                  provide honest, quality roofing services to our local community. What started with a 
                  small crew and a single truck has grown into one of the region's most trusted roofing companies.
                </p>
                <p>
                  Over the past two decades, we've weathered economic storms and literal storms, always 
                  standing by our commitment to quality workmanship and customer satisfaction. We've 
                  completed over 500 roofing projects, from simple repairs to complex commercial installations.
                </p>
                <p>
                  Today, our experienced team continues to uphold the same values that built our reputation: 
                  integrity, quality, and genuine care for our customers' needs.
                </p>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Family-owned and operated</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">BBB A+ rated business</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Manufacturer certified installers</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://i.imgur.com/TvIvgOJ.jpeg"
                alt="Roofing professionals at work"
                className="rounded-lg shadow-xl border-4 border-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;