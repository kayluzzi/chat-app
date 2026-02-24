import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChemistDash from "./ChemistDash";
import PackagingEngineerDash from "./PackagingEngineerDash";
import ManagerDash from "./ManagerDash";
import MechanicDash from "./MechanicDash";
import ConvertingSpecialistDash from "./ConvertingSpecialistDash";
import ShippingEngineerDash from "./ShippingEngineerDash";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
   console.log(user)
  }, [user])
  

  return (
    <div>
      {user.roles.includes("Process Chemist") && <ChemistDash />}
      {user.roles.includes("Packaging Engineer") && <PackagingEngineerDash />}
      {user.roles.includes("Packaging Manager") && <ManagerDash />}
      {user.roles.includes("Packaging Mechanic") && <MechanicDash />}
      {user.roles.includes("Pulp and Paper Converting Specialist") &&  <ChemistDash />}
      {user.roles.includes("Shipping and Labeling Product Engineer") && <ShippingEngineerDash />}
    </div>
  );
};

export default Dashboard;
