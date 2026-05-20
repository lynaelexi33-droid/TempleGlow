import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sparkles, ScrollText, Package, ArrowRight, Heart, Droplets, ShieldCheck } from 'lucide-react';

const IngredientCard = ({ name, scripture, description, icon: Icon }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-biblical-gold/10 hover:shadow-md transition-shadow">
    <div className="bg-biblical-green/5 w-16 h-16 rounded-full flex items-center justify-center mb-6">
      <Icon className="text-biblical-green w-8 h-8" />
    </div>
    <h3 className="text-2xl font-serif mb-3 text-biblical-earth">{name}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    <div className="bg-biblical-cream/50 p-4 rounded-lg border-l-4 border-biblical-gold italic text-sm text-gray-700">
      "{scripture}"
    </div>
  </div>
);

function LandingPage() {
  return (
    <div className="min-h-screen bg-biblical-cream text-biblical-earth">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-biblical-green text-biblical-cream">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 gap-8 p-8">
            {[...Array(24)].map((_, i) => <Leaf key={i} className="w-32 h-32" />)}
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 text-biblical-gold mb-6 animate-pulse">
            <Sparkles className="w-6 h-6" />
            <span className="uppercase tracking-[0.3em] font-semibold">Sacred Botanical Wisdom</span>
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 italic !text-biblical-cream drop-shadow-lg">Temple Glow</h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Honor the vessel of your spirit with handcrafted skincare inspired by the botanical treasures of the Holy Scriptures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/store" 
              className="bg-biblical-gold hover:bg-biblical-olive text-biblical-earth px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
            >
              Shop the Collection <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#philosophy" 
              className="bg-transparent border-2 border-biblical-cream/30 hover:border-biblical-cream px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center"
            >
              Our Philosophy
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 px-4 max-w-5xl mx-auto text-center">
        <Heart className="w-12 h-12 text-biblical-gold mx-auto mb-8" />
        <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">The Body is a Temple</h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          We believe that skincare is more than a routine—it is an act of stewardship. 
          By combining ancient biblical wisdom with modern natural science, we create 
          anointed blends that nourish your skin and uplift your soul.
        </p>
      </section>

      {/* Ingredients Grid */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 italic">Anointed Ingredients</h2>
            <p className="text-biblical-gold font-semibold uppercase tracking-widest text-sm">Sourced from the Promised Land & Beyond</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <IngredientCard 
              name="Frankincense"
              icon={Sparkles}
              description="Prized by kings and offered to the Christ child, frankincense resin is a powerful rejuvenator for mature skin."
              scripture="They presented unto him gifts; gold, and frankincense, and myrrh. - Matthew 2:11"
            />
            <IngredientCard 
              name="Olive Oil"
              icon={Droplets}
              description="The 'liquid gold' of the Mediterranean, providing deep hydration and symbolic of peace and anointing."
              scripture="Anointing him with oil in the name of the Lord. - James 5:14"
            />
            <IngredientCard 
              name="Myrrh"
              icon={ShieldCheck}
              description="A sacred resin used for centuries for its purifying and healing properties, perfect for soothing sensitive skin."
              scripture="All thy garments smell of myrrh, and aloes, and cassia. - Psalm 45:8"
            />
            <IngredientCard 
              name="Hyssop"
              icon={Leaf}
              description="A biblical herb of purification, hyssop extract helps clear the complexion and refresh the spirit."
              scripture="Purge me with hyssop, and I shall be clean. - Psalm 51:7"
            />
          </div>
        </div>
      </section>

      {/* Subscription Teaser */}
      <section className="py-24 px-4 bg-biblical-earth text-biblical-cream overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-biblical-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <div className="bg-biblical-gold text-biblical-earth inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Coming Soon
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 italic">The Monthly Anointing Box</h2>
            <p className="text-xl text-biblical-cream/80 mb-8 leading-relaxed">
              A curated selection of sacred oils, cleansers, and balms delivered to your temple every new moon. 
              Be the first to know when we launch our subscription journey.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-white/20 rounded-l-xl px-6 py-4 flex-grow focus:outline-none focus:border-biblical-gold transition-colors"
              />
              <button className="bg-biblical-gold hover:bg-biblical-olive text-biblical-earth px-8 py-4 rounded-r-xl font-bold transition-colors">
                Notify Me
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-80 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform">
                <Package className="w-24 h-24 text-biblical-gold/50" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-64 bg-biblical-green/50 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform">
                <ScrollText className="w-16 h-16 text-biblical-cream/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-4xl font-serif mb-8">Ready to start your sacred journey?</h2>
        <Link 
          to="/store" 
          className="inline-flex items-center gap-3 bg-biblical-green hover:bg-biblical-olive text-biblical-cream px-12 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-biblical-green/20"
        >
          Enter the Store <ShoppingBag className="w-6 h-6" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-biblical-earth text-biblical-cream py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-serif italic mb-2">Temple Glow</h2>
            <p className="text-sm text-biblical-cream/70 max-w-xs">
              Handcrafted skincare inspired by the botanical wisdom of the Holy Scriptures. 
            </p>
          </div>
          <div className="flex gap-12">
            <Link to="/store" className="hover:text-biblical-gold transition-colors text-sm">Store</Link>
            <Link to="/admin" className="hover:text-biblical-gold transition-colors text-sm">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper to avoid import errors if ShoppingBag is not imported
const ShoppingBag = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

export default LandingPage;
