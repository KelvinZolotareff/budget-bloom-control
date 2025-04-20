
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-7xl font-bold text-budget-purple">404</h1>
        <p className="text-2xl mt-4 text-budget-dark mb-8">Page not found</p>
        <Button asChild className="bg-budget-purple hover:bg-budget-purple-dark">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
