import { LogoutIcon, NoImage, ProfileIcon } from "@/Assets";
import { ComboBox, Gap, PopOver, Togle } from "@/Components";

const initSplit = (text) => {
  const arr = text.split("");
  const init = `${arr[0]}${arr[1]}`;
  return init.toLocaleUpperCase();
};

const exUser = {
  name: "nama",
  email: "example@gmail.com",
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userLink = [
  // {
  //   title: "Profile",
  //   icon: <ProfileIcon stroke={2} />,
  //   link: "/register",
  // },
  {
    title: "Keluar",
    icon: <LogoutIcon />,
    link: "/login",
  },
];

const Base = ({ user = exUser, navStyle }) => {
  const initialName = initSplit(user.name);
  const classImage = "w-9 h-9 md:w-12 md:h-12 xl:w-14 xl:h-14";

  return (
    <div className={`${navStyle} sticky z-10 top-0 w-screen py-2`}>
      <div className="dinamic-container flex justify-between">
        <div className="flex items-center space-x-3">
          <PopOver.Custom
            items={userLink}
            panelClass="w-fit bg-white dark:bg-slate-800"
            itemClass="px-2 hover:bg-slate-200 dark:hover:bg-slate-900"
          >
            {user.image ? (
              <img
                className={`${classImage} object-cover rounded-full`}
                src={user.image || NoImage}
                alt="profile"
              />
            ) : (
              // prettier-ignore
              <div className={`${classImage} grid place-content-center rounded-full bg-pink-500`}>
                <h1 className="text-gray-100 text-sm md:text-base lg:font-bold xl:text-lg">
                  {initialName}
                </h1>
              </div>
            )}
          </PopOver.Custom>
          <div>
            <a className="text-base md:text-lg lg:text-xl font-semibold">
              JORna
            </a>
            <p className="text-xs lg:text-base text-gray-600">{user.name}</p>
          </div>
        </div>

        {/* search bar */}
        <div className="flex items-center">
          <Togle.Theme />
        </div>
      </div>
    </div>
  );
};

export default Base;
