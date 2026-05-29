function TopItems({ items = [] }) {
  if (!items.length) {
    return <div className="state-text">No top items available.</div>;
  }

  return (
    <div className="top-items-list">
      {items.map((item, index) => (
        <div className="top-item-row" key={index}>
          <div>
            <div className="top-item-name">{item.name}</div>
            <div className="top-item-meta">{item.orders} orders</div>
          </div>
          <div className="top-item-revenue">₹{item.revenue}</div>
        </div>
      ))}
    </div>
  );
}

export default TopItems;
