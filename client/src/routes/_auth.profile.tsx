import { Profile } from '@components/Profile/Profile.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/profile')({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { auth } = Route.useRouteContext();
  return <Profile auth={auth} />;
}
