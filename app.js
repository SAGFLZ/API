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

app.get('/api/producto/:id', (req,res)=>{
  conexion.query('SELECT * FROM producto WHERE id=?', [req.params.id] , (error,fila)=>{
      if(error){
          throw error;
      }else{
         res.send(fila);
         res.send(fila[0].descripción);
      }
  });
});

app.post('/api/producto',(req,res)=>{
  let data = {id:req.body.id, descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
  let sql = "INSERT INTO producto SET ?";
  conexion.query(sql, data, function(error,results){
      if(error){
          throw error;
      }else{
         res.send({ message: 'Producto registrado correctamente' });     
      }
  });
});

