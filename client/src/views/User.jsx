import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../store/useStore'

const formatDateTime = (isoDateStr) => {
    const date = new Date(isoDateStr);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };
  
  const renderEntries = (obj) => {
    if (!obj || typeof obj !== "object") return null; // ✅ Check if obj is valid
  
    return Object.entries(obj)
      .filter(([key]) => key !== "_v" && key !== "__v" && key !== "_id")
      .map(([key, value]) => {
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          return (
            <React.Fragment key={key}>
              <tr>
                <td><strong>{key}</strong></td>
                <td>
                  <table className="ml-4">
                    <tbody>{renderEntries(value)}</tbody>
                  </table>
                </td>
              </tr>
            </React.Fragment>
          );
        } else if (Array.isArray(value)) {
          return (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>{value.length > 0 ? value.join(", ") : "[]"}</td>
            </tr>
          );
        } else {
          const isDateField = ["startDate", "endDate", "paidOn", "createdAt"].includes(key);
          return (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>{isDateField ? formatDateTime(value) : value?.toString() || "-"}</td>
            </tr>
          );
        }
      });
  };
  
  
  

const User = () => {
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
  return (
    <div>
        {renderEntries(data)}
    </div>
  )
}

export default User