import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from './Input';
import Button from '../../UI/Button';
import getFormattedDate from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
    //   isValid: defaultValues ? true : false,
    //   isValid: !!defaultValues, 
         isValid : true     // later change , because is addform it was showing error message initially
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
    //   isValid: defaultValues ? true : false, // instead of ternary we can also do this
    isValid : true 
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid : true 
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value : enteredValue , isValid : true}
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      // + converts the string into number
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
    //   Alert.alert('Invalid input', 'Please check your input values !   ');
    //   return;
    setInputs(curInputs => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          inValid = {!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          inValid = {!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        inValid = {!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect : false // default is true
          // autoCapitalize : 'none'
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {/* {isEditing ? 'Update' : 'Add'} */}
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText : {
    textAlign : 'center',
    color : GlobalStyles.colors.error500,
    alignItems : 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
