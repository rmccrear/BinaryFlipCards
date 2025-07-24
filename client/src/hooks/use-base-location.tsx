import { useBrowserLocation } from "wouter/use-browser-location";
import type { BaseLocationHook } from "wouter";

const base = import.meta.env.VITE_BASE_PATH || "/BinaryFlipCards/";

const useBasePathLocation: BaseLocationHook = () => {
  const [location, setLocation] = useBrowserLocation();

  const stripBase = (path: string): string =>
    path.startsWith(base) ? path.slice(base.length - 1) || "/" : path;

  const setWithBase = (to: string, ...args: any[]) => {
    const normalized = `${base}${to.replace(/^\/+/, "")}`;
    if (location !== normalized) {
      setLocation(normalized, ...args);
    }
  };

  return [stripBase(location), setWithBase];
};

export default useBasePathLocation;
