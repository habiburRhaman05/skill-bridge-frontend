

import { AnimatePresence } from "framer-motion";
import { getAllUsersByAdmin } from "../services";
import UserCard from "./UserCard";


const UserLists = async() => {
 
 const response =  await getAllUsersByAdmin();
  


  return (
    <AnimatePresence mode="popLayout">
                {response?.data?.map((user:any) => (
         <UserCard user={user} key={user.id}/>
                ))}
              </AnimatePresence>
  )
}

export default UserLists 