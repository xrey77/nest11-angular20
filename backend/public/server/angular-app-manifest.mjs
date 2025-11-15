
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "route": "/productlist"
  },
  {
    "renderMode": 2,
    "route": "/productcatalog"
  },
  {
    "renderMode": 2,
    "route": "/productsearch"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5087, hash: '17144d2a64cb603f4125abec359a47db4cc78583222dc19a3dbfb883d3a7f8ed', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1059, hash: 'cd276170f95d54759af0157a65c7152db54d0d867db2f9a292adb85442a81dc8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 49799, hash: '4e4f6454db8ad90df6b771b7a8dc4c3c0bf1d6d049614c2f8e28da3b005b77fc', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 44004, hash: 'd4402a686293a9b9f6766fb82e5fb0bad667697bac42203dd8be24e2e8017eb1', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'productlist/index.html': {size: 50353, hash: 'b47ac7d18f605e96ef2d1ae96fb96ba78304d9e1e7a41168623361e04212dd0f', text: () => import('./assets-chunks/productlist_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 44515, hash: 'e75dbda0e3af16da21f25fdb5bf8031cc79f4c6cae97cd40c86fba8bf967e10c', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'productcatalog/index.html': {size: 51472, hash: 'e090534b3c0298ed0860558e6d670c1f451655e06e8c07cb48f893bce5bb7e13', text: () => import('./assets-chunks/productcatalog_index_html.mjs').then(m => m.default)},
    'productsearch/index.html': {size: 43151, hash: 'a48fb88e9e12ef0b91e62e39bbc39ee38eb18c43c9bb9b4beef73e0a53fec5d1', text: () => import('./assets-chunks/productsearch_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 51214, hash: 'c4a936d46322690fc1e640e0814bc4279ca532b5cd5f2aa0ccf01ee30cefd5d1', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'styles-VRDYZCWE.css': {size: 230966, hash: 'yJEOwb9t5lw', text: () => import('./assets-chunks/styles-VRDYZCWE_css.mjs').then(m => m.default)}
  },
};
