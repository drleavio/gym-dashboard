import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    subscription: {
      plan: "",
      startDate: "",
      endDate: "",
      isActive: true,
    },
    payment: {
      status: "pending",
      amount: "",
      method: "Cash",
      transactionId: "",
      paidOn: "",
    },
    gender: "",
    age: "",
    address: "",
    emergencyContact: {
      name: "",
      phone: "",
    },
    goals: [],
    healthIssues: "",
  });

  const handleChange = (e, section, key) => {
    const { name, value } = e.target;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key || name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: send data to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="text" name="whatsapp" placeholder="WhatsApp" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />

      <h3>Subscription</h3>
      <select name="plan" value={formData.subscription.plan} onChange={(e) => handleChange(e, "subscription", "plan")} required>
        <option value="">Select Plan</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="half-yearly">Half-Yearly</option>
        <option value="yearly">Yearly</option>
      </select>
      <input type="date" name="startDate" onChange={(e) => handleChange(e, "subscription", "startDate")} required />
      <input type="date" name="endDate" onChange={(e) => handleChange(e, "subscription", "endDate")} required />

      <h3>Payment</h3>
      <input type="number" name="amount" placeholder="Amount" onChange={(e) => handleChange(e, "payment", "amount")} required />
      <select name="method" value={formData.payment.method} onChange={(e) => handleChange(e, "payment", "method")} required>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="NetBanking">NetBanking</option>
        <option value="Wallet">Wallet</option>
      </select>
      <input type="text" name="transactionId" placeholder="Transaction ID" onChange={(e) => handleChange(e, "payment", "transactionId")} />
      <input type="date" name="paidOn" onChange={(e) => handleChange(e, "payment", "paidOn")} />

      <h3>Personal Details</h3>
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} />

      <h3>Emergency Contact</h3>
      <input type="text" name="name" placeholder="Emergency Contact Name" onChange={(e) => handleChange(e, "emergencyContact", "name")} />
      <input type="text" name="phone" placeholder="Emergency Contact Phone" onChange={(e) => handleChange(e, "emergencyContact", "phone")} />

      <input
        type="text"
        name="goals"
        placeholder="Goals (comma-separated)"
        onChange={(e) => {
          const goals = e.target.value.split(",").map((g) => g.trim());
          setFormData((prev) => ({ ...prev, goals }));
        }}
      />

      <input type="text" name="healthIssues" placeholder="Health Issues" onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
