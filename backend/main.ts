import express from 'npm:express';
import fs from 'node:fs';
import cors from 'npm:cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/api/ordemdeservico', (req, res) => {
  const newOrder = req.body;

  fs.readFile('ordens.json', 'utf8', (err, data) => {
    if (err || !data) {
 
      const initialData = [newOrder];
      fs.writeFile('ordens.json', JSON.stringify(initialData, null, 2), (err) => {
        if (err) return res.status(500).json({ message: 'Erro ao salvar a ordem.' });
        return res.status(200).json(newOrder);
      });
    } else {
      try {
        const ordens = JSON.parse(data);
        ordens.push(newOrder);
        fs.writeFile('ordens.json', JSON.stringify(ordens, null, 2), (err) => {
          if (err) return res.status(500).json({ message: 'Erro ao salvar a ordem.' });
          return res.status(200).json(newOrder);
        });
      } catch (parseError) {
        return res.status(500).json({ message: 'Erro ao processar os dados do arquivo.' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
