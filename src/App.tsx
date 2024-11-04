import InfiniteProducts from "./components/infinite-products";
import Products from "./components/products";
import Users from "./components/users";

function App() {
  return (
    <main className="bg-background w-full min-h-[100dvh] max-w-7xl mx-auto flex flex-col justify-start items-center py-4 px-4 gap-6">
      <div className=" h-auto w-full text-primary-foreground flex justify-center  items-center gap-10">
        <h1 className="text-3xl font-extrabold">tanstack-query</h1>
      </div>
      <div className="bg-secondary h-auto w-full text-primary-foreground flex flex-col justify-around items-center gap-10">
        <Users />
        <hr className="h-2 w-full bg-background" />
        <Products />
        <hr className="h-2 w-full bg-background" />
        <InfiniteProducts />
      </div>
    </main>
  );
}

export default App;
