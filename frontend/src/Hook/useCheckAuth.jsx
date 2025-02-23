import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/Slices/User";

function useCheckAuth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthentication() {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      try {
        const response = await fetch("/api/v1/authentication/check-auth", {
          credentials: "include",
        });
        if (response.status === 401) {
          // console.log("utilisateur non connecté sur le serveur");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          dispatch(login(data));
        } else {
          console.log(`Server error: ${response.status}`);
        }
      } catch (error) {
        console.log(`Fetch error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuthentication();
  }, []);

  return [user, isLoading];
}

export default useCheckAuth;
