import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wallet Global" },
      { name: "description", content: "Wallet Global digital wallet and marketplace." },
      { property: "og:title", content: "Wallet Global" },
      { property: "og:description", content: "Wallet Global digital wallet and marketplace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/wallet/index.html");
  }, []);

  return null;
}
