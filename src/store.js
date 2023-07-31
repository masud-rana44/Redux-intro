import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      if (state.balance < state.loan) return state;

      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 5000 });

store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 20000,
    purpose: "Buy a phone",
  },
});

store.dispatch({ type: "account/withdraw", payload: 5000 });

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());

// Action creator functions
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(1000));

store.dispatch(withdraw(200));

store.dispatch(requestLoan(5000, "buy some cloth"));

store.dispatch(payLoan());
console.log(store.getState());
