const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

// Express App Config
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: 'Secret27922-292-Baba',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const eventiRoutes = require('./api/eventi/eventi.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const orgRoutes = require('./api/org/org.routes')
const connectSockets = require('./api/socket/socket.routes')

// routes
app.use('/api/eventi', eventiRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/org', orgRoutes)
connectSockets(io)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});













// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// // app.post('/login', (req, res) => {
// //     const credentials = req.body;
// //     userService.checkLogin(credentials)
// //         .then(user => {
// //             if (user) {
// //                 // res.cookie('userName', user.userName)
// //                 req.session.loggedinUser = user;
// //                 console.log('req.session after login', req.session);
// //                 res.json(user)
// //             } else {
// //                 res.status(401).send('Invalid user/pass');
// //             }
// //         })

// //     // const nickname = req.body.nickname;
// //     // res.cookie('myNickName', nickname);
// //     // res.json()
// // })

// // app.post('/signup', (req, res) => {
// //     const user = req.body;
// //     userService.signup(user)
// //         .then(user => {
// //             // res.cookie('userName', user.userName)
// //             req.session.loggedinUser = user;
// //             res.json(user)
// //         })
// // })

// // app.post('/logOut', (req, res) => {
// //     req.session.destroy();
// //     res.end();
// //     // res.clearCookie('myNickName')
// //     // res.json()
// // })

// // // READ - single user

// // app.get('/user/:id', (req, res) => {
// //     const id = req.params.id;
// //     console.log(id);
// //     userService.getById(id)
// //         .then(user => {
// //             res.json(user)
// //         })
// // })

// // // LIST - users

// // app.get('/user', (req, res) => {
// //     userService.query()
// //         .then(users => {
// //             res.json(users)
// //         })
// // })

// // // DELETE - single user
// // app.delete('/user/:id', (req, res) => {
// //     if (!req.session.loggedinUser) return res.status(403).send('You are unauthorized baba')
// //     const id = req.params.id
// //     userService.remove(id, req.session.loggedinUser)
// //         .then(() => {
// //             res.json({})
// //         })
// //         .catch(err => {
// //             res.status(403).send('ERROR: Cannot Delete Eventi')
// //         })
// // })


// // BUG CRUDL - REST API

// // LIST - eventis
// app.get('/api/eventi', (req, res) => {
//     // const nickname = req.cookies.myNickName;
//     // if (!nickname) return res.redirect('/');

//     const q = req.query.q;

//     eventiService.query(q)
//         .then(eventis => {
//             res.json(eventis)
//         })
// })

// // READ - single eventi
// app.get('/api/eventi/:id', (req, res) => {
//     const id = req.params.id;
//     eventiService.getById(id)
//         .then(eventi => {
//             res.json(eventi)
//         })
// })



// // DELETE - eventi
// app.delete('/api/eventi/:id', (req, res) => {
//     // if (!req.session.loggedinUser) return res.status(403).send('You are unauthorized baba')
//     const id = req.params.id
//     eventiService.remove(id)
//         .then(() => {
//             res.json()
//         })
//         .catch(err => {
//             res.status(403).send('ERROR: Cannot Delete Eventi')
//         })
// })

// // CREATE - eventi
// app.post('/api/eventi', (req, res) => {
//     // if (!req.session.loggedinUser) return res.status(403).send('You are unauthorized baba')
//     const eventi = req.body;
//     // const nickname = req.cookies.myNickName;
//     // eventi.nickname = nickname
//     // const creator = { id: req.session.loggedinUser.id, fullName: req.session.loggedinUser.fullName }
//     // eventi.creator = { id: creator.id, fullName: creator.fullName };

//     eventiService.save(eventi)
//         .then((savedEventi) => {
//             res.json(savedEventi)
//         })
// })

// // UPDATE - eventi
// app.put('/api/eventi/:id', (req, res) => {
//     // console.log('req.session', req.session);
//     // if (!req.session.loggedinUser) return res.status(403).send('You are unauthorized baba')
//     const eventi = req.body;
//     eventiService.save(eventi)
//         .then((savedEventi) => {
//             res.json(savedEventi)
//         })
//         .catch(err => {
//             res.status(403).send('ERROR: Cannot Update Eventi')
//         })
// })




// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })