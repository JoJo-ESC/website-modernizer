const PRIVATE_BLOCKLIST = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "10.",
  "192.168.",
  "172.16.",
  "172.17.",
  "172.18.",
  "172.19.",
  "172.20.",
  "172.21.",
  "172.22.",
  "172.23.",
  "172.24.",
  "172.25.",
  "172.26.",
  "172.27.",
  "172.28.",
  "172.29.",
  "172.30.",
  "172.31.",
  "169.254.",
];

export function validateExternalUrl(raw: string): URL | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (!/^https?:$/.test(url.protocol)) return null;

  const host = url.hostname.toLowerCase();

  if (PRIVATE_BLOCKLIST.some((block) => host === block || host.startsWith(block))) {
    return null;
  }

  return url;
}
