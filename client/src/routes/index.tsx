import { TypingModule } from '@components/TypingModule';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <TypingModule />,
});
