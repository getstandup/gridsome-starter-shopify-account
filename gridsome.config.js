module.exports = {
  siteName: 'Gridsome + Shopify 😍',
  siteDescription: 'A full-featured Shopify starter kit for Gridsome.',
  siteUrl: 'https://gridsome-shopify-starter.netlify.com',
  templates: {
    ShopifyProduct: [
      {
        path: '/product/:handle',
        component: './src/templates/Product.vue'
      }
    ],
    ShopifyCollection: [
      {
        path: '/collection/:handle',
        component: './src/templates/Collection.vue'
      }
    ]
  },
  plugins: [
    {
      use: 'gridsome-source-shopify',
      options: {
        storeName: process.env.GRIDSOME_SHOPIFY_STOREFRONT,
        storefrontToken: process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        flexsearch: {
          profile: 'match'
        },
        collections: [
          {
            typeName: 'ShopifyProduct',
            indexName: 'Product',
            fields: ['title', 'handle', 'description']
          },
          {
            typeName: 'ShopifyCollection',
            indexName: 'Collection',
            fields: ['title', 'handle', 'description']
          }
        ],
        searchFields: ['title', 'handle', 'tags']
      }
    },
    'gridsome-plugin-purgecss',
    {
      use: '@gridsome/plugin-critical',
      options: {
        paths: ['/', '/collections', '/collection/*'],
        width: 1300,
        height: 900
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/account'],
        config: {
          '/product/*': {
            changefreq: 'daily',
            priority: 0.5
          },
          '/collection/*': {
            changefreq: 'weekly',
            priority: 0.5
          },
          '/collections': {
            changefreq: 'monthly',
            priority: 0.7
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.GRIDSOME_ANALYTICS_ID
      }
    },
    // {
    //   use: 'gridsome-plugin-guess-js',
    //   options: {
    //     viewId: process.env.GUESS_ANALYTICS_VIEW,
    //     jwt: {
    //       clientEmail: process.env.GUESS_ANALYTICS_EMAIL,
    //       privateKey: process.env.GUESS_ANALYTICS_KEY
    //     }
    //   }
    // },
    {
      use: 'gridsome-plugin-manifest',
      options: {
        background_color: '#000000',
        icon_path: './src/favicon.png',
        name: 'Gridsome + Shopify 😍',
        short_name: 'Shopify Starter',
        theme_color: '#000000',
        lang: 'en'
      }
    },
    {
      use: 'gridsome-plugin-service-worker',
      options: {
        precachedRoutes: ['/', '/collections', '/login'],
        cacheFirst: {
          cacheName: 'images',
          routes: [/\.(?:png|gif|jpg|jpeg|webp|svg)$/]
        },
        staleWhileRevalidate: {
          cacheName: 'static-resources',
          routes: [/\.(?:js|css)$/]
        }
      }
    },
    {
      use: 'gridsome-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg', 'json', 'xml']
      }
    }
  ]
}
