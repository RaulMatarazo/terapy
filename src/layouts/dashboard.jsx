import { Routes, Route, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Cookies from "js-cookie";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />

        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element, role }) => {
                const userRole = Cookies.get("role");
                console.log(userRole);
                console.log(role);



                // Se a role do usuário é diferente da role da rota → bloqueia
                if (role && role !== userRole) {
                  // Redireciona para a rota padrão correta por role
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <Navigate
                          to={userRole === "psicologo" ? "/dashboard/home" : "/dashboard/questionario"}
                          replace
                        />
                      }
                    />)
                }

                // Rota permitida
                return <Route key={path} path={path} element={element} />;
              })
          )}
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
