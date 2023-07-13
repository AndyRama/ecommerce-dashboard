/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig


// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'assets.example.com',
//         port: '',
//         pathname: '/account123/**',
//       },
//     ],
//   },
// }