const nodeMailer = require("../configurations/nodemailer");

//this is another way of exporting method
exports.newComment = (comment) =>{

    // console.log('inside newComment Mailer');

    nodeMailer.transporter.sendMail({

        from : 'prashantyallatti79968@gmail.com',
        to : comment.user.email,
        subject : "New Comment Published!",
        html : '<h1>Yes, Your comment is now published!</h1>'
    },(err,info) => {

        if(err){
            console.log("Error in sending mail",err);
            return;
        }

        console.log('Message sent',info);
        return;
    })
}