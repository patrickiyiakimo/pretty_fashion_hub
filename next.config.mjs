// // /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// // export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '4000',
//         pathname: '/uploads/**',
//       },
//     ],
//   },
// };

// export default nextConfig;




// next.config.mjs (if you keep .mjs extension)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kingz-server.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  // Add other configurations as needed
};

export default nextConfig; // Use export default for ES modules