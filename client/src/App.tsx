import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import BinaryGame from "@/pages/binary-game";

import { Router as WouterRouter } from "wouter";

import useBasePathLocation from "@/hooks/use-base-location";

function Router() {
  return (
    <WouterRouter hook={useBasePathLocation}>
      <Switch>
        <Route path="/" component={BinaryGame} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
