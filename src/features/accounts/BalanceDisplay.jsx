import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "BDT",
  }).format(value);
}

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(store) {
  return {
    balance: store.account.balance,
  };
}

// Old way to access state from the redux-store
// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps)(BalanceDisplay);
