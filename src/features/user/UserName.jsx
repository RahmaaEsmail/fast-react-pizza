import { useSelector } from "react-redux"
import { getUserName } from "./UserSlice"

function UserName() {
    const userName = useSelector(getUserName)

    if(userName==='') {
        return null;
    }
    return (
    <div className="hidden md:block font-semibold text-sm">
        {userName}
    </div>
    )
}

export default UserName
