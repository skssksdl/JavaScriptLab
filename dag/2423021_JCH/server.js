const express = require('express');
const app = express();
// express 라이브러리 사용하겠다는 뜻
const path = require('path');

app.use(express.static(__dirname + '/public')); // css 연결
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
}) // 서버 띄우는 코드

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
    res.render('write.ejs');
});

app.get('/time', (req, res) => {
    res.render('time.ejs', {time : new Date()});
});

