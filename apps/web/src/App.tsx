import { createBrowserRouter, RouterProvider } from "react-router";
import { NotificationProvider } from "./context/notifications";
import { UploadProvider } from "./context/upload";

import fetchBatch from "./loaders/fetchBatch.ts";
import { Error404Page, Layout, HomePage, Results } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/results/:batchId",
        loader: async ({ params }) => {
          const imageData = await fetchBatch(params.batchId);

          return { imageData };
        },
        Component: Results,
        errorElement: <Error404Page />,
      },
      {
        path: "*",
        Component: Error404Page,
      },
    ],
  },
]);

export default function App() {
  return (
    <NotificationProvider>
      <UploadProvider>
        <RouterProvider router={router} />
      </UploadProvider>
    </NotificationProvider>
  );
}
