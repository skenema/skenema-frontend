import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 4000,
      proxy: {
        "/api/movies": {
          target: "http://127.0.0.1:8989/movies_service/movies",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/movies/, ""),
        },
        "/api/auth": { target: "http://127.0.0.1:9000", changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, "")
       },
        "/api/reservation": {target: "http://127.0.0.1:8000/reservation_service/reservation" , changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/reservation/, "")
      },
        "/api/ticket": {target: "http://localhost:8888/ticket_service", changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/ticket/, "")
      },
      },
    },
  };
});
