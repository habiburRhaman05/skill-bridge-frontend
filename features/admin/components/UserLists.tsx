"use client";

import { AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";


const UserLists = ({users}:{users:any}) => {
  return (
    <AnimatePresence mode="popLayout">
                {users.map((user:any) => (
                <UserCard user={user} key={user.id}/>
                ))}
              </AnimatePresence>
  )
}

export default UserLists