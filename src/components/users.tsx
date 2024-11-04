import { useDeleteUser, useEditUser } from "../services/mutations";
import { useGetUsers } from "../services/queries";

export type TUser = {
  id: number;
  name: string;
  avatar: string;
  createdAt: string;
};

export default function Users() {
  const { users, isLoading, error } = useGetUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {users?.map((user) => (
        <li key={user.id} className="w-full border border-primary">
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}

function UserCard({ user }: { user: TUser }) {
  const deleteUserMutation = useDeleteUser();
  const editUserMutation = useEditUser();

  // synchronous mutation
  const handleEditUser = () => {
    editUserMutation.mutate({
      id: user.id,
      data: {
        name: "marwen",
        avatar:
          "https://tanstack.com/_build/assets/logo-color-600w-Bx4vtR8J.png",
      },
    });
    console.log("editing the user");
  };

  // asynchronous mutation
  const handleDeleteUser = async () => {
    await deleteUserMutation.mutateAsync(user.id);
    console.log("user deleted");
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <img src={user.avatar || "/avatar-placeholder.webp"} alt={user.name} />
      <p className="text-lg font-medium">{user.name}</p>
      <div className="flex justify-between items-center w-full px-4">
        <button
          className="text-md bg-green-primary hover:opacity-80 rounded px-2 py-1 text-primary-foreground my-2 capitalize"
          onClick={handleEditUser}
        >
          {editUserMutation.isPending ? "processing..." : "edit"}
        </button>
        <button
          className="text-md bg-destructive hover:opacity-80 rounded px-2 py-1 text-primary-foreground my-2 capitalize"
          onClick={handleDeleteUser}
        >
          {deleteUserMutation.isPending ? "processing..." : "delete"}
        </button>
      </div>
    </div>
  );
}
