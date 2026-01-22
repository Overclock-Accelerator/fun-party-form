'use client';

import { useState } from 'react';

export default function PartyInvitation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guestCount: '1',
    dietaryPreferences: [] as string[],
    allergies: '',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: checked
        ? [...prev.dietaryPreferences, value]
        : prev.dietaryPreferences.filter(pref => pref !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-4">
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center animate-fade-in">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-xl text-gray-600 mb-8">
            {formData.attending === 'yes' 
              ? "We're thrilled you'll be joining us! We can't wait to celebrate together."
              : "We'll miss you at the party, but we understand. Hope to see you soon!"}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Edit Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-4 py-12">
      <div className="max-w-3xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎊</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            You're Invited!
          </h1>
          <p className="text-lg text-gray-600">
            Join us for an unforgettable celebration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
              placeholder="your.email@example.com"
            />
          </div>

          {/* RSVP */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Will you be attending? <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  required
                  checked={formData.attending === 'yes'}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-800">Yes, I'll be there! 🎉</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  required
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-800">Unfortunately, I can't make it</span>
              </label>
            </div>
          </div>

          {/* Guest Count - Only show if attending */}
          {formData.attending === 'yes' && (
            <>
              <div className="space-y-2">
                <label htmlFor="guestCount" className="block text-sm font-semibold text-gray-800">
                  Total Number of Guests (including yourself) <span className="text-rose-500">*</span>
                </label>
                <select
                  id="guestCount"
                  name="guestCount"
                  required
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="1">Just me</option>
                  <option value="2">2 guests (me + 1)</option>
                  <option value="3">3 guests (me + 2)</option>
                  <option value="4">4 guests (me + 3)</option>
                  <option value="5">5+ guests</option>
                </select>
              </div>

              {/* Dietary Preferences */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  Dietary Preferences
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'No Restrictions'].map((pref) => (
                    <label key={pref} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={pref}
                        checked={formData.dietaryPreferences.includes(pref)}
                        onChange={handleCheckboxChange}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-800">{pref}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Allergies/Special Dietary Needs */}
              <div className="space-y-2">
                <label htmlFor="allergies" className="block text-sm font-semibold text-gray-800">
                  Food Allergies or Special Dietary Requirements
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none text-gray-900 placeholder:text-gray-500"
                  placeholder="Please let us know about any specific allergies or dietary needs..."
                />
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-800">
                  Special Requests or Messages
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none text-gray-900 placeholder:text-gray-500"
                  placeholder="Any special requests or a message for the host..."
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit RSVP ✨
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>We can't wait to celebrate with you! 🥳</p>
        </div>
      </div>
    </div>
  );
}
