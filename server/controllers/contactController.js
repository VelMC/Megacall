const connection = require('../config/db');

class contactController {
    //show all contact 
    selectContactByUser = (req, res) => {
        let user_id = req.params.user_id;

        let sql = `SELECT * FROM contact WHERE user_id = ${user_id} AND is_deleted = false`;
        console.log('sql', sql);
        connection.query(sql, (error, result) => {
            console.log(result);
            error
                ? res.status(400).json({error})
                : res.status(200).json({result});
        });
    };
    //add contact
    addContact = (req, res) => {
        let {
            user_id,
            name,
            lastname,
            email,
            phone,
            img
        } = req.body;

        let sql = `INSERT INTO contact ( user_id, name, lastname, email, phone, img) VALUES (${user_id}, "${name}", "${lastname}", "${email}", "${phone}", "${img}");`;

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({error}) : res.status(200).json(result);
        });
    }
    //search by name
    searchContact = (req, res) => {
        let {name} = req.params
        let sql = `SELECT * FROM contact WHERE name LIKE '%${name}%' AND is_deleted = false`;
        connection.query(sql, (error, result) => {
            error
                ? res.status(400).json({error})
                : res.status(200).json({result});
        })
    }
    removeContact = (req, res) => {
        let {contact_id} = req.params;

        let sql = `UPDATE contact SET is_deleted = true WHERE contact_id = ${contact_id}`;
        connection.query(sql, (error, result) => {
            error
                ? res.status(400).json({error})
                : res.status(200).json({Message: 'Contacto eliminado'});
        })
    }

}

module.exports = new contactController();