import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../../services/apiProfile";
import { SingleProfile } from "../../types/profile";
import { ResponseError, handleError } from "../../utils/helpers";

export function useGetAnyProfile(username: string | null | undefined) {
  const [profile, setProfile] = useState<SingleProfile | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (!username) {
        setProfile(null);
        return;
      }

      const data = await getProfile(username);
      setProfile(data);
    } catch (err) {
      handleError(err as ResponseError);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { profile, refreshProfile: fetchData };
}
