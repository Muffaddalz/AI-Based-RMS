function OrdersTable({ orders = [] }) {
  if (!orders.length) {
    return <div className="state-text">No active orders found.</div>;
  }

  return (
    <div className="table-wrap">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Table</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 5).map((order) => {
            const status = (order.status || "pending").toLowerCase();

            return (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer || "Walk-in Customer"}</td>
                <td>{order.table || "-"}</td>
                <td>₹{Number(order.total || 0).toFixed(2)}</td>
                <td>
                  <span className={`status-badge status-${status}`}>
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
