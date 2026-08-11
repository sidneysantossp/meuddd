export function installAnalytics(documentRef: Document, endpoint?: string, websiteId?: string) {
  const baseUrl = endpoint?.trim().replace(/\/+$/, "");
  const normalizedWebsiteId = websiteId?.trim();

  if (!baseUrl || !normalizedWebsiteId || documentRef.querySelector('script[data-ddd-analytics="umami"]')) {
    return false;
  }

  const script = documentRef.createElement("script");
  script.defer = true;
  script.src = `${baseUrl}/umami`;
  script.dataset.websiteId = normalizedWebsiteId;
  script.dataset.dddAnalytics = "umami";
  documentRef.head.appendChild(script);
  return true;
}
