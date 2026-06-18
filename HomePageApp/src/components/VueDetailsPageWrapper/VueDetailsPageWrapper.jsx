import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const VueDetailsPageWrapper = () => {
  const containerRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    let unmountVueApp;

    const loadVueRemote = async () => {
      const remote = await import("vueDetails/mount");

      const mount = remote.mount || remote.default;

      if (typeof mount !== "function") {
        throw new Error("vueDetails/mount does not export a mount function");
      }

      const result = mount(containerRef.current, {
        initialPath: `/details/${id}`,
        movieId: id,
      });

      if (typeof result === "function") {
        unmountVueApp = result;
      } else if (result && typeof result.unmount === "function") {
        unmountVueApp = result.unmount;
      }
    };

    loadVueRemote();

    return () => {
      if (typeof unmountVueApp === "function") {
        unmountVueApp();
      }
    };
  }, [id]);

  return <div ref={containerRef} />;
};

export default VueDetailsPageWrapper;