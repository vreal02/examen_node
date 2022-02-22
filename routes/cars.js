var express = require('express');
var router = express.Router();
const pool = require('../database')

//Mostrar coches
router.get('/',async function(req, res, next) {
    const coches = await pool.query('SELECT * FROM coche')
    
  res.render('listcars',{coches});
});

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

module.exports = router;