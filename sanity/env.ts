export const apiVersion = "2025-08-12";

export const dataset = "production";

export const projectId = "nn8j8pbt";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
