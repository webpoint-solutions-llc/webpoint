const nodemailer = require('nodemailer');


const handleFormSubmit = (req, res, db) => {
    const {name, email, company, message} = req.body;
    db('contact')
    .insert({
            name: name,
            email: email, 
            company: company,
            description: message
    })
    .returning('*')
    .then(data => {
        console.log(data);
    })
    
    const notifyAdmin = `
                <body bgcolor="#FFFFFF">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F0F8FC">
                <tr>
                    <td>
                
                        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                        <tr>
                            <td colspan="3"><a href="http://www.webpoint.io"><img 
                                style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
                                src="http://webpoint.io/dist/images/email-header.png" width="600" height="60" alt="Header" /></a>
                            </td>
                            <tr>
                                <td></td>
                            </tr>
                        </tr>
                        <tr>
                            <td width="20"></td>
                            <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#000001;">
                            <p>You have a new contact request.</p>
                            <h3>Contact Details</h3>
                            
                            <ul>
                                <li>Name: ${name}</li>
                                <li>Email: ${email}</li>
                                <li>Company: ${company}</li>
                            </ul>
                            <h3>Message</h3>
                            <p>${message}</p>
                            
                            Best wishes,<br/>
                            The WebPoint Team
                            </td>
                            <tr>
                                <td></td>
                            </tr>
                        </tr>
                        <tr>
                            <td colspan="3"><a href="http://webpoint.io"><img 
                                style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
                                src="http://webpoint.io/dist/images/email-footer.png" width="600" height="60" alt="Footer" /></a>
                            </td>
                            <tr>
                                <td></td>
                            </tr>
                        </tr>
                        </table>
                    </td>
                </tr>
            </table>
            </body>
        `;
            // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.webpoint.io",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: 'noreply@webpoint.io', // generated ethereal user
            pass: '-GiqJG&0mime' // generated ethereal password
            },
           
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"webpoint.io" <noreply@webpoint.io>', // sender address
            to: email, // list of receivers
            subject: "New Contact Request Submitted", // Subject line
            text: "Hello world?", // plain text body
            html: notifyAdmin // html body
        };

        // send mail with defined transport object
        let info = transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            
        })
       
        const notifyUser = `
                <body bgcolor="#FFFFFF">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F0F8FC">
                <tr>
                    <td>
                
                        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                        <tr>
                            <td colspan="3"><a href="http://www.webpoint.io"><img 
                                style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
                                src="http://webpoint.io/dist/images/email-header.png" width="600" height="60" alt="Header" /></a>
                            </td>
                            <tr>
                                <td></td>
                            </tr>
                        </tr>
                        <tr>
                            <td width="20"></td>
                            <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#000001;">
                            <h3>Form Successfully Submitted</h3>
                            <p>Thank you for contacting us. We are currently reviewing your project, 
                            and will return back to you shortly.</p>
                            
                            Best wishes,<br/>
                            The WebPoint Team
                            </td>
                            <tr>
                                <td></td>
                            </tr>
                        </tr>
                        <tr>
                            <td colspan="3"><a href="http://webpoint.io"><img 
                                style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
                                src="http://webpoint.io/dist/images/email-footer.png" width="600" height="60" alt="Footer" /></a>
                            </td>
                            <tr>
                                <td></td>
                            </tr>
                        </tr>
                        </table>
                    </td>
                </tr>
            </table>
            </body>
        `;
            // create reusable transporter object using the default SMTP transport
        let transporter2 = nodemailer.createTransport({
            host: "mail.webpoint.io",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: 'noreply@webpoint.io', // generated ethereal user
            pass: '-GiqJG&0mime' // generated ethereal password
            },
           
        });

        // setup email data with unicode symbols
        let mailOptions2 = {
            from: '"webpoint.io" <noreply@webpoint.io>', // sender address
            to: "manol@webpoint.io, sharmamanol@hotmail.com", // list of receivers
            subject: "New Contact Request Submitted", // Subject line
            text: "Hello world?", // plain text body
            html: notifyUser // html body
        };

        // send mail with defined transport object
        let info2 = transporter2.sendMail(mailOptions2, (error, info2) => {
            if(error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info2.messageId);
            res.render('index')
        })
}

module.exports = {
    handleFormSubmit: handleFormSubmit
}