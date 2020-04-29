const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
app.use( express.json() )

app.post('/sendMail' , ( req , res ) => {
    res.header('Access-Control-Allow-Origin', '*')

    const send = async () => {

        try {
            let transporter = await nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, 
                auth: {
                    user: 'raphaelle39@ethereal.email', 
                    pass: 'zeR8nFXkRZbkHdmm51' 
                }
            })

            transporter.sendMail(req.body , ( error , info) => {
                if( error) {
                    res.send({
                        status   : 500    ,
                        message  : error  , 
                        valid    : false  ,
                        info 
                    })
                }
                else {
                    res.send({
                        status  : 200      ,
                        message : req.body ,
                        valid   : true     ,
                        info 
                    })
                }
            }) 
        } 
        catch (error) {
            console.log( error)
        }
    }
    return send()
})

app.get( '/' , ( req , res ) => {

    res.header('Access-Control-Allow-Origin', '*')

    const send = async () => {
        try {
           res.send({
               status  : 200 ,
               message : 'Welcome api email service.'
           })
        } 
        catch (error) {
            console.log( error)
        }
    }
    return send()
})

app.listen( process.env.PORT || 7000, () => {
   console.log('Status : server OK!' )
   
})