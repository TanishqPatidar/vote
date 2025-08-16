import express from "express";
const app = express();
const port = process.env.PORT || 3000;

const page = `<!doctype html>
<html><head><meta charset="utf-8"><title>Vote</title></head>
<body>
  <h1>Vote: Cats vs Dogs</h1>
  <button onclick="vote('cats')">Cats</button>
  <button onclick="vote('dogs')">Dogs</button>
  <pre id="out"></pre>
<script>
async function vote(choice){
  await fetch('/api/vote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({choice})});
  const r = await fetch('/api/results'); document.getElementById('out').textContent = await r.text();
}
(async()=>{ const r=await fetch('/api/results'); document.getElementById('out').textContent = await r.text(); })();
</script>
</body></html>`;

app.get("/", (_req, res) => res.type("html").send(page));
app.listen(port, () => console.log(`WEB on :${port}`));
