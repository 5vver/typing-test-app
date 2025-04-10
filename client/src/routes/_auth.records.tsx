import { UserRecords } from '@/components/UserRecords';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/records')({
  component: Records,
});

function Records() {
  const { auth } = Route.useRouteContext();

  return <UserRecords />;
}
