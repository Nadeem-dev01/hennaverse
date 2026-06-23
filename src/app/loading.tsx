export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-gold/10 border-t-gold animate-spin" />
        <div className="absolute w-10 h-10 rounded-full border-4 border-purple/10 border-b-purple animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
    </div>
  );
}
