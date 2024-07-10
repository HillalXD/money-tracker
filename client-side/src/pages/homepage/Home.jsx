<<<<<<< HEAD
import React, { useCallback, useContext } from 'react'
import "./home.scss"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'
import { Link, Navigate } from 'react-router-dom'

const Home = () => {

const { currentUser } = useContext(AuthContext)
const username = currentUser.username
const queryClient = useQueryClient()

const { isPending, error, data } = useQuery({
  queryKey: ['home'],
  queryFn: async () =>
    await axios.get("http://localhost:3030/home", { withCredentials: true }).then((res) => {
      return res.data
    }),
})

const deleteTransaction = async (input) => {
  console.log(input)
  try {
    await axios.delete(`http://localhost:3030/transaction/delete/${input}`, { withCredentials: true }).then((res) => {
      return res.data
    })
  } catch (error) {
    console.log(error.message)
  }
  
}

const mutationTransaction = useMutation({
  mutationFn: deleteTransaction,
  onSuccess: () => {
    // Invalidate and refetch data
    queryClient.invalidateQueries({ queryKey: ['home'] })
  },
})

const deleteHandler = (e) => {
  e.preventDefault()

  mutationTransaction.mutate(e.target.value)
}

const expense = expenseCount(data)
const revenue = revenueCount(data)

console.log(data)
  

  if (isPending) return 'Loading...'
  if (error) return <Navigate to="/login" />
=======
import React, { useCallback, useContext } from "react";
import "./home.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["home"],
    queryFn: async () =>
      await axios
        .get("http://localhost:3030/home", { withCredentials: true })
        .then((res) => {
          return res.data;
        }),
  });

  const deleteTransaction = async (input) => {
    console.log(input);
    try {
      await axios
        .delete(`http://localhost:3030/transaction/delete/${input}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const mutationTransaction = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      // Invalidate and refetch data
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });

  const deleteHandler = (e) => {
    e.preventDefault();

    mutationTransaction.mutate(e.target.value);
  };

  const expense = expenseCount(data);
  const revenue = revenueCount(data);

  console.log(data);

  if (isPending) return "Loading...";
  if (error) return <Navigate to="/login" />;
>>>>>>> d08f619 (mongodb migrate and google oauth)

  return (
    <div className="home">
      <div className="container">
<<<<<<< HEAD
        <h1>{username} Balance</h1>
        <div className="cards">
            <div className="card-balance">
                <i className="bx bx-money"></i>
                <span className="info">
                <h3><span className='dollar'>$ </span><span className="budget_card">{revenue - expense}</span></h3>
                </span>
            </div>
            <div className="card-info">
              <div className="card-expense">
                  <i className="bx bx-dollar"></i>
                  <span className="info">
                  <h3><span>$</span><span className="balance_card">{revenue}</span></h3>
                  </span>
              </div>
              <div className="card-budget">
                  <i className="bx bx-credit-card"></i>
                  <span className="info">
                  <h3><span>$</span><span className="expenses_card">{expense}</span></h3>
                  </span>
              </div>
            </div>
              <Link className="add-transaction" to="/transaction/add">add new transaction</Link>
=======
        <h1>{user.name} Balance</h1>
        <div className="cards">
          <div className="card-balance">
            <i className="bx bx-money"></i>
            <span className="info">
              <h3>
                <span className="dollar">$ </span>
                <span className="budget_card">{revenue - expense}</span>
              </h3>
            </span>
          </div>
          <div className="card-info">
            <div className="card-expense">
              <i className="bx bx-dollar"></i>
              <span className="info">
                <h3>
                  <span>$</span>
                  <span className="balance_card">{revenue}</span>
                </h3>
              </span>
            </div>
            <div className="card-budget">
              <i className="bx bx-credit-card"></i>
              <span className="info">
                <h3>
                  <span>$</span>
                  <span className="expenses_card">{expense}</span>
                </h3>
              </span>
            </div>
          </div>
          <Link className="add-transaction" to="/transaction/add">
            add new transaction
          </Link>
>>>>>>> d08f619 (mongodb migrate and google oauth)
        </div>

        <div className="tbl_content">
          <h3>Budget Details</h3>
          <div className="tbl_data">
<<<<<<< HEAD
          {data.length ? data.map((data) =>
            <ul className="tbl_tr_content" key={data.transaction_id}>
              <li>{data.item_name}</li>
              <li>{data.transaction_time}</li>
              <li>{data.description}</li>
              <li className={ data.is_revenue ? "amount-green center-child" : "amount-red center-child"}><span>$</span>{data.amount}</li>
              <li>
                <button onClick={deleteHandler} type="button" value={data.transaction_id} className="btn_delete">Delete</button>
              </li>
            </ul>
          ): <h1>no transaction yet</h1> }
=======
            {data.length ? (
              data.map((data) => (
                <ul className="tbl_tr_content" key={data.transaction_id}>
                  <li>{data.itemName}</li>
                  <li>{data.transactionTime}</li>
                  <li>{data.description}</li>
                  <li
                    className={
                      data.isRevenue
                        ? "amount-green center-child"
                        : "amount-red center-child"
                    }
                  >
                    <span>$</span>
                    {data.amount}
                  </li>
                  <li>
                    <button
                      onClick={deleteHandler}
                      type="button"
                      value={data._id}
                      className="btn_delete"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              ))
            ) : (
              <h1>no transaction yet</h1>
            )}
>>>>>>> d08f619 (mongodb migrate and google oauth)
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  )
}

const expenseCount = (data) => {
  var expense = []
  let totalExpense = 0

  if(data){
    data.forEach(element => {
      if(!element.is_revenue){
        expense.push(element.amount)
      } else {
        expense.push(0)
=======
  );
};

const expenseCount = (data) => {
  var expense = [];
  let totalExpense = 0;

  if (data) {
    data.forEach((element) => {
      if (!element.isRevenue) {
        expense.push(element.amount);
      } else {
        expense.push(0);
>>>>>>> d08f619 (mongodb migrate and google oauth)
      }
    });
  }

<<<<<<< HEAD
  expense.forEach( x => {
    totalExpense += x
  })

  return totalExpense
}

const revenueCount = (data) => {
  var revenue = []
  let totalRevenue = 0

  if(data){
    data.forEach(element => {
      if(element.is_revenue){
        revenue.push(element.amount)
      } else {
        revenue.push(0)
      }
  });
}

revenue.forEach( x => {
  totalRevenue += x
})

return totalRevenue
}



export default Home
=======
  expense.forEach((x) => {
    totalExpense += x;
  });

  return totalExpense;
};

const revenueCount = (data) => {
  var revenue = [];
  let totalRevenue = 0;

  if (data) {
    data.forEach((element) => {
      if (element.isRevenue) {
        revenue.push(element.amount);
      } else {
        revenue.push(0);
      }
    });
  }

  revenue.forEach((x) => {
    totalRevenue += x;
  });

  return totalRevenue;
};

export default Home;
>>>>>>> d08f619 (mongodb migrate and google oauth)
