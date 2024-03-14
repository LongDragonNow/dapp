"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("./hero.png", {
    fetchPriority: "high",
    as: "image",
  });
  ReactDOM.preload("/bottom-dragon.png", {
    fetchPriority: "auto",
    as: "image",
  });

  return null;
}
