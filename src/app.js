import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Da la pagina inicial en la ruta "localhost:3000"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/landing.html'));
});
app.get('/login', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '../public/pages/logIn.html'));
    })
app.get('/signIn', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '../public/pages/signIn.html'));
    })
app.get('/catalog', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '../public/pages/catalogo.html'));
    })
app.get('/clothe', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '../public/pages/detalleprenda.html'));
    })
app.get('/profile', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '../public/pages/perfil.html'));
    })
app.get('/editProfile', (req, res) => 
    {
        res.sendFile(path.join(__dirname, '../public/pages/editarperfil.html'));
    })

export default app;
