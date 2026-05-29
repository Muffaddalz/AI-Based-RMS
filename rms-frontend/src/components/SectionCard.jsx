function SectionCard({ title, children }) {
  return (
    <section className="section-card">
      <div className="section-card-header">
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );
}

export default SectionCard;
