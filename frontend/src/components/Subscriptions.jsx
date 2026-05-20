import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Leaf, Sparkles, CheckCircle2, Calendar, Mail, Package, ShieldCheck } from 'lucide-react';

const API_BASE = 'http://localhost:3000/api'; // Using 3001 for development, will change to 3000 before finishing

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plansRes, subsRes] = await Promise.all([
        axios.get(`${API_BASE}/subscription-plans`),
        axios.get(`${API_BASE}/subscriptions`)
      ]);
      setPlans(plansRes.data);
      setActiveSubscriptions(subsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      setLoading(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !selectedPlan) {
      setMessage({ type: 'error', text: 'Please provide email and select a plan.' });
      return;
    }

    try {
      await axios.post(`${API_BASE}/subscriptions`, {
        email,
        plan_type: selectedPlan.name
      });
      setMessage({ type: 'success', text: `Successfully subscribed to ${selectedPlan.name}!` });
      setEmail('');
      setSelectedPlan(null);
      fetchData(); // Refresh list
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Subscription failed:', error);
      setMessage({ type: 'error', text: 'Subscription failed. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-biblical-cream flex items-center justify-center">
        <div className="text-biblical-green animate-pulse flex flex-col items-center">
          <Leaf className="w-12 h-12 mb-2" />
          <p className="font-serif text-xl">Preparing your sacred journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-biblical-cream text-biblical-earth pb-20">
      {/* Header */}
      <header className="bg-biblical-green text-biblical-cream py-16 px-4 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 p-4">
            {[...Array(12)].map((_, i) => <Leaf key={i} className="w-24 h-24" />)}
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif mb-4 italic !text-biblical-cream">Sacred Subscriptions</h1>
          <p className="text-xl font-light tracking-widest uppercase text-biblical-cream/80">Continuous Anointing for Your Temple</p>
          <div className="mt-6 flex justify-center gap-2 text-biblical-gold">
            <Sparkles className="w-5 h-5" />
            <span>Pure. Sacred. Perpetual.</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {message && (
          <div className={`mb-8 p-4 rounded-xl text-center font-semibold border-2 ${
            message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Subscription Plans */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif italic mb-4">Choose Your Path</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a recurring blessing that best suits your spirit's needs. Each plan is crafted with prayer and premium biblical ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-3xl p-8 border-2 transition-all cursor-pointer flex flex-col h-full ${
                  selectedPlan?.id === plan.id ? 'border-biblical-gold shadow-xl scale-105' : 'border-biblical-gold/10 hover:border-biblical-gold/30 shadow-md'
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-serif text-biblical-green mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-biblical-gold">
                    ${plan.price}
                    <span className="text-sm font-normal text-gray-400"> / cycle</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 flex-grow">{plan.description}</p>
                
                <div className="space-y-3 mb-8">
                  {plan.features.split(',').map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-biblical-green shrink-0" />
                      <span>{feature.trim()}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    selectedPlan?.id === plan.id 
                    ? 'bg-biblical-gold text-biblical-earth' 
                    : 'bg-biblical-green text-biblical-cream hover:bg-biblical-olive'
                  }`}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Subscribe Form */}
        <section className="max-w-xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-xl border border-biblical-gold/20 mb-20">
          <div className="text-center mb-8">
            <Mail className="w-12 h-12 text-biblical-gold mx-auto mb-4" />
            <h2 className="text-3xl font-serif italic">Begin Your Anointing</h2>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-biblical-green uppercase tracking-widest mb-2 px-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vessel@example.com"
                className="w-full bg-biblical-cream/30 border border-biblical-gold/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-biblical-gold transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-biblical-green uppercase tracking-widest mb-2 px-1">Selected Plan</label>
              <div className="w-full bg-biblical-cream/10 border border-biblical-gold/10 rounded-2xl px-6 py-4 text-gray-500 italic">
                {selectedPlan ? selectedPlan.name : 'Please select a plan from above'}
              </div>
            </div>

            <button 
              type="submit"
              disabled={!selectedPlan || !email}
              className="w-full bg-biblical-green hover:bg-biblical-olive text-biblical-cream py-5 rounded-2xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              Confirm Subscription
            </button>
          </form>
        </section>

        {/* Active Subscriptions */}
        <section>
          <div className="flex items-center gap-3 mb-8 justify-center">
            <ShieldCheck className="text-biblical-green w-8 h-8" />
            <h2 className="text-3xl font-serif italic">Active Blessings</h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg border border-biblical-gold/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-biblical-green/5 text-biblical-green font-serif text-lg border-b border-biblical-gold/10">
                  <tr>
                    <th className="px-8 py-5">Subscribed Vessel</th>
                    <th className="px-8 py-5">Chosen Plan</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Start Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-biblical-cream/50">
                  {activeSubscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-biblical-cream/10 transition-colors group">
                      <td className="px-8 py-6 font-semibold text-biblical-earth flex items-center gap-3">
                        <div className="w-8 h-8 bg-biblical-green/10 rounded-full flex items-center justify-center text-biblical-green font-bold text-xs uppercase">
                          {sub.email[0]}
                        </div>
                        {sub.email}
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-biblical-gold/10 text-biblical-olive px-3 py-1 rounded-full text-sm font-bold border border-biblical-gold/20">
                          {sub.plan_type}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-green-600 text-sm font-semibold uppercase tracking-wider">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          {sub.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right text-sm text-gray-400">
                        {new Date(sub.start_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {activeSubscriptions.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-8 py-10 text-center text-gray-400 italic">
                        No active subscriptions found in the ledgers.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center mt-12 text-gray-400 text-sm italic">
        "Honor the Lord with your wealth and with the firstfruits of all your produce." — Proverbs 3:9
      </footer>
    </div>
  );
};

export default Subscriptions;
