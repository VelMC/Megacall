var express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');

//http://localhost:4000/contact/add
router.post('/add', contactController.addContact);

//localhost:4000/contact/:user_id
router.get('/:user_id', contactController.selectContactByUser);

//localhost:4000/contact/name
router.get('/:name', contactController.searchContact);

//localhost:4000/contact/:contact_id
router.put('/:contact_id', contactController.removeContact);



module.exports = router;