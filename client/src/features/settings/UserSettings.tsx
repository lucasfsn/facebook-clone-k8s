import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "../../ui/Modal";
import ChangeBirthDate from "./ChangeBirthDateForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";
import ExportProfile from "./ExportProfile";
import ImportProfile from "./ImportProfile";

function UserSettings() {
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <Modal>
        <div className="flex flex-col gap-2">
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>First name</span>
            <Modal.Open opens="firstName">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="firstName" type="center" width="w-[375px]">
              <ChangeNameForm field="firstName" />
            </Modal.Window>
          </div>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>Last name</span>
            <Modal.Open opens="lastName">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="lastName" type="center" width="w-[375px]">
              <ChangeNameForm field="lastName" />
            </Modal.Window>
          </div>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>Email</span>
            <Modal.Open opens="email">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="email" type="center" width="w-[375px]">
              <ChangeEmailForm />
            </Modal.Window>
          </div>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>Password</span>
            <Modal.Open opens="password">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="password" type="center" width="w-[375px]">
              <ChangePasswordForm />
            </Modal.Window>
          </div>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>Birth date</span>
            <Modal.Open opens="birthDate">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="birthDate" type="center" width="w-[375px]">
              <ChangeBirthDate />
            </Modal.Window>
          </div>
        </div>
        <div className="flex flex-col gap-2 self-end">
          <div className="flex flex-row items-center gap-2 text-blue-700">
            <Modal.Open opens="export">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowBack />
              </button>
            </Modal.Open>
            <Modal.Window name="export" type="center">
              <ExportProfile />
            </Modal.Window>
            <span>Export profile</span>
          </div>
          <div className="flex flex-row items-center gap-2 text-blue-700">
            <Modal.Open opens="import">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowBack />
              </button>
            </Modal.Open>
            <Modal.Window name="import" type="center">
              <ImportProfile />
            </Modal.Window>
            <span>Import profile</span>
          </div>
          <div className="flex flex-row items-center gap-2 text-rose-900">
            <Modal.Open opens="deleteAccount">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowBack />
              </button>
            </Modal.Open>
            <Modal.Window name="deleteAccount" type="center">
              <DeleteAccountForm />
            </Modal.Window>
            <span>Delete account</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserSettings;
