export default function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          role="presentation"
          key={i}
          className="animate-pulse bg-gray-light rounded-md h-96"
        />
      ))}
    </>
  );
}
