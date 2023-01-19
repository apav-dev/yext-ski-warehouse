import { useState, useEffect } from "react";
import { getRuntime } from "@yext/pages/util";

// export const useURLSearchParams = () => {
//   const [urlSearchParams, setUrlSearchParams] =
//     useState<URLSearchParams | null>(null);

//   useEffect(() => {
//     if (window) {
//       setUrlSearchParams(new URLSearchParams(window.location.search));
//     }
//   }, [getRuntime().isServerSide]);

//   useEffect(() => {
//     const onChange = () => {
//       console.log("popstate");
//       setUrlSearchParams(new URLSearchParams(window.location.search));
//     };

//     window.addEventListener("pushstate", onChange);

//     return () => {
//       window.removeEventListener("popstate", onChange);
//     };
//   }, [urlSearchParams]);

//   return urlSearchParams;
// };

const useURLSearchParams = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    if (!getRuntime().isServerSide) {
      const searchParams = new URLSearchParams(window.location.search);
      setSearchParams(searchParams);
      const handleLocationChange = () => {
        setSearchParams(new URLSearchParams(window.location.search));
      };
      window.addEventListener("popstate", handleLocationChange);
      // Cleanup function
      return () => {
        window.removeEventListener("popstate", handleLocationChange);
      };
    }
  }, []);

  return searchParams;
};

export default useURLSearchParams;
