// Sales  path
// Option one.
// collll/docssss/colll/docs/colll/docsssss
// sales/ownerId/sales/date/sales/timestamp
// const statsRef = firestore.collection("stats").doc(user.id);
const getSalesByDate = () => {
  salesRef.onSnapshot();
};
// Cons
// Not easy to query
// Pros
// Organized table

// Option two.
// collll/docssss/colll/docsssss
// sales/ownerId/sales/timestamp
const getSalesByDate = () => {
  salesRef.where("date", "===", date).onSnapshot();
};
// Cons
// Too many docs in one table
// Pros
// Easy to query
// Probably the best

const getStatistics = () => {
  salesRef.where("date", "===", date).onSnapshot();
};
statsRef.onSnapshot((snapShot) => {
  if (!snapShot.exists) {
    setIsStatsLoading(false);
    return;
  }
  const statistic = snapShot.data();
  setRevenue(statistic.revenue);
  setIsStatsLoading(false);
});

// Revenu
getStatistics("revenue");
// Cashiers
getStatistics("cashier");
// Invoices
getStatistics("invoice");
// Sold
getStatistics("sold");
