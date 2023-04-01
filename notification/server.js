const express = require('express');
const path = require('path');
const cors = require('cors');

let counter = 1;
let numberData = 1;

const dataNotification = [
    {
        id: 0,
        isFavorite: true,
        text: 'Попова А.И. — САД',
        subtext: 'Госпитализация',
        data: new Date('2020-10-06'),
        isNew: true
    },
    {
        id: 1,
        isFavorite: true,
        text: 'Попова А.И. - Диагноз шейный хандроз',
        subtext: 'Госпитализация',
        data: new Date('2020-10-06'),
        isNew: true
    },
    {
        id: 2,
        isFavorite: false,
        text: 'Попова А.И. - Врач-кардиолог Смирнова О.В.',
        subtext: 'Консультация врача',
        data: new Date('2020-10-07T12:24:00'),
        isNew: false
    },
    {
        id: 3,
        isFavorite: false,
        text: 'Попова А.И. - Диагноз шейный хандроз',
        subtext: 'Госпитализация',
        data: new Date('2020-10-07T12:24:00'),
        isNew: true
    },
    {
        id: 4,
        isFavorite: true,
        text: 'Попова А.И. - Диагноз шейный хандроз',
        subtext: 'Госпитализация',
        data: new Date('2020-10-07T12:24:00'),
        isNew: true
    },
];

// Используем фреймворк Express для быстрой разработки на Node.js
const app = express();
const dataText = "data to send to client";

const io = require('socket.io')();

app.use(cors());

// Обрабатываем статичные файлы
app.use(express.static('public'));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.post('/notification', function(req, res){
    res.json(req.body, dataText);
});
app.get('/notification', function(req, res){
    res.json(dataNotification[counter]);
    if (counter > dataNotification.length) {
        counter = 0;
    } else {
        counter++;
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    numberData = 1;
    socket.emit('notification', dataNotification[0]);
    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            const sendData = dataNotification[numberData];
            console.log('counter', counter);
            sendData.id = counter;
            counter++;
            socket.emit('notification', sendData);

            if (numberData >= dataNotification.length - 1) {
                numberData = 0;
            } else {
                numberData++;
            }
        }, interval);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Слушаем приложение на 3000 порте, если он не задан процессом
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`The app is running in PORT ${PORT}`)
});
io.listen(PORT);
