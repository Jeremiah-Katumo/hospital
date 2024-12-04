import express from 'express';
import { matchtoken, updateverify } from '../database/db.js';

export const verify = (req, res) => {
    var { id, token } = req.body;

    matchtoken(id, token, function(err, result) {
        console.log(result);
        if (result.length > 0) {
            var email = result[0].email;
            var emailStatus = "verified";

            updateverify(email, emailStatus, function(err, result) {
                res.send("Email verified!");
            })
        } else {
            res.send("Token did not match!");
        }
    })
}