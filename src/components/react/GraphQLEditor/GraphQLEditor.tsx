import { useState, useEffect } from "react";
import type { FetcherParams, FetcherResult } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import GraphQLLogo from "./GraphQLLogo";
import "graphiql/graphiql.css";
import "./styles.css";

// Helper to check if variables are empty
const isEmptyVariables = (variables?: string): boolean => {
  if (!variables) return true;
  const trimmed = variables.trim();
  return trimmed === "" || trimmed === "{}" || trimmed === "null";
};

interface GraphQLEditorProps {
  network?: "mainnet" | "testnet" | "devnet";
  query?: string;
  variables?: string;
  endpoint?: string;
  hideNetworkSelector?: boolean; // Changed prop name
  showFullscreenButton?: boolean;
}

const getNetworkUrl = (network = "mainnet", customEndpoint?: string) => {
  if (customEndpoint) return customEndpoint;
  return `https://api.${network}.libra2labs.com/v1/graphql`;
};

export const GraphQLEditor: React.FC<GraphQLEditorProps> = ({
  network: initialNetwork = "mainnet",
  query,
  variables,
  endpoint,
  hideNetworkSelector = false,
  showFullscreenButton = true,
}) => {
  const [network, setNetwork] = useState(initialNetwork);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    // Function to update theme when `data-theme` changes
    const updateTheme = () => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      if (newTheme === "dark" || newTheme === "light") {
        setTheme(newTheme);
      }
    };

    // MutationObserver to watch `data-theme` changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Run once to ensure theme is set correctly on mount
    updateTheme();

    return () => {
      observer.disconnect();
    };
  }, []);

  const fetcher = async (graphQLParams: FetcherParams): Promise<FetcherResult> => {
    try {
      const response = await fetch(getNetworkUrl(network, endpoint), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphQLParams),
        credentials: "same-origin",
      });

      return await response.json();
    } catch (error) {
      return {
        data: null,
        errors: [{ message: error instanceof Error ? error.message : "Unknown error occurred" }],
      };
    }
  };

  // Fullscreen toggle function
  const toggleFullscreen = () => {
    const editorContainer = document.querySelector(".graphiql-wrapper");
    if (!document.fullscreenElement) {
      void editorContainer?.requestFullscreen();
    } else {
      void document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", fullscreenChangeHandler);
    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  return (
    <div className="graphiql-wrapper border border-[var(--sl-color-hairline)] rounded-[var(--global-radius)] bg-[var(--sl-color-bg)]">
      <div className="graphql-editor not-content">
        <div className="graphiql-header flex justify-between gap-4 py-2 items-center pr-2 lg:pl-11">
          <GraphQLLogo className="h-6 text-[var(--sl-color-gray-4)] hidden md:block" />
          <div className="flex items-center gap-4">
            {!hideNetworkSelector && // Show network selector only if hideNetworkSelector is false
              endpoint && ( // Show network selector only if endpoint is provided
                <label className="flex items-center gap-1">
                  <select
                    value={network}
                    onChange={(e) => {
                      setNetwork(e.target.value as typeof network);
                    }}
                    className="graphiql-select"
                  >
                    <option value="mainnet">Mainnet</option>
                    <option value="testnet">Testnet</option>
                    <option value="devnet">Devnet</option>
                  </select>
                  <svg
                    aria-hidden="true"
                    className="icon caret"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a1.002 1.002 0 0 0 1.42 0L17 10.59a1.002 1.002 0 0 0 0-1.42Z"></path>
                  </svg>
                </label>
              )}
            {showFullscreenButton && (
              <button
                onClick={toggleFullscreen}
                className="graphiql-fullscreen-button text-[rgb(var(--color-neutral))] opacity-[var(--alpha-secondary)] hover:cursor-pointer"
              >
                {isFullscreen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 20L15 15M15 15V19M15 15H19M4 20L9 15M9 15V19M9 15H5M20 4L15 9M15 9V5M15 9H19M4 4L9 9M9 9V5M9 9H5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 9L4 4M4 4V8M4 4H8M15 9L20 4M20 4V8M20 4H16M9 15L4 20M4 20V16M4 20H8M15 15L20 20M20 20V16M20 20H16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        <GraphiQL
          key={`${theme}-${network}-${endpoint ?? "default"}`} // Use ?? 'default' for key, pass undefined for variables
          fetcher={fetcher}
          query={query}
          variables={isEmptyVariables(variables) ? undefined : variables} // Pass undefined when empty
          isHeadersEditorEnabled={false}
          shouldPersistHeaders={false}
          defaultTheme={theme} // Syncs with Starlight theme
          defaultEditorToolsVisibility={false}
          response={`/* Query will render here */`}
        >
          <GraphiQL.Logo>
            <> </>
          </GraphiQL.Logo>
        </GraphiQL>
      </div>
    </div>
  );
};
