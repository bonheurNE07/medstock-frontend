import AppRoutes from "./routers";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import { DashboardProvider } from "./contexts/DashboardContext";

function App() {
  return (
    <DashboardProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow pt-16">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </DashboardProvider>
  );
}

export default App;
