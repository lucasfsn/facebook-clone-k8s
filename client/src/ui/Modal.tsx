import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext) as ModalContextProps;

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      if (children.props.onClick) children.props.onClick(e);
      open(opensWindowName);
    },
  });
}

type WindowType = "center" | "custom" | "signup";

interface WindowProps {
  children: ReactNode;
  name: string;
  type: WindowType;
  width?: string;
  onClose?: () => void;
  alwaysClose?: boolean;
}

function Window({
  children,
  name,
  type,
  width = "w-[95%] sm:w-[475px]",
  onClose,
  alwaysClose = true,
}: WindowProps) {
  const { openName, close } = useContext(ModalContext) as ModalContextProps;

  const { ref } = useOutsideClick(() => {
    alwaysClose && close();
    onClose?.();
  });

  if (name !== openName) return null;

  const handleClose = () => {
    close();
    onClose?.();
  };

  if (type !== "custom") {
    return createPortal(
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 backdrop-blur-sm">
        <div
          ref={ref}
          className={`shadow-3xl] absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white ${width}`}
        >
          <button
            onClick={handleClose}
            className={`absolute right-2 top-2 cursor-pointer rounded-full p-1.5 ${
              type === "signup"
                ? "text-gray-500"
                : "bg-tertiary bg-tertiary-hover text-secondary"
            }`}
          >
            <HiXMark className="text-2xl" />
          </button>
          {children}
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50">
      <div ref={ref}>{children}</div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
