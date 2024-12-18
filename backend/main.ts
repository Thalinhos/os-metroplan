import express from 'npm:express';
import { promises as fs } from 'node:fs';
import cors from 'npm:cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static('public'))

app.post('/api/ordemdeservico', async (req, res) => {

  const newOrder = req.body;
  
    try {
      let data;
      try {
        data = await fs.readFile('ordens.json', 'utf8');
      } catch (err) {
        data = null;
      }
  
      if (!data) {
        const initialData = [newOrder];
        await fs.writeFile('ordens.json', JSON.stringify(initialData, null, 2));
        return res.status(200).json(newOrder);
      } else {
        try {
          const ordens = JSON.parse(data);
          ordens.push(newOrder);
          await fs.writeFile('ordens.json', JSON.stringify(ordens, null, 2));
          return res.status(200).json(newOrder);
        } catch (parseError) {
          return res.status(500).json({ message: 'Erro ao processar os dados do arquivo.' });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao salvar a ordem.' });
    }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
