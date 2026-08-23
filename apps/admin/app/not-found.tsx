import notFountImage from "../public/not-found.png";

import { NotFoundComponent } from "@repo/ui";

const NotFoundInAccount = () => {
  return (
    <main className="h-screen flex items-center justify-center w-full">
      <NotFoundComponent
        title="برگشت به صفحه اصلی"
        notFountImage={notFountImage}
        path="/"
      />
    </main>
  );
};

export default NotFoundInAccount;
