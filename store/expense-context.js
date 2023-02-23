import {createContext, useDebugValue, useReducer} from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2021-01-105'),
  },
  {
    id: 'e3',
    description: 'shirts',
    amount: 60.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'books',
    amount: 18.99,
    date: new Date('2021-02-19'),
  },
  {
    id: 'e5',
    description: 'earbuds',
    amount: 50.0,
    date: new Date('2023-02-22'),
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2021-01-10'),
  },
  {
    id: 'e8',
    description: 'shirts',
    amount: 60.99,
    date: new Date('2023-02-18'),
  },
  {
    id: 'e9',
    description: 'books',
    amount: 18.99,
    date: new Date('2021-02-19'),
  },
  {
    id: '10',
    description: 'earbuds',
    amount: 50.0,
    date: new Date('2021-02-18'),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: id => {},
  updateExpense: (id, {description, amount, date}) => {},
});

function expesesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expesesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
    // console.log("added!")
  }

  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses : expensesState,
    addExpense : addExpense,
    deleteExpense : deleteExpense,
    updateExpense : updateExpense
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export default ExpensesContextProvider;
