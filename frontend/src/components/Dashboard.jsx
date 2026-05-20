import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ShoppingCart, DollarSign, Package, Award, Leaf, Sparkles } from 'lucide-react';

const API_BASE = 'http://localhost:3000/api';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const response = await axios.get(`${API_BASE}/revenue`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching revenue:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-biblical-cream flex items-center justify-center">
        <div className="text-biblical-green animate-pulse flex flex-col items-center">
          <Leaf className="w-12 h-12 mb-2" />
          <p className="font-serif text-xl">Consulting the ledgers...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-biblical-cream flex items-center justify-center">
        <p className="text-red-600">Error loading financial data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-biblical-cream text-biblical-earth p-4 md:p-12 font-sans relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none -mr-20 -mt-20">
        <Leaf className="w-96 h-96 text-biblical-green rotate-45" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none -ml-20 -mb-20">
        <Leaf className="w-96 h-96 text-biblical-green -rotate-12" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-serif italic text-biblical-green">Revenue Dashboard</h1>
            <div className="mt-2 flex items-center gap-2 text-biblical-gold">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm uppercase tracking-widest font-bold">Temple Glow Financials</p>
            </div>
          </div>
          <div className="bg-biblical-green text-biblical-cream px-6 py-3 rounded-2xl font-semibold flex items-center gap-3 shadow-lg border border-biblical-gold/30">
            <Award className="w-6 h-6 text-biblical-gold" />
            <span className="tracking-wide">Steward's Overview</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-biblical-gold/10 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <DollarSign className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-biblical-gold/10 rounded-2xl text-biblical-gold">
                <DollarSign className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Total Revenue</h2>
            </div>
            <p className="text-5xl font-serif text-biblical-green">
              <span className="text-biblical-gold mr-1 text-3xl font-sans">$</span>
              {data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-biblical-gold/10 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-biblical-green/10 rounded-2xl text-biblical-green">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Total Orders</h2>
            </div>
            <p className="text-5xl font-serif text-biblical-green">{data.totalOrders}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-biblical-gold/10 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-biblical-olive/10 rounded-2xl text-biblical-olive">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Avg. Order</h2>
            </div>
            <p className="text-5xl font-serif text-biblical-green">
              <span className="text-biblical-gold mr-1 text-3xl font-sans">$</span>
              {data.averageOrderValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-biblical-gold/10 overflow-hidden">
          <div className="px-10 py-8 border-b border-biblical-cream flex items-center justify-between bg-gradient-to-r from-white to-biblical-cream/20">
            <h2 className="text-3xl font-serif italic flex items-center gap-4 text-biblical-green">
              <Package className="text-biblical-gold w-8 h-8" />
              Honored Provisions
            </h2>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-biblical-gold/10 rounded-full border border-biblical-gold/20">
              <Sparkles className="w-4 h-4 text-biblical-gold" />
              <span className="text-xs font-bold text-biblical-earth uppercase tracking-widest">Most Cherished</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-biblical-green/5 text-biblical-green uppercase text-xs tracking-[0.2em] font-bold">
                  <th className="px-10 py-5">Product Sanctuary</th>
                  <th className="px-10 py-5">Quantity Shared</th>
                  <th className="px-10 py-5 text-right">Revenue Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-biblical-cream/50">
                {data.popularIngredients.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-biblical-cream/10 transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-biblical-green/5 rounded-2xl flex items-center justify-center group-hover:bg-biblical-gold/10 transition-colors">
                          <Leaf className="w-6 h-6 text-biblical-olive/40" />
                        </div>
                        <span className="font-serif text-lg text-biblical-earth group-hover:text-biblical-green transition-colors">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <span className="bg-biblical-green text-biblical-cream px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                          {item.count}
                        </span>
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Acquisitions</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="font-mono font-bold text-xl text-biblical-olive">
                        <span className="text-biblical-gold mr-1">$</span>
                        {item.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm italic">
          "The heart of man plans his way, but the Lord establishes his steps." — Proverbs 16:9
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
