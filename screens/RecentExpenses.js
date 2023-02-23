import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/Expenses/ExpensesOutput'
import { ExpenseContext } from '../store/expense-context'
import { getDateMinusDays } from '../util/date'

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);

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