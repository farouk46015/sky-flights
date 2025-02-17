import React, { useEffect, useState } from "react";
import { mainApi } from "@/services/api/main";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";

const ServerStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkServer = async () => {
      setLoading(true);
      try {
        const response = await mainApi.checkServer();
        setServerStatus((response as { status: boolean }).status);
        setLoading(false);
      } catch (error) {
        toast.error("Server is down, please try again later");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    checkServer();
  }, []);

  if (loading) {
    return <Loader text="Checking Server Status" />;
  }

  return children;
};

export default ServerStatusProvider;
