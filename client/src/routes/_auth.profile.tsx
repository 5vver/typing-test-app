import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Profile } from "@components/Profile/Profile.tsx";

export const Route = createFileRoute("/_auth/profile")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { auth } = Route.useRouteContext();
  const router = useRouter();

  const logOut = async () => {
    const loggedOut = await auth.logout();

    if (!loggedOut) {
      console.error("Failed to log out");
      return;
    }

    router.invalidate();
    router.history.push("/");
  };

  return <Profile auth={auth} />;
}
