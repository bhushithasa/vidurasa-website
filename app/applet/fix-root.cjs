const { readFileSync, writeFileSync } = require('fs');

['/index.html', '/about.html', '/products.html', '/contact.html'].forEach(f => {
  try {
    let d = readFileSync(f, 'utf8');
    d = d.replace(/<img src="data:image\/png;base64,[^"]+" alt="Vidurasa Logo" style="height: 40px; width: auto;">/g, '<img src="/vidurasajpeglogo.jpg" alt="Vidurasa Logo">');
    d = d.replace(/<img src="data:image\/png;base64,[^"]+" alt="Vidurasa Logo">/g, '<img src="/vidurasajpeglogo.jpg" alt="Vidurasa Logo">');
    writeFileSync(f, d);
    console.log(f + ' updated');
  } catch (e) {
    console.error(e.message);
  }
});
