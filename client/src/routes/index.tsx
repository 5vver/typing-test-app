import { createFileRoute } from '@tanstack/react-router';
import {TypingModule} from "@components/TypingModule";

export const Route = createFileRoute('/')({
  component: () => <TypingModule />,
});
