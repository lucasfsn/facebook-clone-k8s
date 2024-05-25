import { useDispatch } from "react-redux";
import { searchAdd, searchDelete } from "../../services/apiSearch";
import { ResponseError, handleError } from "../../utils/helpers";
import { error, fetching, updateHistory } from "./searchSlice";

export function useSearchHistory() {
  const dispatch = useDispatch();

  async function addSearchHistory(resultUserId: string, userId: string) {
    dispatch(fetching());

    try {
      const { data } = await searchAdd(resultUserId, userId);

      dispatch(updateHistory(data));
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function deleteSearchHistory(resultUserId: string, userId: string) {
    dispatch(fetching());

    try {
      const { data } = await searchDelete(resultUserId, userId);

      dispatch(updateHistory(data));
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { addSearchHistory, deleteSearchHistory };
}
