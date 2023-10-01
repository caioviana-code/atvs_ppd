var express = require('express')

const router = express.Router()

// Rota para receber notificações
router.route('/notificar').get(function (req, res) {
    // Responde com uma mensagem JSON
    res.json({
        message: process.env.DEFAULT_NOTIFICATION
    });
});

// Rota para testar a notificacao
router.route('/notificar/teste').get(function (req, res) {
    // Responde com uma mensagem JSON
    res.json({
        message: process.env.NOTIFICATION_TEST_MESSAGE
    });
});

module.exports = router