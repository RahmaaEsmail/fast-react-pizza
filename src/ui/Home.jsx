import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { getUserName } from "../features/user/UserSlice";
import Button from "./Button";

function Home() {
  const userName = useSelector(getUserName);

  return (
    <div>
      <div className="text-center  my-10 sm:my-16 px-4">
        <h1 className="text-xl sm:text-3xl mb-8 font-semibold">
          The best pizza.Pizza
          <br />
          <span className="text-yellow-500">
            Straight out of the oven, straight to you.
          </span>
        </h1>

        {userName === "" ? (
          <CreateUser />
        ) : (
          <Button to="/menu" type="primary">
            Continue ordering , {userName}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home;
