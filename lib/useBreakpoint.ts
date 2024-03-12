import tailwindConfig from "@/tailwind.config";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);
const {
  theme: { screens },
} = fullConfig;
export default function useBreakpoint(query: keyof typeof screens) {
  const mediaQuery = `(min-width: ${screens[query]})`;
  let matchQueryList: any;
  if (typeof window !== "undefined") {
    matchQueryList = window.matchMedia(mediaQuery);
  }
  const [isMatch, setMatch] = useState<boolean>(false);
  const onChange = (e: MediaQueryListEvent) => setMatch(e.matches);
  useEffect(() => {
    setMatch(matchQueryList.matches);
    matchQueryList.addEventListener("change", onChange);
    return () => matchQueryList.removeEventListener("change", onChange);
  }, [matchQueryList, query]);
  return isMatch;
}
