import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { getLoading, getUser } from "../user/userSlice";
import { useDelete } from "./useDelete";

function DeleteAccountForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { deleteAccount } = useDelete();

  if (isLoading) return <Spinner />;

  async function handleDelete() {
    if (!user) return;

    await deleteAccount(user.id);
  }

  return (
    <div className="bg-primary text-secondary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Delete my account
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <span>
          If you do not think you will use Facebook again and would like your
          account deleted, we can take care of this for you. Keep in mind that
          you will not be able to reactivate your account or retrieve any of the
          content or information you have added.
        </span>
        <span>
          If you would still like your account deleted, click "Delete My
          Account".
        </span>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="bg-post-disabled h-fit bg-blue-500 text-sm hover:bg-blue-600 disabled:cursor-not-allowed"
          disabled={isLoading}
          onClick={handleDelete}
        >
          Delete my account
        </Button>
      </div>
    </div>
  );
}

export default DeleteAccountForm;
