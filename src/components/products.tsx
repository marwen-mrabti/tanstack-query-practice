import { useState } from "react";

import { format } from "date-fns";

import { useGetProducts } from "../services/queries";

export type TProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt: number;
};

export default function Products() {
  const [page, setPage] = useState(1);
  const { products, isLoading, error, isError } = useGetProducts({ page });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <ul className="grid grid-cols-1 place-content-center gap-4 bg-slate-200">
      {products?.map((product) => (
        <li key={product.id} className="w-full border border-purple-400">
          <h2 className="text-3xl">{product.name}</h2>
          <span className="text-xs">
            {format(new Date(product.createdAt), "MM/dd/yyyy")}
          </span>
        </li>
      ))}
      <div className="w-full my-4 flex justify-around items-center gap-10">
        <button
          className="py-2 px-4 bg-primary text-4xl rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={page <= 1}
          onClick={() => setPage((prev) => (prev >= 1 ? prev - 1 : 1))}
        >
          -
        </button>
        <p className="text-2xl font-semibold">{page}</p>
        <button
          className="py-2 px-4 bg-primary text-4xl rounded-lg "
          onClick={() => setPage((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </ul>
  );
}
