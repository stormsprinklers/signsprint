type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className = "", inverted = false }: LogoProps) {
  const mark = inverted ? "bg-white text-blue-700" : "bg-blue-700 text-white";
  const word = inverted ? "text-white" : "text-navy";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${mark} font-display text-sm font-bold tracking-tight`}>
        SS
      </span>
      <span className={`font-display text-lg font-semibold tracking-tight ${word}`}>
        SignSprint
      </span>
    </span>
  );
}
