const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userController {
    //user register
    signin = (req, res) => {
        const {username, email, password} = req.body;
        let saltRounds = 8;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash){
                let sql = `INSERT INTO user (username, email, password) VALUES ('${username}', '${email}', '${hash}')`;

                connection.query(sql, (error, result) => {
                    error ? res.status(400).json({error}) : res.status(200).json(result);
                });
            });
        });
    };

    //user login
    login = (req, res) => {
        let { username, password } = req.body;
        let sql = `SELECT * FROM user WHERE username = '${username}'`;
    
        connection.query(sql, (error, result) => {
          //en caso de error en la consulta
            if (error) return res.status(400).json(error);
        
            //en caso de no encontrar ningún user con dicho username
            if (!result || !result.length) {
                res.status(401).json("Usuario no registrado");
            }
        
            //en caso de que el username sea correcto
            const [user] = result;
            const hash = user.password;
            const user_id = user.user_id;
        
            //comparamos contraseñas
            bcrypt.compare(password, hash, (error, response) => {
                if (error) throw error;
                //si las contraseñas coinciden
                if (response === true) {
                    const token = jwt.sign(
                        {
                        user: { username: user.username, name: user.name, id: user_id },
                        },
                        process.env.SECRET,
                        { expiresIn: "5min" }
                    );
                    res.status(200).json({ token });
                //si las contraseñas no coinciden
                } else {
                    res.status(401).json("Usuario y contraseña incorrectos");
                }
            });
        });
    };
    

}

module.exports = new userController();