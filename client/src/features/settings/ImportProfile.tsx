import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Loading from "../../ui/Loading";
import { getLoading, getUserId } from "../user/userSlice";
import { useImport } from "./useImport";

function ImportProfile() {
  const [importedProfile, setImportedProfile] = useState<File | null>(null);
  const userId = useSelector(getUserId);
  const loading = useSelector(getLoading);
  const { importProfile } = useImport();

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    if (!userId || !event.target.files || event.target.files.length === 0)
      return;

    const file = event.target.files[0];

    if (file.type !== "application/json") {
      toast.error("Invalid file type");
      event.target.value = "";
      return;
    }

    setImportedProfile(file);
  }

  async function handleImportProfile() {
    if (!userId || !importedProfile) return;

    await importProfile(userId, importedProfile);

    setImportedProfile(null);
  }

  return (
    <div className="bg-primary text-secondary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Import my profile
      </div>
      <div className="flex flex-col gap-2 text-sm">
        If you want to import your profile, we can take care of this for you.
      </div>
      <div className="flex items-center justify-between gap-2">
        {loading ? (
          <Loading />
        ) : (
          <input
            type="file"
            onChange={handleImport}
            disabled={!userId}
            className="text-tertiary rounded-md text-sm file:mr-2 file:rounded-md file:border-none file:bg-white file:px-2.5 file:py-1 file:text-xs file:text-black hover:file:cursor-pointer file:hover:text-opacity-80"
          />
        )}
        <Button
          className="bg-post-disabled h-fit bg-blue-500 text-sm hover:bg-blue-600 disabled:cursor-not-allowed"
          onClick={handleImportProfile}
          disabled={!userId || !importedProfile || loading}
        >
          Import my profile
        </Button>
      </div>
    </div>
  );
}

export default ImportProfile;
