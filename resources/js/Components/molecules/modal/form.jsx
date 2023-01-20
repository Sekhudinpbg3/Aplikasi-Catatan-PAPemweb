import { XmarkIcon } from "@/Assets";
import { Button } from "@/Components/atoms";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAlert } from "react-alert";

const btConfirm = {
  title: "Ok",
  opacity: "primary",
  handler: async () => true,
  onSuccess: "task success!",
  onFailed: "task failed",
};

const Form = ({
  children,
  title,
  buttonConfirm = btConfirm,
  buttonCancel,
  buttons = [],
  panelClass = "bg-white dark:bg-slate-200",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = children[0];
  const Panel = children[1];

  const Alert = useAlert();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const confirmHandler = async () => {
    const { onSuccess, onFailed, handler = () => true } = buttonConfirm;
    try {
      const passed = await handler();
      if (passed) {
        if(onSuccess){
          Alert.success({ msg: onSuccess || "Berhasil" });
        }
        closeModal();
        return true;
      }
      if (onFailed) {
        Alert.error({ msg: onFailed || "Gagal" });
      }
      return true;
    } catch (error) {
      Alert.error({ msg: "Terjadi kesalahan" });
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={openModal}>
        {Trigger ? Trigger : "Trigger"}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
          onClick={openModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`${panelClass} alert-modal p-3`}>
                  <div className="w-64 min-h-[110px]">
                    <h1 className="mt-3 text-base font-semibold text-blue-600">
                      {title || "Confirmation"}
                    </h1>
                    <div className="mt-2 max-h-80 overflow-scroll">{Panel}</div>
                  </div>

                  <button
                    className="p-[3px] rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-200 dark:hover:bg-slate-300 duration-300 transition-colors fixed top-1.5 right-1.5"
                    onClick={async () => {
                      const { handler } = buttonCancel;
                      const passed = await handler();
                      if (passed) {
                        closeModal();
                      }
                    }}
                  >
                    <XmarkIcon size="h-4 w-4" fill="dark:fill-slate-500" />
                  </button>

                  <div className="my-1 flex items-center justify-center space-x-2">
                    {buttonConfirm ? (
                      <Button.Opacity
                        opacity={buttonConfirm.opacity || "primary"}
                        buttonClass="text-sm py-0.5 px-2 rounded"
                        children={buttonConfirm.title || "Ok"}
                        onClick={confirmHandler}
                      />
                    ) : null}
                    {buttons
                      ? buttons.map((btn, idx) => (
                          <Button.Opacity
                            key={idx}
                            opacity={btn.opacity || "primary"}
                            buttonClass="text-sm py-0.5 px-2 rounded"
                            children={btn.title || "Ok"}
                            onClick={btn.onClick}
                          />
                        ))
                      : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Form;
