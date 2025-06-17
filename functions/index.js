const functions = require('firebase-functions');
const fetch = require('node-fetch');
const cors = require('cors')({ origin: true });

let accessToken = null;

// Login to ProphetX and cache token
async function loginToProphetX() {
  console.log('Logging in to ProphetX...');
  const loginRes = await fetch('https://cash.api.prophetx.co/partner/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: functions.config().prophetx.access_key,
      secret_key: functions.config().prophetx.secret_key
    })
  });

  if (!loginRes.ok) {
    const text = await loginRes.text();
    console.error('Login failed response:', text);
    throw new Error('Login failed');
  }

  const loginData = await loginRes.json();
  accessToken = loginData.data.access_token;
  console.log('ProphetX login successful');
}

// Ensure logged in
async function ensureLoggedIn() {
  if (!accessToken) {
    await loginToProphetX();
  }
}

exports.getBets = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await ensureLoggedIn();

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const fromTime = currentTimestamp - Math.floor(86400 * 2.5);

      const wagersRes = await fetch(`https://cash.api.prophetx.co/partner/v2/mm/get_wager_histories?from=${fromTime}&to=${currentTimestamp}&limit=1000&market_id=186`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!wagersRes.ok) {
        const text = await wagersRes.text();
        console.error('Wager fetch failed response:', text);
        if (wagersRes.status === 401) {
          accessToken = null;
          await ensureLoggedIn();
          return exports.getBets(req, res);
        }
        return res.status(500).json({ error: 'Wager fetch failed' });
      }

      const wagersData = await wagersRes.json();
      res.json(wagersData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
});

exports.getMarkets = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const eventId = req.query.event_id;
      if (!eventId) {
        return res.status(400).json({ error: 'Missing event_id' });
      }

      await ensureLoggedIn();

      const url = new URL('https://cash.api.prophetx.co/partner/v2/mm/get_markets');
      url.searchParams.append('event_id', eventId);

      const marketsRes = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!marketsRes.ok) {
        const text = await marketsRes.text();
        console.error('Market fetch failed response:', text);
        if (marketsRes.status === 401) {
          accessToken = null;
          await ensureLoggedIn();
          return exports.getMarkets(req, res);
        }
        return res.status(500).json({ error: 'Market fetch failed' });
      }

      const marketsData = await marketsRes.json();
      res.json(marketsData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
});