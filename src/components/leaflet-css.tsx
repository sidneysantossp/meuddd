"use client";

import { useEffect } from "react";

export function LeafletCSS() {
  useEffect(() => {
    // Carregar CSS do Leaflet dinamicamente
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    
    document.head.appendChild(link);
    
    return () => {
      // Limpar o CSS quando o componente for desmontado
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null;
}