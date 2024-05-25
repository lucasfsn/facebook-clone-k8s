import { useLayoutEffect } from "react";

function Spinner() {
  useLayoutEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
