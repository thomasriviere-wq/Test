const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const COUNT_FILE = path.join(__dirname, 'count.json');
const CAT_PATH = path.join(__dirname, 'cat.jpg');

function readCount() {
  try {
    const data = fs.readFileSync(COUNT_FILE, 'utf8');
    return JSON.parse(data).count || 0;
  } catch (e) {
    return 0;
  }
}

function writeCount(n) {
  fs.writeFileSync(COUNT_FILE, JSON.stringify({ count: n }), 'utf8');
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Endpoint qui incrémente le compteur et renvoie l'image (cat.jpg si disponible)
app.get('/image', (req, res) => {
  const count = readCount() + 1;
  writeCount(count);
  res.setHeader('X-View-Count', String(count));

  if (fs.existsSync(CAT_PATH)) {
    res.type('jpg');
    fs.createReadStream(CAT_PATH).pipe(res);
  } else {
    // 1x1 PNG transparent en base64 comme fallback
    const buf = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=',
      'base64'
    );
    res.type('png').send(buf);
  }
});

// Renvoie la valeur courante sans incrémenter
app.get('/count', (req, res) => {
  const count = readCount();
  res.json({ count });
});

app.use('/static', express.static(__dirname));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
