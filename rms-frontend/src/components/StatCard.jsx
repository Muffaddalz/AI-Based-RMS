function StatCard({ title, value, change, trend = "neutral" }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{title}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-meta stat-meta-${trend}`}>{change}</div>
    </div>
  );
}

export default StatCard;
