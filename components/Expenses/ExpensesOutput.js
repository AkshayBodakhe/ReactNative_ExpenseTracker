import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalStyles} from '../../constants/styles';

const ExpensesOutput = ({expenses, expesesPeriod, fallbackText}) => {
   let content = <Text style={styles.infoText}>{fallbackText}</Text> 

   if(expenses.length > 0){
    content = <ExpensesList expenses={expenses} />
   }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expesesPeriod} />
      {/* <ExpensesList expenses={expenses} /> */}
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.myBg,
  },
  infoText : {
    color : 'darkred',
    fontSize : 16,
    textAlign : 'center',
    margin : 32
  }
});
