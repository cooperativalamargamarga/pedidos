exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = 'PEDIDOS';

  if (!AIRTABLE_TOKEN || !BASE_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Configuración del servidor incompleta.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Solicitud inválida.' }) };
  }

  const { fields } = body;

  if (!fields) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan datos del pedido.' }) };
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Airtable error:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error || 'Error al guardar en Airtable.' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: data.id })
    };

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor.' })
    };
  }
};
