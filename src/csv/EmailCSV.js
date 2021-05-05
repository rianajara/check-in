const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'rianajara@yahoo.com', // Change to your recipient
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