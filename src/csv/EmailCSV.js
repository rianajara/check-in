import { useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
//const sgMail = require('@sendgrid/mail');
/*
const fs = require('fs');
pathToAttachment = `${__dirname}/demodata.csv`;
attachment = fs.readFileSync(pathToAttachment).toString('base64');
*/

const EmailCSV = () => {
	const { requestedEventInfo } = useContext(UserContext); // the name and rest of information for the event from ViewEvent page

	const msg = {
		to: 'rianajara@yahoo.com', // Change to your recipient
		from: 'csulbteamaxiom@gmail.com', // Change to your verified sender
		subject: 'Here is your event data',
		text: `${requestedEventInfo['hostEmail']} is requesting the attendees list for the ${requestedEventInfo['eventName']} held on ${requestedEventInfo['eventDate']}.`,
		
	};

	useEffect(() => {
		if (requestedEventInfo.length > 1) {
		
			sendEmail();
		}
	}, [requestedEventInfo]);

	const sendEmail = () => {
    /*
		sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent');
			})
			.catch((error) => {
				console.error(error);
			});
      */
	};
};

export default EmailCSV;
