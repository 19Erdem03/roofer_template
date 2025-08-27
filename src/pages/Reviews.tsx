import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      location: "Downtown District",
      rating: 5,
      date: "December 2024",
      text: "Roofing City did an outstanding job replacing our roof. Their team was professional, efficient, and cleaned up perfectly. The project was completed on time and within budget. Highly recommend them for any roofing needs!",
      service: "Roof Replacement"
    },
    {
      name: "Mike Chen",
      location: "Westside",
      rating: 5,
      date: "November 2024", 
      text: "After storm damage, they responded quickly and handled everything with our insurance company. The repair work was flawless and they even helped us upgrade our gutters. Excellent customer service throughout the process.",
      service: "Storm Damage Repair"
    },
    {
      name: "Emily Rodriguez",
      location: "Suburbs",
      rating: 5,
      date: "October 2024",
      text: "We had a leak that other companies couldn't find. Roofing City's inspection was thorough and they fixed the problem permanently. Their warranty gave us peace of mind. Will definitely use them again.",
      service: "Roof Repair"
    },
    {
      name: "David Thompson", 
      location: "Industrial Area",
      rating: 5,
      date: "September 2024",
      text: "Outstanding work on our commercial building. They worked around our business hours and completed the project with minimal disruption. Professional team with excellent attention to detail.",
      service: "Commercial Roofing"
    },
    {
      name: "Lisa Park",
      location: "East Side",
      rating: 5,
      date: "August 2024",
      text: "From the initial estimate to project completion, everything was handled professionally. The crew was courteous, the work was top-notch, and they cleaned up better than I expected. Highly satisfied!",
      service: "Roof Replacement"
    },
    {
      name: "Robert Williams",
      location: "Historic District", 
      rating: 5,
      date: "July 2024",
      text: "They helped us restore the original character of our historic home's roof while upgrading it with modern materials. The craftsmanship was exceptional and they respected the home's heritage.",
      service: "Historic Restoration"
    }
  ];

  const totalReviews = 127;
  const averageRating = 4.9;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Customer Reviews</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            See what our satisfied customers have to say about their experience with Roofing City
          </p>
          
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">{averageRating}</div>
              <div className="flex justify-center space-x-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-blue-100">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">{totalReviews}</div>
              <div className="text-blue-100 mt-2">Total Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gray-300" />
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{review.text}</p>
                
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                  <div className="text-sm text-blue-700 font-medium mt-1">{review.service}</div>
                  <div className="text-xs text-gray-400 mt-1">{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Review Breakdown</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {[
              { stars: 5, percentage: 89 },
              { stars: 4, percentage: 8 },
              { stars: 3, percentage: 2 },
              { stars: 2, percentage: 1 },
              { stars: 1, percentage: 0 }
            ].map((rating) => (
              <div key={rating.stars} className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1 w-20">
                  <span className="text-gray-700">{rating.stars}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-700 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 w-12 text-right">{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Satisfied Customers</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience the quality and service that has earned us these outstanding reviews
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1234567890"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Call For Free Quote
            </a>
            <a
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"
            >
              Request Quote Online
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;