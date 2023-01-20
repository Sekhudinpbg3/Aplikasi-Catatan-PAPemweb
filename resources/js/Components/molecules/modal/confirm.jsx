import { Button } from "@/Components/atoms";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAlert } from "react-alert";

const confirm = {
  title: "Confirmation",
  msg: "Confirmation text?",
};

const btConfirm = {
  title: "Confirmation",
  opacity: "success",
  handler: () => true,
  onSuccess: "task success!",
  onFailed: "task failed",
};

const btCancel = {
  title: "Cancel",
  opacity: "danger",
};

const Confirm = ({
  children,
  confirmation = confirm,
  buttonConfirm = btConfirm,
  buttonCancel = btCancel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = children;
  const { title: titleConfirmation, msg: textConfirmation } = confirmation;

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
        if (onSuccess) {
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
                <Dialog.Panel className="rounded-md px-3 py-2 bg-gray-50 dark:bg-slate-800">
                  <div className=" h-28 w-64">
                    <h1 className="mt-3 text-base font-semibold text-blue-600">
                      {titleConfirmation || "Confirmation"}
                    </h1>
                    <div className="mt-2">
                      <p className="text-sm">{textConfirmation}</p>
                    </div>
                  </div>

                  <div className="mb-1 flex items-center justify-center space-x-2">
                    {buttonConfirm ? (
                      <Button.Opacity
                        opacity={buttonConfirm.opacity || "success"}
                        buttonClass="text-sm py-0.5 px-2 rounded"
                        children={buttonConfirm.title || "Ok"}
                        onClick={confirmHandler}
                      />
                    ) : null}
                    <Button.Opacity
                      opacity={buttonCancel.opacity || "danger"}
                      buttonClass="text-sm py-0.5 px-2 rounded"
                      children={buttonCancel.title || "Cancel"}
                      onClick={closeModal}
                    />
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

export default Confirm;
