const cron = require("node-cron");
const User = require("../models/User");
const sendNotification = require("./sendNotification");
const generatePaymentLink = require("./generatePaymentLink");


cron.schedule("0 9 * * *", async () => {
  const today = new Date();
  

  const users = await User.find({ "subscription.isActive": true });
  const subscriptionEndUsers=await User.find({"subscription.isActive":false})

  for (let user of users) {
    const endDate = new Date(user.subscription.endDate);
    const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    if (daysLeft === 3 || daysLeft === 1) {
      const link = await generatePaymentLink(user); 
      await sendNotification(user, daysLeft, link);
    }
  }
  for (let user of subscriptionEndUsers) {
      const link = await generatePaymentLink(user); 
      const message=`Hi ${user.name}, your gym subscription is expired. Renew now: ${link}`;
      await sendNotification(user, 0, link,message);
  }
});
