import { useDispatch } from "react-redux";
import { search } from "../../services/apiSearch";
import { SearchUser } from "../../types/search";
import { ResponseError, handleError } from "../../utils/helpers";
import { arrived, error, fetching, updateResults } from "./searchSlice";

export function useSearchResults() {
  const dispatch = useDispatch();

  async function getResults(value: string) {
    dispatch(fetching());

    try {
      const { data } = await search(value);

      dispatch(arrived());

      return data;
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function setResults(results: SearchUser[]) {
    dispatch(fetching());

    try {
      dispatch(updateResults(results));
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { getResults, setResults };
}
