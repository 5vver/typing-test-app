import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { username, auth } = Route.useRouteContext();
  const router = useRouter();

  const logOut = async () => {
    auth.logout();
    router.history.push("/login");
  };

  return (
    <div>
      <div>Username: {username}</div>
      <button
        onClick={logOut}
        className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
