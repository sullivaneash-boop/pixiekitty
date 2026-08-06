const sparkles = [
  [8, 12, 0.7],
  [22, 72, 0.45],
  [34, 28, 0.55],
  [47, 84, 0.35],
  [58, 18, 0.5],
  [67, 62, 0.68],
  [79, 34, 0.4],
  [91, 78, 0.58],
  [13, 91, 0.35],
  [86, 8, 0.45],
] as const;

export function SparkleField() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {sparkles.map(([left, top, scale], index) => (
        <span
          className="sparkle-dot"
          key={`${left}-${top}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: `scale(${scale})`,
            animationDelay: `${index * -0.83}s`,
          }}
        />
      ))}
    </div>
  );
}
