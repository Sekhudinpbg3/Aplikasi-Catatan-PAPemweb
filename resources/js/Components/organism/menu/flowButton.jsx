import { PlusIcon } from "@/Assets";
import { Modal } from "@/Components";

const Flowbutton = ({
  children,
  title = "form",
  buttonConfirm,
  buttonCancel,
  buttons = [],
  ...props
}) => {
  return (
    <div className="fixed bottom-14 right-16">
      <Modal.Form
        title={title}
        panelClass="page"
        buttonConfirm={buttonConfirm}
        buttonCancel={buttonCancel}
        buttons={buttons}
      >
        <button className="rounded-full transition-colors">
          <PlusIcon
            size="w-10 md:w-14 h-10 md:h-14"
            fill="fill-blue-700 hover:fill-blue-800"
          />
        </button>
        <div>{children}</div>
      </Modal.Form>
    </div>
  );
};

export default Flowbutton;
