declare module "./coverageSnapshot.mjs" {
  export function getCount(): number;
  export function getByUf(): Record<string, number>;
}
