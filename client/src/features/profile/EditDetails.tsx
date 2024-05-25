import { Dispatch, SetStateAction, useState } from "react";
import { Details } from "../../types/profile";
import Button from "../../ui/Button";
import EditDetail from "./EditDetail";

interface EditDetailsProps {
  details: Details;
  setDetails: Dispatch<SetStateAction<Details>>;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

function EditDetails({
  details,
  setDetails,
  handleSave,
  handleCancel,
}: EditDetailsProps) {
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <div className="bg-primary text-secondary flex flex-col rounded-md py-4">
      <div className="separator border-b pb-4 text-center text-xl font-bold">
        Edit details
      </div>
      <div className="flex max-h-[400px] flex-col gap-4 overflow-y-scroll px-4 py-4">
        <div>
          <p className="font-semibold">Customize your intro</p>
          <p className="text-tertiary">Details you select will be public.</p>
        </div>
        <EditDetail
          detail="workplace"
          title="Work"
          details={details}
          setDetails={setDetails}
          setDisabled={setDisabled}
        >
          Add a workplace
        </EditDetail>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Education</p>
          <EditDetail
            detail="highschool"
            details={details}
            setDetails={setDetails}
            setDisabled={setDisabled}
          >
            Add high school
          </EditDetail>
          <EditDetail
            detail="college"
            details={details}
            setDetails={setDetails}
            setDisabled={setDisabled}
          >
            Add college
          </EditDetail>
        </div>
        <EditDetail
          detail="currentCity"
          title="Current city"
          details={details}
          setDetails={setDetails}
          setDisabled={setDisabled}
        >
          Add current city
        </EditDetail>
        <EditDetail
          detail="hometown"
          title="Hometown"
          details={details}
          setDetails={setDetails}
          setDisabled={setDisabled}
        >
          Add a hometown
        </EditDetail>
        <EditDetail
          detail="relationship"
          title="Relationship"
          details={details}
          setDetails={setDetails}
          setDisabled={setDisabled}
        >
          Add a relationship status
        </EditDetail>
      </div>
      <div className="separator flex items-center justify-between border-t px-4 pt-4">
        <div className="text-sm font-semibold text-blue-300 sm:text-base">
          Update Your Information
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-tertiary bg-tertiary-hover text-secondary text-sm font-semibold sm:text-lg"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-sm font-semibold text-white hover:bg-blue-400 sm:text-lg"
            onClick={handleSave}
            disabled={disabled}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
