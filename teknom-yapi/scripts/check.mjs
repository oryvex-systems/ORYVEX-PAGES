import fs from 'node:fs';
const required=['index.html','styles.css','app.js','images.js','_headers','_redirects','robots.txt','sitemap.xml','wrangler.toml','oryvex/deploy.json','oryvex/ssl-policy.json'];
const missing=required.filter(f=>!fs.existsSync(new URL('../'+f,import.meta.url)));
if(missing.length){console.error('Eksik yayın dosyaları:',missing.join(', '));process.exit(1)}
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
for(const token of ['<meta name="viewport"','rel="canonical"','styles.css','app.js']){if(!html.includes(token)){console.error('index.html kontrolü başarısız:',token);process.exit(1)}}
const headers=fs.readFileSync(new URL('../_headers',import.meta.url),'utf8');
for(const token of ['Strict-Transport-Security','Content-Security-Policy','googleusercontent.com']){if(!headers.includes(token)){console.error('Güvenlik header kontrolü başarısız:',token);process.exit(1)}}
console.log('TEKNOM_YAPI_WEB: PUBLISH_READY');
