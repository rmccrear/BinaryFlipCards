import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import BinaryGame from "@/pages/binary-game";

import { Router as WouterRouter, useLocation as useWouterLocation } from "wouter";

type BaseLocationHook = () => [string, (path: string, ...args: any[]) => any];

// Type hint: return a tuple [string, function]
const useBasePathLocation = (): [string, (to: string) => void] => {
  const base = import.meta.env.VITE_BASE_PATH || "/";
  const [location, setLocationRaw] = useWouterLocation();

  const setLocation = (to: string) => {
    // Avoid double slashes
    const normalized = to.startsWith("/") ? to.slice(1) : to;
    setLocationRaw(`${base}${normalized}`);
  };

  const stripBase = (path: string) => {
    return path.startsWith(base) ? path.slice(base.length - 1) : path;
  };

  return [stripBase(location), setLocation];
};



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
