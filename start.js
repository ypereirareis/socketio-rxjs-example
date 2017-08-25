const Rx = require('rxjs/Rx');

//===========================================================================================================
// TEST
// Here to test that RXJS is loaded and working properly
//===========================================================================================================
console.log('-------------- TEST ----------------');
let testObservable = Rx.Observable.range(1, 10)
  .map(x => x + 1)
  .filter(x => x % 2 === 0)
  .take(3);

testObservable
  .subscribe(x => console.log("Observable test " + x));
console.log('------------ END TEST --------------');
console.log('');
console.log('');


//===========================================================================================================
// SERVER
// One server for all client defined at the end of the file
//===========================================================================================================
const port = 8321;
const serverConnection1 = require('socket.io').listen(8321);

const serverConnectionObservableFor = function (serverConnection) {
  return eventName => {
    return Rx.Observable.create(observer => {
      serverConnection.on('connection', socket => {
        socket.on(eventName, data => {
          observer.next(Object.assign(data, {
            socketId: socket.conn.id
          }));
        });
      });
    });
  }
};

const serverConnection1Observable = serverConnectionObservableFor(serverConnection1);

// Here we have four observables, each one "streaming" data for a specific event and client.
// Indeed, in our case each client always send the same event (distinct from other clients).
const serverConnection1_1 = serverConnection1Observable('event_1');
const serverConnection1_2 = serverConnection1Observable('event_2');
const serverConnection1_3 = serverConnection1Observable('event_3');
const serverConnection1_4 = serverConnection1Observable('event_4');

// We want to get all events/data in one stream to print them.
const mergeSource = Rx.Observable.merge(
  serverConnection1_1,
  serverConnection1_2,
  serverConnection1_3,
  serverConnection1_4
);

// Now we only have one final Observable...
mergeSource.subscribe(
  data => console.log(JSON.stringify(data)),
  error => console.log("STREAM ERROR", error),
  data => console.log("STREAM END")
);


//===========================================================================================================
// CLIENTS
// One connection per client to have distinct socket ids
//===========================================================================================================
const clientConnection = require('socket.io-client');
const clientHost = 'http://localhost:'+port;

const sendDelayedMessages = function (socket, event, message, count = 100) {
  for (var i = 0; i < count; i++) {
    ((i) => {
      setTimeout(() => {
        socket.emit(event, {
          datetime: new Date(Date.now()).toLocaleString(),
          message
        });
      }, 2000 * i + Math.random() * 1000);
    })(i)
  }
};


// Here we have four clients, each one sending a specific event and message at a random time.
const c1 = clientConnection.connect(clientHost);
sendDelayedMessages(c1, 'event_1', 'CLIENT 1');

const c2 = clientConnection.connect(clientHost);
sendDelayedMessages(c2, 'event_2', 'CLIENT 2');

const c3 = clientConnection.connect(clientHost);
sendDelayedMessages(c3, 'event_3', 'CLIENT 3');

const c4 = clientConnection.connect(clientHost);
sendDelayedMessages(c4, 'event_4', 'CLIENT 4');
