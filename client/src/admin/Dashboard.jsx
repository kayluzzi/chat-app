import { useSelector } from "react-redux";


const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)



  return (
    <div className="info">
     Chat App
    </div>
  );
};

export default Dashboard;
