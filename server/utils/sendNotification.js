const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

module.exports = async function sendNotification(user, daysLeft, paymentLink,message=`Hi ${user.name}, your gym subscription will expire in ${daysLeft} day(s). Renew now: ${paymentLink}`) {
  try {
    await client.messages.create({
      from: `whatsapp:${process.env.PHONE}`,
      to: `whatsapp:+91${user.whatsapp}`,
      body: message
    });
    console.log("sent message");
    
    await client.messages.create({
      from: process.env.WHATSAPP,
      to: `+91${user.phone}`,
      body: message
    });

    console.log(`Reminder sent to ${user.name}`);
  } catch (err) {
    console.error("Error sending reminder:", err);
  }
}
