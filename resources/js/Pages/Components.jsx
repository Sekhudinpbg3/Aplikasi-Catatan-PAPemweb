import { Button, Modal, Togle } from "@/Components";

const Components = () => {
  return (
    <div className="h-screen w-screen grid place-content-center space-y-3 dark:bg-slate-900">
      <h1>Title</h1>
      <p>text paragraph</p>
      <Togle.Theme />
      <Button.Primary buttonClass="rounded-full">Primary</Button.Primary>
      <Button.Opacity opacity="primary" buttonClass="rounded-full px-3">
        Op Primary
      </Button.Opacity>
      <Button.Secondary buttonClass="rounded-full">Secondary</Button.Secondary>
      <Button.Opacity opacity="secondary" buttonClass="rounded-full px-3">
        Opacity secondary
      </Button.Opacity>
      <Button.Danger buttonClass="rounded-full">Danger</Button.Danger>
      <Button.Opacity opacity="danger" buttonClass="rounded-full px-3">
        Opacity danger
      </Button.Opacity>
      <Modal.Confirm
        confirmation={{ text: "Lanjutkan hapus catatan!" }}
        buttonConfirm={{
          title: "Hapus",
          opacity: "danger",
          onSuccess: "Berhasil menghapus catatan",
        }}
        buttonCancel={{ opacity: "primary", title: "Kembali" }}
      >
        <Button.Success buttonClass="text-sm rounded-full py-1 px-3">
          Modal Confirm
        </Button.Success>
      </Modal.Confirm>
      <Modal.Custom
        buttonConfirm={{ opacity: "primary", title: "Ok" }}
        buttons={[
          {
            title: "Find",
            opacity: "primary",
            onClick: () => console.log("button"),
          },
          {
            title: "Reset",
            opacity: "danger",
            onClick: () => console.log("button2"),
          },
        ]}
      >
        <Button.Opacity
          opacity="success"
          buttonClass="text-sm rounded-full py-1 px-3"
          children="Modal custom"
        />
        <div>
          <p>Hello sekhudin</p>
        </div>
      </Modal.Custom>
    </div>
  );
};

export default Components;
