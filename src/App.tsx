import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/ui/theme";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster duration={2000} position="top-right" theme="light" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
