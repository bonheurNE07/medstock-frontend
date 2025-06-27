import AppRoutes from "./routers";
import { DashboardProvider } from "./contexts/DashboardContext";

function App() {
  return (
    <DashboardProvider>
      <AppRoutes />
    </DashboardProvider>
  );
}

export default App;
