var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
const pool = require('../database')

//Mostrar coches
router.get('/',async function(req, res, next) {
    const coches = await pool.query('SELECT * FROM coche')
    
  res.render('listcars',{coches});
});


//añadir coches
router.get('/add',async function(req, res, next){
    res.render('addcars')
})

router.post('/add', async function(req, res, next){
    const {potencia, modelo, imagen} = req.body
    const nuevo = {
        potencia,
        modelo,
        imagen
    }
    await pool.query('INSERT INTO coche SET ?', [nuevo])
    res.redirect('/cars')
})

//Editar coches
router.get('/edit/:id', async function(req, res, next){
    const {id} = req.params
    
    const coches = await pool.query('SELECT * FROM coche WHERE id_coche = ?',[id])
    res.render('editcars', coches[0])
})

router.post('/edit/:id', async function(req, res, next){
    const {id} = req.params
    const {potencia, modelo, imagen} = req.body
    
    const editar = {
        potencia,
        modelo,
        imagen
    }
    await pool.query('UPDATE coche SET ? WHERE id_coche = ?',[editar,id])
    res.redirect('/cars')
})

//Eliminar
router.get('/delete/:id', async function (req, res, next){
    const {id} = req.params

    await pool.query('DELETE FROM coche WHERE id_coche = ?', [id])
    res.redirect('/cars')
})

router.get('/api',async function (req, res, next) {
    const coches = await pool.query('SELECT * FROM coche')
    res.json({
        coches
    })

})

module.exports = router;