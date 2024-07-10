import React, { useState } from 'react'
import "./transaction.scss"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function TransactionAdd() {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [input, setInput] = useState({
    amount: 0,
<<<<<<< HEAD
    date: null,
    name: null,
    description: null,
    is_revenue: null
=======
    transactionTime: null,
    itemName: null,
    description: null,
    isRevenue: null
>>>>>>> d08f619 (mongodb migrate and google oauth)
  })
  const [errMessage, setErrMessage] = useState()


  const inputHandler= (event) => {
    setInput( prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const addTransaction = async (input) => {
    console.log(input)
    try {
      await axios.post("http://localhost:3030/transaction/add", input, { withCredentials: true }).then((res) => {
      return navigate("/")
    })
    } catch (error) {
      setErrMessage("please fill all information")
    }
    
  }

  const mutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      // Invalidate and refetch data
      queryClient.invalidateQueries({ queryKey: ['home'] })
    },
  })

<<<<<<< HEAD
=======
  console.log(input)
>>>>>>> d08f619 (mongodb migrate and google oauth)

  const transactionAdd = (e) => {
    e.preventDefault()
  
    const amount = parseInt(input.amount)
<<<<<<< HEAD
    const revenue = input.is_revenue === "expense" ? false : true

    mutation.mutate({...input, amount, is_revenue: revenue})
=======
    const revenue = input.isRevenue === "expense" ? false : true

    console.log(revenue)

    mutation.mutate({...input, amount, isRevenue: revenue})
>>>>>>> d08f619 (mongodb migrate and google oauth)
  }

  return (
    <div className='form-parent'>
     <div className="form-container">
      <form className='add-transaction'>
        {errMessage}
        <h2 className='title'>Add Transaction Record</h2>
          <div className="input">
            <input onChange={inputHandler} type="number" name="amount" placeholder="amount"/>
<<<<<<< HEAD
            <input onChange={inputHandler} type="date" name="date" placeholder="time"/>
            <input onChange={inputHandler} type="text" name="name" placeholder="items"/>
            <input onChange={inputHandler} type="text" name="description" placeholder="details"/>
            <select onChange={inputHandler} name="is_revenue">
=======
            <input onChange={inputHandler} type="date" name="transactionTime" placeholder="time"/>
            <input onChange={inputHandler} type="text" name="itemName" placeholder="items"/>
            <input onChange={inputHandler} type="text" name="description" placeholder="details"/>
            <select onChange={inputHandler} name="isRevenue">
>>>>>>> d08f619 (mongodb migrate and google oauth)
              <option value="revenue">income</option>
              <option value="expense">expense</option>
            </select>
          </div>
          <button onClick={transactionAdd} className="btn-red btn" name='expense-btn' type='submit'>add transaction</button>
      </form>
     </div>
     </div>
  )
}

export default TransactionAdd;