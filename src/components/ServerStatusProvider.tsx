import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { mainApi } from '@services/api/main';
import { toast } from 'react-toastify';
import Loader from '@components/Loader';

function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkServer = async () => {
      setLoading(true);
      try {
        const response = await mainApi.checkServer();
        setServerStatus((response as { status: boolean }).status);
        setLoading(false);
      } catch {
        toast.error('Server is down, please try again later');
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

  if (!serverStatus) {
    return <Loader text="Server is down, please try again later" />;
  }

  return children;
}

export default ServerStatusProvider;
