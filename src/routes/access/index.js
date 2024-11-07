'use strict';

const express = require('express');
const router = express.Router();
const AccessController = require('../../controllers/access.controller');

router.post('/shop/signUp', AccessController.signUp);

module.exports = router;
