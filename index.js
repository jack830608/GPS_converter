const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/convert', function (req, res) {
    const data = []
    const input = req.body.data.split(/\n/g)
    input.forEach((i, index) => {
        setTimeout(function () {
            if (i.length > 0) {
                const address = encodeURI(i)
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
                    .then((response) => {
                        try {
                            data.push({ address: i, ...response.data.results[0].geometry.location })
                            if (index === input.length -1 ) {
                                console.log(data)
                                res.send(JSON.stringify(data))
                            }
                        } catch (err) {
                            console.log(err)
                        }
                    })
            }
        }, 100 * index)
    })
});

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is listening on ${port}`)
})