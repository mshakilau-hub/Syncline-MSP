// vite.config.js — your version + small recommended tweaks
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // required for @lucide/* and any other aliases
  ],

  build: {
    target: 'es2022',                  // perfect modern target
    minify: 'esbuild',                 // fastest & best compression in 2026
    cssCodeSplit: true,
    sourcemap: false,                  // disable in prod for smaller builds
    reportCompressedSize: true,        // very useful in terminal output
    chunkSizeWarningLimit: 1200,       // reasonable

    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'icons': ['lucide-react'],     // good — keeps all icons together
          'map': ['leaflet', 'react-leaflet'],
        },
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        entryFileNames: 'assets/entry/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  server: {
    hmr: {
      overlay: true,
    },
  },

  optimizeDeps: {
    include: [
      'react', 'react-dom', 'framer-motion', 'lucide-react',
      'leaflet', 'react-leaflet',
    ],
  },
});



// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';         // ← the fast one!
// import tsconfigPaths from 'vite-tsconfig-paths';      // optional but very useful

// export default defineConfig({
//   plugins: [
//     react({
//       // Optional: enable if you use decorators (rare)
//       // tsDecorators: true,
//     }),
//     tsconfigPaths(), // resolves @/components etc. from tsconfig.json
//   ],

//   build: {
//     target: 'es2022',                  // modern & excellent compression in 2026
//     minify: 'esbuild',                 // fastest — default anyway, but explicit is good
//     cssCodeSplit: true,
//     sourcemap: false,                  // false = smaller production builds
//     reportCompressedSize: true,        // very useful feedback in terminal
//     chunkSizeWarningLimit: 1200,       // reasonable for your stack

//     rollupOptions: {
//       output: {
//         manualChunks: {
//           'react-vendor': ['react', 'react-dom'],
//           'motion': ['framer-motion'],
//           'icons': ['lucide-react'],
//           'map': ['leaflet', 'react-leaflet'],
//         },
//         // Clean naming pattern
//         chunkFileNames: 'assets/chunks/[name]-[hash].js',
//         entryFileNames: 'assets/entry/[name]-[hash].js',
//         assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
//       },
//     },
//   },

//   server: {
//     hmr: {
//       overlay: true,
//     },
//   },

//   // Helps with large deps pre-bundling
//   optimizeDeps: {
//     include: [
//       'react', 'react-dom', 'framer-motion', 'lucide-react',
//       'leaflet', 'react-leaflet',
//     ],
//   },
// });



// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       // Enable Fast Refresh (great for dev)
//       fastRefresh: true,
//       // Use automatic JSX runtime (default & recommended)
//       jsxRuntime: 'automatic',
//       // Exclude heavy deps from Fast Refresh if needed (optional)
//       exclude: [/node_modules\/(leaflet|react-leaflet)/],
//     }),
//   ],

//   build: {
//     // Target modern browsers (smaller bundles)
//     target: 'es2020', // ← Upgraded from es2015 (2025+ safe, smaller polyfills)

//     // Use esbuild for faster builds (Terser is slower but better compression)
//     // Recommendation: keep 'terser' for max compression, or switch to 'esbuild' for speed
//     minify: 'terser',

//     terserOptions: {
//       compress: {
//         drop_console: true, // Remove console.log/info in prod
//         drop_debugger: true,
//         pure_funcs: ['console.log', 'console.info', 'console.debug'],
//         passes: 3, // ← More aggressive compression (good balance)
//       },
//       mangle: true, // Mangle variable names
//     },

//     // Super-optimized chunk splitting (your original is good — enhanced)
//     rollupOptions: {
//       output: {
//         // Separate vendors even more granularly
//         manualChunks: (id) => {
//           if (id.includes('node_modules/react')) {
//             return 'react-vendor';
//           }
//           if (id.includes('node_modules/framer-motion')) {
//             return 'animation-vendor';
//           }
//           if (id.includes('node_modules/leaflet') || id.includes('react-leaflet')) {
//             return 'map-vendor';
//           }
//           if (id.includes('node_modules/lucide-react')) {
//             return 'icons-vendor';
//           }
//           // Other heavy deps
//           if (id.includes('node_modules')) {
//             return 'vendor';
//           }
//         },

//         // Clean & consistent file names
//         chunkFileNames: 'assets/js/[name]-[hash].js',
//         entryFileNames: 'assets/js/[name]-[hash].js',
//         assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
//       },
//     },

//     // Increase warning limit slightly (your 1000 is good, 1500 is safer)
//     chunkSizeWarningLimit: 1500,

//     // CSS code splitting (good)
//     cssCodeSplit: true,

//     // Source maps: disable in prod for smaller builds (enable only when debugging)
//     sourcemap: false,

//     // Better commonjs handling
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },

//     // Report compressed size in build output (very useful)
//     reportCompressedSize: true,
//   },

//   // Dev server optimizations
//   server: {
//     compress: true, // Enable compression in dev (faster HMR)
//     hmr: {
//       overlay: true,
//     },
//     // Optional: increase timeout if HMR feels slow
//     watch: {
//       usePolling: false,
//     },
//   },

//   // Preview server (production preview)
//   preview: {
//     port: 4173,
//     strictPort: true,
//     compress: true,
//   },

//   // Optimize deps pre-bundling (your list is good — expanded)
//   optimizeDeps: {
//     include: [
//       'react',
//       'react-dom',
//       'framer-motion',
//       'leaflet',
//       'react-leaflet',
//       'lucide-react',
//       // Add any other heavy deps you use frequently
//     ],
//     force: true,
//   },

//   // Optional: Base path for production deployment (change if deploying to subfolder)
//   // base: '/your-subfolder/', // ← Uncomment & customize only when needed

//   // Optional: Enable legacy browser support if you need IE11 (rare in 2026)
//   // legacy: false, // Default is fine
// });


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//     react({
//       // Enable React Fast Refresh
//       fastRefresh: true,
//       // Optimize JSX runtime
//       jsxRuntime: 'automatic'
//     })
//   ],
  
//   build: {
//     // Target modern browsers for smaller bundle sizes
//     target: 'es2015',
    
//     // Enable minification
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true, // Remove console.logs in production
//         drop_debugger: true,
//         pure_funcs: ['console.log', 'console.info']
//       }
//     },
    
//     // Optimize chunk splitting
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           // Separate vendor chunks
//           'react-vendor': ['react', 'react-dom'],
//           'animation-vendor': ['framer-motion'],
//           'map-vendor': ['leaflet', 'react-leaflet'],
//           'icons-vendor': ['lucide-react'],
//         },
//         // Optimize chunk file names
//         chunkFileNames: 'assets/js/[name]-[hash].js',
//         entryFileNames: 'assets/js/[name]-[hash].js',
//         assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
//       }
//     },
    
//     // Set chunk size warning limit
//     chunkSizeWarningLimit: 1000,
    
//     // Enable CSS code splitting
//     cssCodeSplit: true,
    
//     // Source maps for production debugging (disable for smaller builds)
//     sourcemap: false,
    
//     // Optimize dependencies
//     commonjsOptions: {
//       transformMixedEsModules: true
//     }
//   },
  
//   // Optimize dependencies during dev
//   optimizeDeps: {
//     include: [
//       'react',
//       'react-dom',
//       'framer-motion',
//       'leaflet',
//       'react-leaflet',
//       'lucide-react'
//     ],
//     // Force pre-bundling of these dependencies
//     force: true
//   },
  
//   // Server configuration
//   server: {
//     // Enable compression
//     compress: true,
//     // Optimize HMR
//     hmr: {
//       overlay: true
//     }
//   },
  
//   // Preview configuration
//   preview: {
//     port: 4173,
//     strictPort: true,
//     compress: true
//   }
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           'react-vendor': ['react', 'react-dom'],
//           'animation-vendor': ['framer-motion'],
//           'map-vendor': ['leaflet', 'react-leaflet'],
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1000,
//   },
//   optimizeDeps: {
//     include: ['react', 'react-dom', 'framer-motion', 'leaflet', 'react-leaflet'],
//   },
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })