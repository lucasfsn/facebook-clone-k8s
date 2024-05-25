import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { getUserId } from "../user/userSlice";
import { useExport } from "./useExport";

function ExportProfile() {
  const userId = useSelector(getUserId);
  const { exportProfile } = useExport();

  async function handleExport() {
    if (!userId) return;

    await exportProfile(userId);
  }

  return (
    <div className="bg-primary text-secondary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Export my profile
      </div>
      <div className="flex flex-col gap-2 text-sm">
        If you want to export your profile, we can take care of this for you.
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="bg-post-disabled h-fit bg-blue-500 text-sm hover:bg-blue-600 disabled:cursor-not-allowed"
          onClick={handleExport}
          disabled={!userId}
        >
          Export my profile
        </Button>
      </div>
    </div>
  );
}

export default ExportProfile;
