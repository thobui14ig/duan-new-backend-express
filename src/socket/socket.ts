/* eslint-disable @typescript-eslint/no-var-requires */
export const setupSocket = (server: any) => {
    const io = require('socket.io')(server, {
      cors: {
          origin: '*',
      }
    }); 
  
    io.on('connection', (socket: any) => { ///Handle khi có connect từ client tới
        console.log('New client connected' + socket.id); 
      
        socket.on('sendDataClient', function(data: any) { // Handle khi có sự kiện tên là sendDataClient từ phía client
            io.emit('sendDataServer', { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
        })
      
        socket.on('disconnect', () => {
          console.log('Client disconnected'); // Khi client disconnect thì log ra terminal.
        });
      });
  };
  