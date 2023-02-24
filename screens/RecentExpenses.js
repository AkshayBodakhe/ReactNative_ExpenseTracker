import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/Expenses/ExpensesOutput'
import { ExpenseContext } from '../store/expense-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

const RecentExpenses = () => {
  
  const [isFetching , setIsFetching ] = useState(true);
  const [error , setError ] = useState();

  const expensesCtx = useContext(ExpenseContext);

  useEffect(()=>{
    async function getExpenses(){
      setIsFetching(true);
      try {
        const expenses =  await fetchExpenses();
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError("Could not fetch expenses!");
      }
       setIsFetching(false);
    }
    getExpenses();
  },[])

   if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={()=>setError(null)}/>
  }

  if(isFetching){
    return <LoadingOverlay/>
  }

  const recentExpenses = expensesCtx.expenses.filter((expense)=>{
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today,7);

    return (expense.date >= date7DaysAgo) && (expense.date <= today)
  })
  return (
    <ExpensesOutput expenses={recentExpenses} expesesPeriod="Last 7 days" fallbackText="No expenses registered for the last 7 days!"/>
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})