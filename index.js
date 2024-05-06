const express = require('express');  // Importa el módulo Express.
const app = express();               // Crea una instancia de la aplicación Express.
const cookieParser = require('cookie-parser') // Middleware para manejar cookies
const session = require('express-session') // Middleware que facilita el manejo de sessiones
const { Pool } = require('pg') // Importar el objeto 'Pool' de Postgres (Base de Datos)
require('dotenv').config(); //Ismportar y cargar las variables de entorno desde el archivo .env

app.use(express.static('public'));   // Sirve archivos estáticos desde la carpeta 'public'.

app.use(session({                    // Configuración de express-session
    secret: 'tu secreto muy secreto',
    resave: false,                 // Definir explícitamente resave como false
    saveUninitialized: true,       // Definir explícitamente saveUninitialized como true
    cookie: { secure: true }
}));

app.engine('html', require('ejs').renderFile); // Configura EJS para renderizar archivos .html.
app.set("view engine", "html");      // Establece 'html' como el motor de plantillas.

app.set('views', './views');         // Establece './views' como el directorio de plantillas.

app.get('/index', (req, res) => {    // Ruta para '/index' que renderiza 'index.html'.
    res.render('index')
});

app.get('/', (req, res) => res.send('Hello World!')); // Ruta raíz que envía 'Hello World!' como respuesta.

// Creamos el objeto 'Pool' que se utiliza para manejar las conexiones a la base de dato. Se configura con las variables de entorno anteriores.
const pool = new Pool({              
    user: process.env.USER,
    host: process.env.HOST,                       
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

// Prueba para corroborar el correcto entrelazamiento de las variables de entorno
console.log(process.env.PASSWORD);

app.use(cookieParser()) // Integrar el middleware a la app para el manejo de cookies
app.listen(3000, () => console.log('Server ready'));  // Inicia el servidor en el puerto 3000 y registra un mensaje.
