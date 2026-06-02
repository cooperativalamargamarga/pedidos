# La Marga Marga — Pedidos Mayorista

Página web de pedidos para clientes mayoristas de Cooperativa La Marga Marga.

## Variables de entorno requeridas en Netlify

Configurar en Netlify → Site settings → Environment variables:

- `AIRTABLE_TOKEN` — Personal Access Token de Airtable
- `AIRTABLE_BASE_ID` — ID de la base (appv9d2XHjZepmiuQ)

## Estructura

```
/
├── index.html              # Página principal de pedidos
├── netlify.toml            # Configuración de Netlify
├── netlify/functions/
│   └── submit-order.js     # Función serverless que conecta con Airtable
└── README.md
```

## Actualizar lista de clientes o productos

Editar directamente el archivo `index.html`:
- Clientes: buscar `const CLIENTES =`
- Productos: buscar `const PRODUCTOS =`

## Agregar fotos de productos

1. Subir la foto a Google Drive y hacerla pública
2. Obtener el link directo de la imagen
3. En `index.html`, buscar el producto por nombre y agregar la URL en el campo `img`

Ejemplo:
```js
{ id: "Blanco Molde", nombre: "BLANCO MOLDE", precio: 2900, cat: "Panadería", vegano: true, img: "https://drive.google.com/..." },
```
