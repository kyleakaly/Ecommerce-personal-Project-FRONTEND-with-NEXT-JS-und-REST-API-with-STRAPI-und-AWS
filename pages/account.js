import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { usuariosRegistrado } from "../api/user";
import useAuth from "../hooks/useAuth";
import AccounConfiguration from "../components/AccounConfiguration/AccounConfiguration";


const account = () => {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const { logout ,auth, setReloadUser} = useAuth();

  useEffect(() => {
      ( async ()=>{

        const response = await usuariosRegistrado(logout)
        setUser(response || null);

      })()
  }, [auth]);

if(user === undefined){
    return null;
}

if(!auth && !user){
    router.replace('/');
    return null
}

  return (
    <BasicLayout className="account">
      <AccounConfiguration setReloadUser={setReloadUser} setUser={setUser} user={user} logout={logout}/>
    </BasicLayout>
  );
};

export default account;


