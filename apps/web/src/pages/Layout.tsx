import { Outlet, useMatch } from "react-router";

import { Header } from "@/components";

export default function Layout() {
  const isHome = useMatch("/");

  return (
    <>
      {!isHome && <Header />}
      <Outlet />
      <p className="text-white text-center text-sm py-4">Copyright © 2026 Eddryan Aranzanso</p>
    </>
  );
}
