import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";

const LoginComponent: FC = () => {
  return <div>Hello /login!</div>;
};

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});
