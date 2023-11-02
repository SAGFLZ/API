const { error } = require('console');

let express= require('express');

let mysql = require('mysql');

let app = express(); 

app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articulos',
})

conexion.connect(error => {
    if (error) {
        throw error;
    }
})

app.get('/', function(req,res){
  res.send('Ruta INICIO');
})

app.listen('3000', function(){
  console.log('Servidor OK');
})

app.get('/api/producto', (req,res)=>{
  conexion.query('SELECT * FROM producto', (error,filas)=>{
      if(error){
          throw error;
      }else{
          res.send(filas);
      }
  });
});
