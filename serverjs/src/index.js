const express = require('express');
const cors = require('cors');
const port = 1225;
const app = express();
const verifyProof = require("./utils")

app.use(express.json());
app.use(cors());


const MERKLE_ROOT = '0xe35e6e14fdf91ecc6adfb74856bcd8a2c22544bd10bded94f2a9fecc77cf630b';


app.post('/vip', (req, res) => {
    const { proof, leaf } = req.body;

    if (verifyProof(proof, leaf, MERKLE_ROOT)) {
        res.send("You are Vip ✅");
    }
    else {
        res.status(401).send({
            message: "You are not VIP 🚨"
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
