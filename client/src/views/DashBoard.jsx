import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import axios from "axios"

export default function DashBoard() {
    const [open, setOpen] = useState(false)
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
    const [userData,setUserData]=useState([]);
    const fetchData=async()=>{
        try {
            const response=await axios.get("http://localhost:5732/api/allusers")
            setUserData(response.data.response)
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

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
        setOpen(false)
        console.log("Form Data:", formData);
    };


    return (
        <div className='h-[100vh] w-full bg-blue-100 flex flex-col'>
            <button
                onClick={() => setOpen(true)}
                className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm w-fit font-semibold text-gray-900 hover:bg-gray-950/10"
            >
               Add new User
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg space-y-6">
                                <h2 className="text-2xl font-bold text-center text-gray-800">User Registration</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        onChange={handleChange}
                                        required
                                        className="input-field border p-1 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        onChange={handleChange}
                                        required
                                        className="input-field border p-1 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        placeholder="WhatsApp"
                                        onChange={handleChange}
                                        className="input-field border p-1 rounded-md"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                       className="input-field border p-1 rounded-md"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Subscription</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <select
                                            name="plan"
                                            value={formData.subscription.plan}
                                            onChange={(e) => handleChange(e, "subscription", "plan")}
                                            required
                                            className="input-field border p-1 rounded-md"
                                        >
                                            <option value="">Select Plan</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="quarterly">Quarterly</option>
                                            <option value="half-yearly">Half-Yearly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                        <input
                                            type="date"
                                            name="startDate"
                                            onChange={(e) => handleChange(e, "subscription", "startDate")}
                                            required
                                            className="input-field border p-1 rounded-md"
                                        />
                                        <input
                                            type="date"
                                            name="endDate"
                                            onChange={(e) => handleChange(e, "subscription", "endDate")}
                                            required
                                            className="input-field border p-1 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Payment</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input
                                            type="number"
                                            name="amount"
                                            placeholder="Amount"
                                            onChange={(e) => handleChange(e, "payment", "amount")}
                                            required
                                            className="input-field border p-1 rounded-md"
                                        />
                                        <select
                                            name="method"
                                            value={formData.payment.method}
                                            onChange={(e) => handleChange(e, "payment", "method")}
                                            required
                                            className="input-field border p-1 rounded-md"
                                        >
                                            <option value="">Method</option>
                                            <option value="Cash">Cash</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Card">Card</option>
                                            <option value="NetBanking">NetBanking</option>
                                            <option value="Wallet">Wallet</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="transactionId"
                                            placeholder="Transaction ID"
                                            onChange={(e) => handleChange(e, "payment", "transactionId")}
                                            className="input-field border p-1 rounded-md"
                                        />
                                        <input
                                            type="date"
                                            name="paidOn"
                                            onChange={(e) => handleChange(e, "payment", "paidOn")}
                                            className="input-field border p-1 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Personal Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="input-field border p-1 rounded-md"
                                        >
                                            <option value="">Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <input
                                            type="number"
                                            name="age"
                                            placeholder="Age"
                                            onChange={handleChange}
                                           className="input-field border p-1 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            onChange={handleChange}
                                            className="input-field border p-1 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Emergency Contact</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Emergency Contact Name"
                                            onChange={(e) => handleChange(e, "emergencyContact", "name")}
                                            className="input-field border p-1 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Emergency Contact Phone"
                                            onChange={(e) => handleChange(e, "emergencyContact", "phone")}
                                            className="input-field border p-1 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="goals"
                                        placeholder="Goals (comma-separated)"
                                        onChange={(e) => {
                                            const goals = e.target.value.split(",").map((g) => g.trim());
                                            setFormData((prev) => ({ ...prev, goals }));
                                        }}
                                        className="input-field border p-1 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        name="healthIssues"
                                        placeholder="Health Issues"
                                        onChange={handleChange}
                                        className="input-field border p-1 rounded-md"
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 w-full text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <div>
                {
                     userData && userData?.map((data,ind)=>{
                        return <div key={ind}>
                            <div>{data.name}</div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
