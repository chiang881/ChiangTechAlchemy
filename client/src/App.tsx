import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import EchoStory from "@/pages/EchoStory";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/echo" component={EchoStory} />
      <Route path="/echo/:from" component={EchoStory} />
      <Route path="/story" component={EchoStory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
