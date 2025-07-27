// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from "axios"
// import { useAuth } from '../store/useStore'

// const formatDateTime = (isoDateStr) => {
//     const date = new Date(isoDateStr);
//     return date.toLocaleString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//   };
  
//   const renderEntries = (obj) => {
//     if (!obj || typeof obj !== "object") return null; // ✅ Check if obj is valid
  
//     return Object.entries(obj)
//       .filter(([key]) => key !== "_v" && key !== "__v" && key !== "_id")
//       .map(([key, value]) => {
//         if (typeof value === "object" && value !== null && !Array.isArray(value)) {
//           return (
//             <React.Fragment key={key}>
//               <tr>
//                 <td><strong>{key}</strong></td>
//                 <td>
//                   <table className="ml-4">
//                     <tbody>{renderEntries(value)}</tbody>
//                   </table>
//                 </td>
//               </tr>
//             </React.Fragment>
//           );
//         } else if (Array.isArray(value)) {
//           return (
//             <tr key={key}>
//               <td><strong>{key}</strong></td>
//               <td>{value.length > 0 ? value.join(", ") : "[]"}</td>
//             </tr>
//           );
//         } else {
//           const isDateField = ["startDate", "endDate", "paidOn", "createdAt"].includes(key);
//           return (
//             <tr key={key}>
//               <td><strong>{key}</strong></td>
//               <td>{isDateField ? formatDateTime(value) : value?.toString() || "-"}</td>
//             </tr>
//           );
//         }
//       });
//   };
  
  
  

// const User = () => {
//     const {id}=useParams()
//     const {token}=useAuth()
//     const [data,setData]=useState(null);
//     const fetchData=async()=>{
//         const response=await axios.get(`http://localhost:5732/api/user/${id}`,{
//             headers:{
//                 Authorization:`Bearer ${token}`
//             }
//         })
//         console.log(response.data.response);
//         setData(response.data.response)
//     }
//     useEffect(()=>{
//         fetchData()
//     },[id])
//   return (
//     <div>
//         {renderEntries(data)}
//     </div>
//   )
// }

// export default User


import { useParams } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../store/useStore'
import React, { useState, useEffect } from "react"
import {
  Calendar,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const UserProfile=()=> {
  const [isVisible, setIsVisible] = useState(false)
  const {id}=useParams()
      const {token}=useAuth()
      const [data,setData]=useState(null);
      const fetchData=async()=>{
          const response=await axios.get(`http://localhost:5732/api/user/${id}`,{
              headers:{
                  Authorization:`Bearer ${token}`
              }
          })
          console.log(response.data.response);
          setData(response.data.response)
      }
      useEffect(()=>{
          fetchData()
      },[id])

  useEffect(() => {
    setIsVisible(true)
  }, [])


  const AnimatedCard = ({ children, delay = 0 }) => (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )

  const StatusBadge = ({ status }) => {
    const variants = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertCircle },
      active: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      inactive: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle },
    }

    const variant = variants[status] || variants.pending
    const Icon = variant.icon

    return (
      <div className={`${variant.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <AnimatedCard>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">User Dashboard</h1>
            <p className="text-slate-600">Comprehensive user and subscription overview</p>
          </div>
        </AnimatedCard>

        {/* Top Row - Subscription & Payment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <AnimatedCard delay={100}>
            <div className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md p-4">
              <div className="pb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Subscription Details
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Plan</span>
                  <div className="bg-blue-100 text-blue-800 rounded-xl px-4 border-blue-200">{data?.subscription?.plan}</div>
                </div>
                <div className="flex items-center justify-between ">
                  <span className="text-sm font-medium text-slate-600">Status</span>
                  <div className="bg-green-100 text-blue-800 rounded-xl px-4 border-blue-200">
                  <StatusBadge className="" status={data?.subscription?.isActive ? "active" : "inactive"} />
                  </div>
                </div>
                {/* <Separator /> */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Start Date</span>
                    <span className="font-medium">{data?.subscription?.startDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">End Date</span>
                    <span className="font-medium">{data?.subscription?.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <div className="hover:shadow-lg transition-shadow duration-300 border-0 p-4 shadow-md">
              <div className="pb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Payment Information
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Status</span>
                  <div status={data?.payment?.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Amount</span>
                  <span className="text-2xl font-bold text-green-600">₹{data?.payment?.amount}</span>
                </div>
                {/* <Separator /> */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Method</span>
                    <span className="font-medium">{data?.payment?.method}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Transaction ID</span>
                    <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">
                      {data?.payment?.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Paid On</span>
                    <span className="font-medium">{data?.payment?.paidOn}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Middle Row - Admin & Personal Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard delay={300}>
            <div className="hover:shadow-lg transition-shadow duration-300 border-0 p-4 shadow-md">
              <div className="pb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Admin Details
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 capitalize">{data?.admin?.name}</p>
                    <p className="text-sm text-slate-600">Administrator</p>
                  </div>
                </div>
                {/* <Separator /> */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span>{data?.admin?.phone}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded">ID: {data?.admin?.id}</div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div className="hover:shadow-lg transition-shadow duration-300 border-0 p-4 shadow-md">
              <div className="pb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  Personal Information
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Gender</p>
                    <p className="font-medium capitalize">{data?.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Age</p>
                    <p className="font-medium">{data?.age} years</p>
                  </div>
                </div>
                {/* <Separator /> */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="capitalize">{data?.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="w-4 h-4" />
                    <span>{data?.email === "-" ? "Not provided" : data?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Bottom Row - Emergency Contact & Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard delay={500}>
            <div className="hover:shadow-lg transition-shadow duration-300 border-0 p-4 shadow-md">
              <div className="pb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-5 h-5 text-red-600" />
                  Emergency Contact
                </div>
              </div>
              <div>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500">No emergency contact provided</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={600}>
            <div className="hover:shadow-lg transition-shadow duration-300 border-0 p-4 shadow-md">
              <div className="pb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-5 h-5 text-slate-600" />
                  Account Information
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Created At</span>
                  <span className="font-medium">{data?.createdAt}</span>
                </div>
                {/* <Separator /> */}
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Goals</p>
                    <p className="text-sm text-slate-500">No goals set</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Health Issues</p>
                    <p className="text-sm text-slate-500">None reported</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )

}

export default UserProfile
