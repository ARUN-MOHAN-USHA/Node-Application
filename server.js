const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const saltround = 10;

const users = [
    {username:'arun', password:'$2b$10$ZcZU3rOQ6DwPJup8NneCRuIUWiLG3Dwt40vekzwykxlscunaI0yK2'}
]

app.use(express.urlencoded({extended:true}));

app.get('/register',(req,res) =>{

    res.status(200).sendFile(__dirname + "/register.html");
});

app.post('/register',(req,res) =>{

    const {username, password} = req.body;

    bcrypt.hash(password,saltround, (err, hash)=>{

        if(err){
            res.send(err.message);  
        }else{
            console.log(hash);
            res.status(303).redirect('/');
        }

    });
});

app.get('/', (req,res) =>{
    res.status(200).sendFile(__dirname + '/login.html');
});

app.post('/', (req,res) =>{

    const {username, password} = req.body;

    const user = users.find((user) => user.username === username);

    if(!user){
        res.send("Invalid credentials");
    }else{
        bcrypt.compare(password, user.password, (err, isPassword) =>{

            console.log(isPassword);

            if(err){
                res.send("Invalid credentials");
            }else if(!isPassword){
                res.send("Invalid credentials");
            }else{
                res.redirect('https://arun-mohan-usha.github.io/React-Portfolio-2/');
            }

        });
    }  
});

app.get('https://arun-mohan-usha.github.io/React-Portfolio-2/', (req,res) =>{
    res.status(200).sendFile(__dirname + 'https://arun-mohan-usha.github.io/React-Portfolio-2/');
});

app.listen(4000,()=>{
    console.log('server is running on port 4000');
});