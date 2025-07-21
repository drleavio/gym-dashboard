module.exports = async function generatePaymentLink(user) {
    return `https://yourpayment.com/pay?userId=${user._id}&amount=1200`;
  };
  