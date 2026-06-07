export async function onRequestPost(context) {
  const AIRTABLE_TOKEN = context.env.AIRTABLE_TOKEN;
  const BASE_ID = context.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = 'PEDIDOS';

  if (!AIRTABLE_TOKEN || !BASE_ID) {
    return new Response(JSON.stringify({ error: 'Configuración incompleta.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const { fields } = body;

  if (!fields) {
    return new Response(JSON.stringify({ error: 'Faltan datos del pedido.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
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
      return new Response(JSON.stringify({ error: data.error || 'Error al guardar.' }), {
        status: response.status, headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error interno.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
