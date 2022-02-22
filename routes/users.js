var express = require('express');
var router = express.Router();
const pool = require('../database')
const encriptar = require('../helpers/bcript')

//Mostrar usuarios
router.get('/',async function(req, res, next) {
    const usuarios = await pool.query('SELECT * FROM usuario')
    
  res.render('listuser',{usuarios});
});


//añadir usuarios
router.get('/add',async function(req, res, next){
    res.render('adduser')
})

router.post('/add', async function(req, res, next){
    const {nombre, apellidos, mail, pass} = req.body
    const nuevo = {
        nombre,
        apellidos,
        mail,
        pass
    }
    nuevo.pass = encriptar(nuevo.pass)

    await pool.query('INSERT INTO usuario SET ?', [nuevo])
    res.redirect('/users')
})

//Editar usuarios
router.get('/edit/:id', async function(req, res, next){
    const {id} = req.params
    
    const user = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?',[id])
    res.render('edituser', user[0])
})

router.post('/edit/:id', async function(req, res, next){
    const {id} = req.params
    const {nombre, apellidos, mail, pass} = req.body
    
    const editar = {
      nombre,
      apellidos,
      mail,
      pass
    }
    await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?',[editar,id])
    res.redirect('/users')
})

//Eliminar
router.get('/delete/:id', async function (req, res, next){
    const {id} = req.params

    await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id])
    res.redirect('/users')
})

module.exports = router;