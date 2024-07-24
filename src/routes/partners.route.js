const express = require('express');
const router = express.Router();

const partnersController = require('../controller/PartnersController');


router.delete('/:slug', partnersController.deletePartner)
router.put('/:slug', partnersController.updatePartner);
router.post('/store', partnersController.storePartner);
router.get('/:slug', partnersController.partnerDetail);
router.get('/',partnersController.index);



module.exports = router;
