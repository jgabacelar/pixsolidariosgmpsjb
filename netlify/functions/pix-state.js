

const DEFAULT_STATE = { count: 0, goal: 100, updatedAt: null };

exports.handler = async (event) => {
  const store = getStore('pix-segueme');
  const adminPin = process.env.ADMIN_PIN || 'psjbsgm22';

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-pin',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    const data = await store.get('state', { type: 'json' });
    return { statusCode: 200, headers, body: JSON.stringify(data || DEFAULT_STATE) };
  }

  if (event.httpMethod === 'POST') {
    const pin = (event.headers['x-admin-pin'] || event.headers['X-Admin-Pin'] || '').trim();
    if (pin !== adminPin.trim()) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'PIN inválido' }) };
    }

    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'JSON inválido' }) };
    }

    const current = (await store.get('state', { type: 'json' })) || DEFAULT_STATE;

    const newState = {
      count: Number.isFinite(body.count) ? Math.max(0, Math.floor(body.count)) : current.count,
      goal: Number.isFinite(body.goal) && body.goal > 0 ? Math.floor(body.goal) : current.goal,
      updatedAt: new Date().toISOString()
    };

    await store.setJSON('state', newState);
    return { statusCode: 200, headers, body: JSON.stringify(newState) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método não permitido' }) };
};
