import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="w-full rounded-lg border p-3">
      {/* Image */}
      <Skeleton className="h-40 w-full rounded-md" />

      {/* Product name */}
      <Skeleton className="mt-4 h-4 w-3/4" />

      {/* Price */}
      <Skeleton className="mt-2 h-4 w-1/3" />

      {/* Rating */}
      <Skeleton className="mt-2 h-3 w-1/2" />

      {/* Add to cart */}
      <Skeleton className="mt-4 h-9 w-full rounded-md" />
    </div>
  );
};

export default ProductSkeleton;