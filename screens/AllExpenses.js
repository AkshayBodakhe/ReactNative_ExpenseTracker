import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import {ExpenseContext} from '../store/expense-context';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expesesPeriod="total"
      fallbackText="No registered expenses found !"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
