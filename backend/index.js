const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Biblical Skincare Sales API is running.');
});

// Skincare products mapping endpoint
app.get('/api/skincare-products', (req, res) => {
  const query = `SELECT * FROM biblical_skincare_products ORDER BY name ASC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Sales endpoints
app.post('/api/sales', (req, res) => {
  let { skincare_product, amount, scripture } = req.body;

  if (!skincare_product || !amount) {
    return res.status(400).json({ error: 'skincare_product and amount are required.' });
  }

  // Helper function to insert sale
  const insertSale = (finalScripture) => {
    const query = `INSERT INTO sales (skincare_product, amount, scripture) VALUES (?, ?, ?)`;
    db.run(query, [skincare_product, amount, finalScripture], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        skincare_product,
        amount,
        scripture: finalScripture
      });
    });
  };

  if (scripture) {
    // If scripture is provided explicitly, use it
    insertSale(scripture);
  } else {
    // Otherwise, try to find contextually relevant scripture from mapping
    const query = `SELECT scripture FROM biblical_skincare_products WHERE name = ? COLLATE NOCASE`;
    db.get(query, [skincare_product], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      let finalScripture;
      if (row) {
        finalScripture = row.scripture;
      } else {
        // Fallback if product not found in mapping
        finalScripture = "Psalm 104:15 - ...and oil to make his face shine, and bread that sustains his heart.";
      }
      insertSale(finalScripture);
    });
  }
});

app.get('/api/sales', (req, res) => {
  const query = `SELECT * FROM sales ORDER BY created_at DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Revenue Dashboard endpoint
app.get('/api/revenue', (req, res) => {
  const summaryQuery = `SELECT SUM(amount) as totalRevenue, COUNT(*) as totalOrders FROM sales`;
  const popularQuery = `
    SELECT s.skincare_product as name, COUNT(*) as count, SUM(s.amount) as revenue, p.price
    FROM sales s
    LEFT JOIN biblical_skincare_products p ON s.skincare_product = p.name
    GROUP BY s.skincare_product
    ORDER BY count DESC
    LIMIT 5
  `;
  const revenueRankQuery = `
    SELECT s.skincare_product as name, SUM(s.amount) as revenue, p.price
    FROM sales s
    LEFT JOIN biblical_skincare_products p ON s.skincare_product = p.name
    GROUP BY s.skincare_product
    ORDER BY revenue DESC
    LIMIT 5
  `;
  const dailyQuery = `SELECT DATE(created_at) as date, SUM(amount) as revenue, COUNT(*) as count FROM sales GROUP BY date ORDER BY date ASC`;
  const scriptureQuery = `SELECT scripture, COUNT(*) as count FROM sales GROUP BY scripture ORDER BY count DESC LIMIT 5`;

  db.get(summaryQuery, [], (err, summary) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all(popularQuery, [], (err, popular) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log('Popular results from DB:', popular);

      db.all(revenueRankQuery, [], (err, revenueRank) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(dailyQuery, [], (err, daily) => {
          if (err) return res.status(500).json({ error: err.message });

          db.all(scriptureQuery, [], (err, scriptures) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const totalRevenue = Number((summary.totalRevenue || 0).toFixed(2));
            const totalOrders = summary.totalOrders || 0;
            const averageOrderValue = totalOrders > 0 ? Number((totalRevenue / totalOrders).toFixed(2)) : 0;
            
            res.json({
              totalRevenue,
              totalOrders,
              averageOrderValue,
              popularIngredients: popular.map(p => ({
                ...p,
                revenue: Number(p.revenue.toFixed(2))
              })),
              topRevenueProducts: revenueRank.map(p => ({
                ...p,
                revenue: Number(p.revenue.toFixed(2))
              })),
              salesByDay: daily.map(d => ({
                ...d,
                revenue: Number(d.revenue.toFixed(2))
              })),
              scriptureDistribution: scriptures
            });
          });
        });
      });
    });
  });
});

// Subscription endpoints
app.get('/api/subscription-plans', (req, res) => {
  const query = `SELECT * FROM subscription_plans`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/api/subscriptions', (req, res) => {
  const { email, plan_type } = req.body;

  if (!email || !plan_type) {
    return res.status(400).json({ error: 'email and plan_type are required.' });
  }

  const query = `INSERT INTO subscriptions (email, plan_type, status) VALUES (?, ?, 'active')`;
  db.run(query, [email, plan_type], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      email,
      plan_type,
      status: 'active',
      start_date: new Date().toISOString()
    });
  });
});

app.get('/api/subscriptions', (req, res) => {
  const query = `SELECT * FROM subscriptions WHERE status = 'active' ORDER BY start_date DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.put('/api/subscriptions/:id/cancel', (req, res) => {
  const { id } = req.params;
  const query = `UPDATE subscriptions SET status = 'cancelled' WHERE id = ?`;
  db.run(query, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }
    res.json({ message: 'Subscription cancelled successfully.', id });
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
