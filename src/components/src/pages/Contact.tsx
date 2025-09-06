import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    confirmTimeSlot: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [availableSlots, setAvailableSlots] = useState<Array<{datetime: string, date: string, time: string}>>([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Get the Supabase URL from environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl) {
        console.error('VITE_SUPABASE_URL is not configured');
        setSubmitMessage('Configuration error. Please call us at (123) 456-7890 to schedule your appointment.');
        return;
      }

      const functionUrl = `${supabaseUrl}/functions/v1/rapid-processor`;
      
      console.log('Calling Edge Function at:', functionUrl);
      console.log('Form data:', formData);

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(supabaseAnonKey && { 'Authorization': `Bearer ${supabaseAnonKey}` })
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          confirmTimeSlot: formData.confirmTimeSlot
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        setSubmitMessage(`Request failed with status ${response.status}. Please call us at (123) 456-7890.`);
        return;
      }

      const result = await response.json();
      console.log('Response data:', result);

      if (result.success) {
        setSubmitMessage(result.message || 'Appointment scheduled successfully! We\'ll contact you to confirm the details.');
        setShowTimeSlots(false);
        setAvailableSlots([]);
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          service: '', 
          message: '',
          preferredDate: '',
          preferredTime: '',
          confirmTimeSlot: ''
        });
      } else if (result.timeSlotTaken && result.availableSlots) {
        setAvailableSlots(result.availableSlots);
        setShowTimeSlots(true);
        setSubmitMessage('Your preferred time slot is unavailable. Please pick another date and time from the options above:');
      } else {
        setSubmitMessage(result.error || 'Failed to schedule appointment. Please call us at (123) 456-7890.');
      }

    } catch (error) {
      console.error('Contact form error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitMessage('Network error. Please check your connection and try again, or call us at (123) 456-7890.');
      } else {
        setSubmitMessage('Thank you for your message! Please call us at (123) 456-7890 to schedule your appointment, or we\'ll contact you within 24 hours.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeSlotSelection = (datetime: string) => {
    setFormData({
      ...formData,
      confirmTimeSlot: datetime
    });
    setShowTimeSlots(false);
    setSubmitMessage('Time slot selected. Click "Schedule Appointment" to confirm your booking.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Reset time slot selection if user changes date or time
    if (e.target.name === 'preferredDate' || e.target.name === 'preferredTime') {
      setShowTimeSlots(false);
      setAvailableSlots([]);
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        confirmTimeSlot: ''
      });
      return;
    }
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  // Generate time slots (7 AM to 6 PM, every 30 minutes)
  const timeSlots = [];
  for (let hour = 7; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      timeSlots.push({ value: timeString, label: displayTime });
    }
  }
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-700" />,
      title: "Phone",
      details: "(123) 456-7890",
      action: "tel:+1234567890"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-700" />,
      title: "Email", 
      details: "info@roofingcity.com",
      action: "mailto:info@roofingcity.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-700" />,
      title: "Address",
      details: "123 Main Street, Your City, ST 12345",
      action: "#"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-700" />,
      title: "Hours",
      details: "Mon-Fri: 7AM-6PM, Sat: 8AM-4PM",
      action: "#"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Ready to get started on your roofing project? Get in touch for your free estimate today
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Your Free Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="roof-replacement">Roof Replacement</option>
                    <option value="roof-repair">Roof Repair</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="gutters">Gutter Services</option>
                    <option value="inspection">Roof Inspection</option>
                    <option value="storm-damage">Storm Damage</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required
                      min={today}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Available Time Slots */}
                {showTimeSlots && availableSlots.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Alternative Times</h3>
                    <p className="text-sm text-gray-600 mb-4">Here are the closest available time slots to your preferred time:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleTimeSlotSelection(slot.datetime)}
                          className="text-left p-3 border border-blue-300 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition-colors bg-white"
                        >
                          <div className="font-medium text-gray-900">{slot.date}</div>
                          <div className="text-blue-700">{slot.time}</div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Can't find a suitable time? Call us at (123) 456-7890 for more options.
                    </p>
                  </div>
                )}

                {/* Confirmation message for selected time slot */}
                {formData.confirmTimeSlot && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Selected: {new Date(formData.confirmTimeSlot).toLocaleDateString()} at{' '}
                        {new Date(formData.confirmTimeSlot).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
                    placeholder="Please describe your roofing needs..."
                  ></textarea>
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.includes('error') || submitMessage.includes('Failed') || submitMessage.includes('Network')
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 ${
                    formData.confirmTimeSlot 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  <Send size={20} />
                  <span>
                    {isSubmitting 
                      ? 'Scheduling...' 
                      : formData.confirmTimeSlot 
                        ? 'Confirm Appointment' 
                        : 'Schedule Appointment'
                    }
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Ready to protect your investment? Contact us today for a free inspection and quote. 
                  We respond to all inquiries within 24 hours.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      {info.icon}
                      <div>
                        <div className="font-semibold text-gray-900">{info.title}</div>
                        <a 
                          href={info.action}
                          className="text-gray-600 hover:text-blue-700 transition-colors"
                        >
                          {info.details}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-orange-600 text-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Emergency Service</h3>
                <p className="mb-6 opacity-90">
                  Storm damage or urgent leak? We offer 24/7 emergency roofing services to protect your property.
                </p>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  <span>Emergency Hotline</span>
                </a>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Roofing City?</h3>
                <div className="space-y-4">
                  {[
                    "Free quotes and inspections",
                    "Licensed and fully insured", 
                    "5-year workmanship warranty",
                    "Emergency service available",
                    "Local family-owned business"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Service Areas</h2>
            <p className="text-xl opacity-90">Proudly serving the greater metropolitan area</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              "Downtown", "Westside", "East Side", "Suburbs",
              "Industrial District", "Historic District", "Northside", "Southside"
            ].map((area, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <span className="font-medium">{area}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-blue-100">
              Don't see your area? Call us at (123) 456-7890 - we may still be able to help!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;