export default function OrbPlaceholder() {
  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[480px] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-terracotta/20 animate-pulse" />
        {/* Middle ring */}
        <div className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full border border-coral/25 animate-pulse" style={{ animationDelay: "0.2s" }} />
        {/* Inner ring */}
        <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border border-terracotta/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
        {/* Center crystal placeholder */}
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-terracotta/10 border border-terracotta/20 animate-pulse" style={{ animationDelay: "0.6s" }} />
      </div>
    </div>
  );
}
