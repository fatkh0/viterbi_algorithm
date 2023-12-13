import { Form } from "./components/Form";
import { Layout } from "./components/Layout";
import { LayoutProvider } from "./components/Layout/components/LayoutProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"; // Optional, for debugging

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <div className="App">
          <Layout>
            <Form />
          </Layout>
        </div>
      </LayoutProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
