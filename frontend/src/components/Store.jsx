import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Leaf, Droplets, Sparkles, History, ShoppingBag, ScrollText, CheckCircle2, ShieldCheck } from 'lucide-react';

const API_BASE = 'http://localhost:3000/api';

const SocialShare = ({ text, url }) => {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      link: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Pinterest',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M8 20c.5 0 .5-.5.5-1.5 0-1.5-1.5-2-1.5-3.5 0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 2.5-2 4.5-4.5 4.5-.5 0-1 0-1.5-.5" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      link: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
      color: 'hover:text-red-600'
    }
  ];

  return (
    <div className="flex gap-3 mt-3 justify-center md:justify-start">
      <span className="text-xs uppercase tracking-widest text-biblical-gold/40 font-semibold self-center">Share:</span>
      {shareLinks.map((share) => (
        <a
          key={share.name}
          href={share.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-biblical-gold/60 transition-all duration-300 transform hover:scale-110 ${share.color}`}
          title={`Share on ${share.name}`}
        >
          {share.icon}
        </a>
      ))}
    </div>
  );
};

function Store() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, salesRes] = await Promise.all([
        axios.get(`${API_BASE}/skincare-products`),
        axios.get(`${API_BASE}/sales`)
      ]);
      setProducts(productsRes.data);
      setSales(salesRes.data); // Show newest first
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handlePurchase = async (product) => {
    try {
      const response = await axios.post(`${API_BASE}/sales`, {
        skincare_product: product.name,
        amount: Math.floor(Math.random() * 30) + 20 // Random price for demo
      });
      setPurchaseStatus(`Successfully purchased ${product.name}!`);
      fetchData(); // Refresh sales history
      setTimeout(() => setPurchaseStatus(null), 3000);
    } catch (error) {
      console.error('Purchase failed:', error);
      setPurchaseStatus('Purchase failed. Please try again.');
      setTimeout(() => setPurchaseStatus(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-biblical-cream flex items-center justify-center">
        <div className="text-biblical-green animate-pulse flex flex-col items-center">
          <Leaf className="w-12 h-12 mb-2" />
          <p className="font-serif text-xl">Loading Temple Glow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-biblical-cream text-biblical-earth flex flex-col">
      {/* Header */}
      <header className="bg-biblical-green text-biblical-cream py-12 px-4 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 p-4">
             {[...Array(12)].map((_, i) => <Leaf key={i} className="w-24 h-24" />)}
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif mb-2 italic !text-biblical-cream">Temple Glow</h1>
          <p className="text-xl font-light tracking-widest uppercase text-biblical-cream/80">Skincare</p>
          <div className="mt-4 flex justify-center gap-2 text-biblical-gold">
            <Sparkles className="w-5 h-5" />
            <span>Pure. Sacred. Natural.</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        {purchaseStatus && (
          <div className="fixed top-4 right-4 z-50 bg-biblical-green text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce border-2 border-biblical-gold">
            <CheckCircle2 className="w-5 h-5" />
            {purchaseStatus}
          </div>
        )}

        {/* Product Catalog */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="text-biblical-green w-8 h-8" />
            <h2 className="text-3xl font-serif italic">Our Anointed Collection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-biblical-gold/20 flex flex-col">
                <div className="h-48 bg-biblical-green/5 flex items-center justify-center relative">
                  <Droplets className="w-16 h-16 text-biblical-olive/30" />
                  <div className="absolute bottom-4 left-4 bg-biblical-green text-biblical-cream px-3 py-1 rounded-full text-sm font-semibold border border-biblical-gold/30 shadow-sm">
                    ${(Math.random() * 20 + 25).toFixed(2)}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-serif mb-3 leading-tight">{product.name}</h3>
                  <div className="bg-biblical-cream/50 p-4 rounded-lg border-l-4 border-biblical-gold mb-4 italic text-sm text-gray-700">
                    "{product.scripture}"
                  </div>
                  <button 
                    onClick={() => handlePurchase(product)}
                    className="mt-auto w-full bg-biblical-green hover:bg-biblical-olive text-biblical-cream py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Acquire Product
                  </button>
                  <SocialShare 
                    text={`Check out this Temple Glow skincare: ${product.name} - "${product.scripture}"`} 
                    url={window.location.href} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sales History */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <History className="text-biblical-green w-8 h-8" />
            <h2 className="text-3xl font-serif italic">History of Blessings</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-biblical-gold/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-biblical-green/5 text-biblical-green font-serif text-lg">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Associated Scripture</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-biblical-cream">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-biblical-cream/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-biblical-earth">{sale.skincare_product}</td>
                      <td className="px-6 py-4 text-biblical-olive font-mono font-bold">${sale.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-2 max-w-md">
                            <ScrollText className="w-4 h-4 text-biblical-gold mt-1 shrink-0" />
                            <span className="text-sm italic text-gray-600">{sale.scripture}</span>
                          </div>
                          <SocialShare 
                            text={`I just blessed myself with ${sale.skincare_product} from Temple Glow! ${sale.scripture}`} 
                            url={window.location.href} 
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-xs text-gray-400">
                        {new Date(sale.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-biblical-earth text-biblical-cream py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-serif italic mb-2">Temple Glow</h2>
            <p className="text-sm text-biblical-cream/70 max-w-xs">
              Handcrafted skincare inspired by the botanical wisdom of the Holy Scriptures. 
              Sourced with reverence, prepared with prayer.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-biblical-gold uppercase text-xs tracking-widest">Connect</span>
              <a href="#" className="hover:text-biblical-gold transition-colors text-sm">Instagram</a>
              <a href="#" className="hover:text-biblical-gold transition-colors text-sm">Facebook</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-biblical-gold uppercase text-xs tracking-widest">Support</span>
              <a href="#" className="hover:text-biblical-gold transition-colors text-sm">Our Story</a>
              <a href="#" className="hover:text-biblical-gold transition-colors text-sm">Shipping</a>
            </div>
            <div className="flex flex-col gap-2 border-l border-biblical-cream/10 pl-12">
              <span className="font-semibold text-biblical-gold uppercase text-xs tracking-widest">Administration</span>
              <Link to="/admin" className="flex items-center gap-2 hover:text-biblical-gold transition-colors text-sm">
                <ShieldCheck className="w-4 h-4" />
                Revenue Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-biblical-cream/10 text-xs text-biblical-cream/40">
          &copy; {new Date().getFullYear()} Temple Glow Skincare. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Store;
