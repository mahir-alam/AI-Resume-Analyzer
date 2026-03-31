function AnalysisSection({ title, items, color }) {
  const colorStyles = {
    green: {
      border: "border-green-400/20",
      bg: "bg-green-400/10",
      text: "text-green-200",
      heading: "text-green-300",
    },
    yellow: {
      border: "border-yellow-400/20",
      bg: "bg-yellow-400/10",
      text: "text-yellow-200",
      heading: "text-yellow-300",
    },
    blue: {
      border: "border-blue-400/20",
      bg: "bg-blue-400/10",
      text: "text-blue-200",
      heading: "text-blue-300",
    },
  };

  const styles = colorStyles[color];

  return (
    <div>
      {/* 🔥 IMPROVED HEADING */}
      <div className="mb-4 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${styles.bg}`}></div>

        <h3
          className={`text-sm font-bold uppercase tracking-[0.2em] ${styles.heading}`}
        >
          {title}
        </h3>
      </div>

      {/* LIST */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className={`rounded-[20px] border p-4 text-sm leading-7 ${styles.border} ${styles.bg} ${styles.text}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisSection;