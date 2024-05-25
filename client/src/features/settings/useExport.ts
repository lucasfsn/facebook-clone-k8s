import { saveAs } from "file-saver";
import { exportProfile as exportProfileApi } from "../../services/apiSettings";
import { ResponseError, handleError } from "../../utils/helpers";

export function useExport() {
  async function exportProfile(userId: string) {
    try {
      const { data } = await exportProfileApi(userId);

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "text/plain;charset=utf-8",
      });

      saveAs(blob, "profile.json");
    } catch (err) {
      handleError(err as ResponseError);
    }
  }

  return { exportProfile };
}
