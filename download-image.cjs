const https = require('https');
const fs = require('fs');

const url = "https://chatgpt.com/backend-api/estuary/content?id=file_0000000073647206808f7fc672d7c072&ts=493541&p=fs&cid=1&sig=4d53fcc003d581bf7a39eda97df155e79021c177a446cb822addf8514e897f75&v=0";
const file = fs.createWriteStream('public/product-image.webp');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

https.get(url, options, response => {
  if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
     https.get(response.headers.location, options, response2 => {
          response2.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log("Download completed after redirect.");
          });
     });
     return;
  }

  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log("Download completed.");
  });
}).on('error', err => {
  fs.unlink("public/product-image.webp");
  console.log("Error: " + err.message);
});
