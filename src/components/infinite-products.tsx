import { useGetInfiniteProducts } from "../services/queries";

export default function InfiniteProducts() {
  const productsQuery = useGetInfiniteProducts();

  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productsQuery.isError) {
    return <div>{productsQuery.error?.message}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4  w-full">
      <ul className="grid grid-cols-1 place-content-center gap-4 bg-slate-200">
        {productsQuery.data?.pages?.map((products) =>
          products?.map((product) => (
            <li key={product.id} className="w-full border border-purple-400">
              <h2 className="text-3xl">{product.name}</h2>
            </li>
          ))
        )}
      </ul>

      <button
        className="py-2 px-4 bg-lime-500 text-4xl rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={!productsQuery.hasNextPage}
        onClick={() => productsQuery.fetchNextPage()}
      >
        {productsQuery.isFetchingNextPage || productsQuery.isFetching
          ? "Loading..."
          : productsQuery.hasNextPage
            ? "Load More"
            : "Nothing more to load"}
      </button>
    </div>
  );
}
