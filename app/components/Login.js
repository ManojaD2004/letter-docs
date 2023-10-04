import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "@material-tailwind/react";

function Login() {
  const [providers, setProviders] = useState({});

  useEffect(() => {
    async function fetchAPIS() {
      const providers = await getProviders();
      setProviders(providers);
    }
    fetchAPIS();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        alt=""
        height={300}
        width={550}
        objectFit="contain"
        src="https://links.papareact.com/1ui"
      />
      {Object.values(providers).map((provider) => (
        <Button
          key={provider.name}
          ripple={true}
          color="blue"
          variant="filled"
          className="w-44 mt-10"
          onClick={() => signIn(provider.id, { callbackUrl: "/" })}
        >
          Login
        </Button>
      ))}
    </div>
  );
}

export default Login;
