
const express = require('express');
const cors = require('cors')
const session= require('express-session');
const dotenv = require('dotenv');
const db = require('./config/Database.js');
const SequelizeStore = require('connect-session-sequelize');
const UserRoute = require('./routes/UserRoute.js');
const ProductRoute = require('./routes/ProductRoute.js');
const AuthRoute = require('./routes/AuthRoute.js');
const KelolaRoute = require('./routes/KelolaRoute.js');

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(KelolaRoute);

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
