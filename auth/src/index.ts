import express from 'express'
import {json} from 'body-parser'


const app = express();
app.use(json())

app.listen(3000, () => {
    console.log('version 0.1')
    console.log("Listening on port 3000")
})