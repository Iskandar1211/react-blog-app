import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PostsComponent from "@/components/posts/posts.component.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({message: "Posts Page"}),
    Component() {
      return <PostsComponent/>;
    },
  },
]);

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
  </QueryClientProvider>;
}

export default App