/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [toRemotePattern(process.env.CMS_IMAGE_PATTERN)],
  },
};

export default nextConfig;

function toRemotePattern(urlString) {
  const url = new URL(urlString);
  return {
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
}
