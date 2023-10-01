const io = require('socket.io')

module.exports = function (req, res, next) {
    var notificar = req.query.notificacao || ''
    if (notificar != '') {
        io.emit('notificacao', notificar)
        next()
    } else {
        next()
    }
}