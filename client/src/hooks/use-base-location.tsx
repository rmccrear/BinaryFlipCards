import { useLocation } from "wouter";
import type { BaseLocationHook } from "wouter";

const useBasePathLocation: BaseLocationHook = () => {
  const base = import.meta.env.VITE_BASE_PATH || "/";
  const [location, setLocationRaw] = useLocation();

  // Strip the base from the current location
  const stripBase = (path: string) => {
    if (path.startsWith(base)) {
      return path.slice(base.length - 1) || "/";
    }
    return path;
  };

  // Prefix with base, avoid triggering same path
  const setLocation = (to: string, ...args: any[]) => {
    const prefixed = `${base}${to.replace(/^\/+/, "")}`;
    if (location !== prefixed) {
      setLocationRaw(prefixed, ...args);
    }
  };

  return [stripBase(location), setLocation];
};

export default useBasePathLocation;
