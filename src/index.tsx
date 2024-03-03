import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'

import bracelets from './data/bracelets.json';
import grass from './data/grass.json';
import pots from './data/pots.json'
import staves from './data/staves.json';
import scrolls from './data/scrolls.json'

const app = new Hono()

app.get('/api/data', (c) => {
  return c.json({
    bracelets,
    grass,
    pots,
    staves,
    scrolls,
  })
})

app.get('*', (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          {import.meta.env.PROD ? (
            <>
              <script type="module" src="/static/client.js"></script>
              <link rel="stylesheet" href="/static/client.css" />
            </>
          ) : (
            <script type="module" src="/src/client.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app