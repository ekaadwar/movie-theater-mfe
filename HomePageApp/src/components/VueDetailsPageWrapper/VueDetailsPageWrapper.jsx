import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const VUE_DETAILS_REMOTE_ENTRY =
  "http://localhost:3004/assets/remoteEntry.js";

const VueDetailsPageWrapper = () => {
  const containerRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    let unmountVueApp;
    let isCancelled = false;

    const loadVueRemote = async () => {
      try {
        const remoteEntry = await import(
          /* webpackIgnore: true */ VUE_DETAILS_REMOTE_ENTRY
        );

        if (typeof remoteEntry.init === "function") {
          await remoteEntry.init({});
        }

        const exposedModule = await remoteEntry.get("./mount");

        const remoteModule =
          typeof exposedModule === "function"
            ? await exposedModule()
            : exposedModule;

        if (isCancelled || !containerRef.current) return;

        const mountedApp = remoteModule.mountApp(containerRef.current, {
          initialPath: `/details/${id}`,
        });

        if (typeof mountedApp === "function") {
          unmountVueApp = mountedApp;
        }

        if (mountedApp && typeof mountedApp.unmount === "function") {
          unmountVueApp = mountedApp.unmount;
        }
      } catch (error) {
        console.error("Failed to load Vue Details remote:", error);
      }
    };

    loadVueRemote();

    return () => {
      isCancelled = true;

      if (typeof unmountVueApp === "function") {
        unmountVueApp();
      }
    };
  }, [id]);

  return <div ref={containerRef} />;
};

export default VueDetailsPageWrapper;