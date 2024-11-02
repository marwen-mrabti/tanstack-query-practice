import { useGetUsers } from "./services/queries";

function App() {
  const { data, isLoading, error } = useGetUsers();

  return (
    <main className="bg-background w-full min-h-[100dvh] max-w-7xl mx-auto flex flex-col justify-start items-center py-4 px-4 gap-6">
      <h1 className="text-3xl font-extrabold">tanstack-query</h1>
      <div className="bg-primary h-20 w-full text-primary-foreground">
        <p>hello world</p>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data && <p>{data.length}</p>}
      </div>
    </main>
  );
}

export default App;
