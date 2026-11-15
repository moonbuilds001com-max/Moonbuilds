// Quick connectivity test: Pexels photo page + CDN download from Node.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

const res = await fetch('https://www.pexels.com/photo/monitor-displaying-lines-of-code-6424583/', {
  headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
});
console.log('page status', res.status);
const html = await res.text();
console.log('len', html.length);
console.log('has photographer Nemuel:', html.includes('Nemuel'));
console.log('has License:', /License/.test(html));
const m = html.match(/images\.pexels\.com[^"']+/);
console.log('img url sample:', m && m[0].slice(0, 130));

const r2 = await fetch('https://images.pexels.com/photos/6424583/pexels-photo-6424583.jpeg?cs=srgb&w=2400&fit=max');
console.log('cdn status', r2.status, r2.headers.get('content-type'), r2.headers.get('content-length'));
