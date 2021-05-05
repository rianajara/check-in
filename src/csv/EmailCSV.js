const sgMail = require('@sendgrid/mail')
const fs = require("fs");
pathToAttachment = `${__dirname}/demodata.csv`;
attachment = fs.readFileSync(pathToAttachment).toString("base64");

const msg = {
  to: 'rianajara@yahoo.com', // Change to your recipient
  from: 'csulbteamaxiom@gmail.com', // Change to your verified sender
  subject: 'Here is your event data',
  text: 'sending test data',
  attachments: [
    {
      content: attachment,
      filename: "demodata.csv",
      type: "application/csv",
      disposition: "attachment"
    }
  ],
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