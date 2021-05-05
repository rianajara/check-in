const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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');
const fs = require("fs");

let msg = {
  to: 'srdas73@gmail.com', // Change to your recipient
  from: 'csulbteamaxiom@gmail.com', // Change to your verified sender
  subject: 'Here is your event data',
  text: 'sending test data',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

// const requestData = () =>{
//   const msg = {
//     to: 'srdas73@gmail.com', // Change to your recipient
//     from: 'csulbteamaxiom@gmail.com', // Change to your verified sender
//     subject: 'Here is your event data',
//     text: 'sending test data',
//     attachments: [
//       {
//         content: attachment,
//         filename: "demodata.csv",
//         type: "application/csv",
//         disposition: "attachment"
//       }
//     ],
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent')
//     })
//     .catch((error) => {
//       console.error(error)
//     })
//   return msg;
// };