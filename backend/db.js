const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'app.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    db.serialize(() => {
      // Create skincare products mapping table
      db.run(`CREATE TABLE IF NOT EXISTS biblical_skincare_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        scripture TEXT NOT NULL,
        price REAL
      )`, (err) => {
        if (err) {
          console.error('Error creating skincare products table', err.message);
        } else {
          console.log('Biblical skincare products table ready.');
          
          // Ensure price column exists if table was already there without it
          db.run(`ALTER TABLE biblical_skincare_products ADD COLUMN price REAL`, (err) => {
            if (err && !err.message.includes('duplicate column name')) {
              console.error('Error adding price column', err.message);
            }
            seedSkincareProducts();
          });
        }
      });

      // Create sales table (renamed ingredient_name to skincare_product)
      db.run(`CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skincare_product TEXT NOT NULL,
        amount REAL NOT NULL,
        scripture TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error('Error creating sales table', err.message);
        } else {
          console.log('Sales table ready.');
        }
      });

      // Create subscription plans table
      db.run(`CREATE TABLE IF NOT EXISTS subscription_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        price REAL NOT NULL,
        features TEXT
      )`, (err) => {
        if (err) {
          console.error('Error creating subscription plans table', err.message);
        } else {
          console.log('Subscription plans table ready.');
          seedSubscriptionPlans();
        }
      });

      // Create subscriptions table
      db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        plan_type TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        start_date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error('Error creating subscriptions table', err.message);
        } else {
          console.log('Subscriptions table ready.');
          seedSubscriptions();
        }
      });
    });
  }
});

function seedSubscriptionPlans() {
  const plans = [
    ['Essence of Eden', 'Essential biblical skincare routine', 29.99, 'Monthly delivery, Basic scripture guide'],
    ['Sacred Sanctuary', 'Deep healing and spiritual renewal', 59.99, 'Bi-weekly delivery, Advanced scripture guide, Prayer support'],
    ['Temple Radiance', 'The ultimate sacred skincare experience', 99.99, 'Weekly delivery, Personalized scripture guide, Prayer support, Ancient oils collection'],
    ['Monthly Anointing Box', 'A curated selection of sacred oils and scriptures delivered monthly', 49.99, 'Monthly delivery, 3 sacred oils, Scripture meditation cards']
  ];

  const stmt = db.prepare("INSERT OR REPLACE INTO subscription_plans (name, description, price, features) VALUES (?, ?, ?, ?)");
  plans.forEach((plan) => {
    stmt.run(plan);
  });
  stmt.finalize();
}

function seedSubscriptions() {
  const subscriptions = [
    ['sarah@example.com', 'Sacred Sanctuary', 'active'],
    ['john@example.com', 'Essence of Eden', 'active'],
    ['mary@example.com', 'Temple Radiance', 'active']
  ];

  const stmt = db.prepare("INSERT INTO subscriptions (email, plan_type, status) VALUES (?, ?, ?)");
  subscriptions.forEach((sub) => {
    // Check if seed data already exists to avoid duplicates on restart
    db.get("SELECT id FROM subscriptions WHERE email = ?", [sub[0]], (err, row) => {
      if (!row) {
        stmt.run(sub);
      }
    });
  });
}

function seedSkincareProducts() {
  const products = [
    ['Temple Glow Ancient Hyssop Cleanser', 'Psalm 51:7 - Purge me with hyssop, and I shall be clean; wash me, and I shall be whiter than snow.', 29.99],
    ['Temple Glow Sacred Frankincense & Myrrh Face Oil', 'Song of Solomon 3:6 - Who is this coming up from the wilderness like columns of smoke, perfumed with myrrh and frankincense...', 44.95],
    ['Temple Glow Aloe & Honey Healing Soothing Gel', 'Psalm 45:8 - All your garments smell of myrrh and aloes and cassia...', 24.50],
    ['Temple Glow Olive Oil & Spikenard Radiant Body Balm', 'Psalm 104:15 - ...and oil to make his face shine, and bread that sustains his heart.', 34.99],
    ['Temple Glow Cinnamon & Cassia Spice Lip Salve', 'Exodus 30:23-24 - Take the following fine spices: 500 shekels of liquid myrrh, half as much of fragrant cinnamon... and 500 shekels of cassia.', 21.99],
    ['Temple Glow Biblical Wheat & Barley Gentle Scrub', 'Deuteronomy 8:8 - A land of wheat and barley, of vines and fig trees and pomegranates, a land of olive oil and honey.', 28.00],
    ['Temple Glow Pure Spikenard Anointing Cream', 'John 12:3 - Then Mary took about a pint of pure nard, an expensive perfume; she poured it on Jesus’ feet and wiped his feet with her hair.', 49.99]
  ];

  const stmt = db.prepare("INSERT OR REPLACE INTO biblical_skincare_products (name, scripture, price) VALUES (?, ?, ?)");
  products.forEach((product) => {
    stmt.run(product);
  });
  stmt.finalize();
}

module.exports = db;
