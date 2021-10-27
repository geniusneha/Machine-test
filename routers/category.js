const express = require('express')
const router = express.Router()
const Category = require('../models/categoryModel')
const { adminrequired } = require('../config/JWT')
const { getCat, addCat, editCat, delCat } = require('../controllers/categoryControl')


router.get('/', getCat)
router.post('/', adminrequired, addCat)
router.put('/edit/:id', adminrequired, editCat)
router.delete('/del/:id', adminrequired, delCat)



module.exports = router