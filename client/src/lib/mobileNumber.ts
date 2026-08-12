export function sanitizeMobileSubscriber(value: string) {
  return value.replace(/\D/g, "").slice(0, 9);
}

export function createMobileSubscriber(random = Math.random) {
  const suffix = Math.floor(random() * 100_000_000).toString().padStart(8, "0");
  return `9${suffix}`;
}

export function formatMobileNumber(ddd: string, subscriber: string) {
  const normalizedDdd = ddd.replace(/\D/g, "").slice(0, 2).padStart(2, "0");
  const normalizedSubscriber = sanitizeMobileSubscriber(subscriber).padEnd(9, "0");
  return `(${normalizedDdd}) ${normalizedSubscriber.slice(0, 5)}-${normalizedSubscriber.slice(5)}`;
}
