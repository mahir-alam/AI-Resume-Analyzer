function AnalysisSection({ title, items }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisSection;