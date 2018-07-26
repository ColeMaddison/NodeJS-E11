
module.exports = (io) => {
    io.on('connection', function (socket) {

        socket.emit('conn', { hello: 'world' });
        socket.on('test', function (data) {
            console.log("from client", data);
        });

    });
};