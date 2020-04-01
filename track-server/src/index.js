require('./models/user');
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth')
const TrackRouts = require('./routes/trackRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(TrackRouts);

const mongoUri = 'mongodb+srv://admin:fJS01XJkuhkM9vV4@cluster0-pblfh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri,{
    useNewUrlParser : true,
    useCreateIndex : true,
     useUnifiedTopology: true
} );

mongoose.connection.on('connected', ()=> {
    console.log('Connected to mongo instance');
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting mongo', err)
})
app.get('/', requireAuth,(req, res) => {
    res.send(`Your email : ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
} );