import { Button, Input, Loader, Menu, Modal, NavBar } from "@/Components";
import { defineApi } from "@/utils/helper";
import { actions } from "@/utils/reducers/store";
import { Disclosure, Tab } from "@headlessui/react";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [styleNav, setStyleNav] = useState();
  const [tabActive, setTabActive] = useState("Catatan");
  const [isloading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const { user, auth, notes } = useSelector((state) => state);

  const { notesAction } = actions;

  const Api = defineApi({ token: auth.access_token });
  const Alert = useAlert();
  const dispatch = useDispatch();

  window.onscroll = () => {
    const y = window.scrollY;
    setStyleNav("shadow-md bg-white dark:bg-slate-900");
    if (y <= 10) {
      setStyleNav("");
    }
  };

  const filteredNotes =
    query === ""
      ? notes.notes
      : notes.notes.filter((val) =>
          val["title"]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSetTabActive = (e) => {
    const { name } = e.target;
    setTabActive(`${name}`);
    return;
  };

  const getNotes = async () => {
    try {
      const response = await Api.get("/notes");
      const { data, message } = response.data;
      dispatch(notesAction.setNotes({ type: "save", data: data.notes }));
    } catch (error) {
      const { response } = error;
      if (response && response.data) {
        const { message = { title: "error", msg: "terjadi kesalahan" } } =
          response.data;
        return Alert.error(message);
      }
    }
  };

  const createNoteTaskHandler = async ({ type = tabActive }) => {
    if (type === "Catatan") {
      setIsLoading(true);
      try {
        const formData = notes.form;
        const response = await Api.post("/notes", formData);
        const { data, message } = response.data;
        setIsLoading(false);
        Alert.success(message);
        dispatch(notesAction.setForm({ type: "remove" }));
        return true;
      } catch (error) {
        setIsLoading(false);
        const { response } = error;
        if (response && response.data) {
          // prettier-ignore
          const { message = { title: "error", msg: "terjadi kesalahan" } } = response.data;
          Alert.error(message);
          return false;
        }
      }
    }

    if (type === "Tugas") {
      try {
      } catch (error) {}
    }
  };

  const deleteHandler = async ({ type = tabActive, id }) => {
    if (type === "Catatan") {
      setIsLoading(true);
      try {
        const response = await Api.delete(`/notes/${id}`);
        const { data, message } = response.data;
        setIsLoading(false);
        Alert.success(message);
        return true;
      } catch (error) {
        setIsLoading(false);
        const { response } = error;
        if (response && response.data) {
          // prettier-ignore
          const { message = { title: "error", msg: "terjadi kesalahan" } } = response.data;
          Alert.error(message);
          return false;
        }
      }
    }
  };

  const inputHandler = ({ type = tabActive, e }) => {
    const { name, value } = e.target;
    if (type === "Catatan") {
      dispatch(
        notesAction.setForm({
          type: "save",
          data: { [name]: value },
        })
      );
    }
  };

  const inputUpdateHandler = ({ type = tabActive, e }) => {
    const { name, value } = e.target;
    if (type === "Catatan") {
      dispatch(
        notesAction.setFormUpdate({
          type: "save",
          data: { [name]: value },
        })
      );
    }
  };

  const notesTaskUpdateHandler = async ({ type = tabActive, id }) => {
    if (type === "Catatan") {
      if (!notes.formUpdate.title || !notes.formUpdate.description) {
        Alert.info({ msg: "title atau description tidak boleh kosong" });
        return false;
      }

      setIsLoading(true);
      try {
        const response = await Api.patch(`/notes/${id}`, notes.formUpdate);
        const { data, message } = response.data;
        dispatch(notesAction.setFormUpdate({ type: "remove" }));
        setIsLoading(false);
        Alert.success(message);
        return true;
      } catch (error) {
        setIsLoading(false);
        const { response } = error;
        if (response && response.data) {
          // prettier-ignore
          const { message = { title: "error", msg: "terjadi kesalahan" } } = response.data;
          Alert.error(message);
          return false;
        }
      }
    }
  };

  useEffect(() => {
    getNotes();
  }, [isloading]);

  return (
    <>
      <Head title="Home" />
      <div className="w-screen min-h-screen page">
        <Loader.Textloading loading={isloading} />
        <NavBar.Base navStyle={styleNav} user={user.user} />
        <Tab.Group>
          <div className="py-2 md:py-4 xl:py-6 flex justify-between">
            <Tab.List className="dinamic-container tab-container">
              <Tab
                name="Catatan"
                onClick={(e) => handleSetTabActive(e)}
                className={({ selected }) => (selected ? "tab-on" : "tab-off")}
              >
                Catatan
              </Tab>
              <Tab
                name="Tugas"
                onClick={(e) => handleSetTabActive(e)}
                className={({ selected }) => (selected ? "tab-on" : "tab-off")}
              >
                Tugas
              </Tab>
            </Tab.List>
            <div className="w-40 mr-5 sm:mr-14 md:mr-28 lg:mr-56 xl:mr-72">
              <Input.Noborder
                inputClass="rounded-lg px-2 py-1 text-sm"
                placeholder="Cari"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="dinamic-container px-1 py-5 md:py-10 lg:py-14 min-h-[500px]">
            <Tab.Panels className="h-full">
              {/* Beranda */}
              <Tab.Panel className="relative w-full h-[550px] rounded-md overflow-y-scroll px-5">
                <div className="w-full h-full">
                  {filteredNotes.length >= 1 ? (
                    filteredNotes.map((note, idx) => (
                      <Disclosure
                        as="div"
                        key={idx}
                        className="w-full p-2 mb-4 backdrop-blur-sm bg-white/30 dark:bg-slate-800 rounded-xl"
                      >
                        <Disclosure.Button className="w-full px-3 py-3 bg-blue-300 dark:bg-slate-900 rounded-lg">
                          <h1 className="text-start text-blue-700 dark:text-slate-600">
                            {note.title}
                          </h1>
                        </Disclosure.Button>
                        <Disclosure.Panel className="w-full py-1 whitespace-normal text-justify font-light">
                          <div className="w-full px-3">{note.description}</div>
                          <div className="w-full flex justify-end items-center space-x-2">
                            <Modal.Confirm
                              confirmation={{
                                title: "konfirmasi",
                                msg: `hapus ${note.title}?`,
                              }}
                              buttonCancel={{
                                title: "batal",
                                opacity: "primary",
                              }}
                              buttonConfirm={{
                                title: "hapus",
                                opacity: "danger",
                                handler: () =>
                                  deleteHandler({
                                    type: tabActive,
                                    id: note.note_id,
                                  }),
                              }}
                            >
                              <Button.Opacity
                                children="Hapus"
                                opacity="danger"
                                buttonClass="rounded-md py-0.5 px-1 text-xs"
                              />
                            </Modal.Confirm>
                            <Modal.Form
                              title="Ubah catatan"
                              panelClass="bg-slate-50 dark:bg-slate-900"
                              buttonCancel={{
                                handler: () => true,
                              }}
                              buttonConfirm={{
                                title: "save",
                                opacity: "primary",
                                handler: () =>
                                  notesTaskUpdateHandler({
                                    type: tabActive,
                                    id: note.note_id,
                                  }),
                              }}
                            >
                              <Button.Opacity
                                children="Ubah"
                                opacity="primary"
                                buttonClass="rounded-md py-0.5 px-1 text-xs"
                                onClick={() => {
                                  const defaultValue = {
                                    title: note.title,
                                    description: note.description,
                                  };
                                  dispatch(
                                    notesAction.setFormUpdate({
                                      type: "set",
                                      data: defaultValue,
                                    })
                                  );
                                }}
                              />
                              <div>
                                <p
                                  children="Judul"
                                  className="text-start font-semibold pb-0.5 text-sm"
                                />
                                <Input.Border
                                  type="text"
                                  name="title"
                                  inputClass="p-1.5 rounded-lg text-sm mb-2"
                                  value={notes.formUpdate["title"]}
                                  onChange={(e) =>
                                    inputUpdateHandler({ type: tabActive, e })
                                  }
                                />
                                <p
                                  children="Deskripsi"
                                  className="text-start font-semibold pb-0.5 text-sm"
                                />
                                <Input.Area
                                  name="description"
                                  inputClass="p-1.5 rounded-lg text-sm font-light mb-2 w-full h-40 resize-none"
                                  value={notes.formUpdate["description"]}
                                  onChange={(e) =>
                                    inputUpdateHandler({ type: tabActive, e })
                                  }
                                />
                              </div>
                            </Modal.Form>
                          </div>
                        </Disclosure.Panel>
                      </Disclosure>
                    ))
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      {query ? (
                        <h1 className="py-1 px-3 rounded-full bg-blue-300 text-blue-600">
                          catatan tidak ditemukan
                        </h1>
                      ) : (
                        <h1 className="py-1 px-3 rounded-full bg-blue-300 text-blue-600">
                          tidak ada catatan
                        </h1>
                      )}
                    </div>
                  )}
                </div>
              </Tab.Panel>
              {/* Catatan */}
              <Tab.Panel className="w-full h-full">
                <div className="w-full h-full flex justify-center items-center">
                  <h1>Fitur belum tersedia</h1>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
        <Menu.Flowbutton
          title={`Tambah ${tabActive}`}
          buttonCancel={{
            handler: () => {
              dispatch(notesAction.setForm({ type: "remove" }));
              return true;
            },
          }}
          buttonConfirm={{
            title: "Simpan",
            opacity: "primary",
            handler: () => createNoteTaskHandler({ type: tabActive }),
          }}
        >
          <div className="mx-3">
            <p
              children="Judul"
              className="text-start font-semibold pb-0.5 text-sm"
            />
            <Input.Border
              type="text"
              name="title"
              inputClass="p-1.5 rounded-lg text-sm mb-2"
              onChange={(e) => inputHandler({ type: tabActive, e })}
            />
            <p
              children="Deskripsi"
              className="text-start font-semibold pb-0.5 text-sm"
            />
            <Input.Area
              name="description"
              inputClass="p-1.5 rounded-lg text-sm font-light mb-2 w-full h-40 resize-none"
              onChange={(e) => inputHandler({ type: tabActive, e })}
            />
          </div>
        </Menu.Flowbutton>
      </div>
    </>
  );
};

export default Home;
