function StatsCards({ stats }) {
  const cards = [
    {
      label: "Total Tickets",
      value: stats.total,
      sub: "+3 this week",
      subClass: "sub-up",
    },
    {
      label: "Open",
      value: stats.open,
      valueClass: "val-accent",
      sub: "Awaiting response",
      subClass: "",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      valueClass: "val-warning",
      sub: "2 high priority",
      subClass: "sub-warn",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      valueClass: "val-success",
      sub: "This month",
      subClass: "sub-up",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <div className="stat-label">{card.label}</div>
          <div className={`stat-value ${card.valueClass || ""}`}>{card.value}</div>
          <div className={`stat-sub ${card.subClass}`}>{card.sub}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;