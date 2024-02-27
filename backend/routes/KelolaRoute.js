const express = require('express');
const {
    getKelola,
    getKelolaById,
    updateKelola,
    deleteKelola,
} = require('../controllers/Kelola.js');
const { verifyUser, adminOnly } = require('../middleware/AuthUser.js');

const router = express.Router();

router.get('/kelola', verifyUser, adminOnly, getKelola);
router.get('/kelola/:id', verifyUser, adminOnly, getKelolaById);
router.patch('/kelola/:id', verifyUser, adminOnly, updateKelola);
router.delete('/kelola/:id', verifyUser, adminOnly, deleteKelola);

module.exports = router;
