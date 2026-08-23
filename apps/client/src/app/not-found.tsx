import Header from "@/features/home/components/Header";
import Footer from "@/features/home/components/Footer";
import notFountImage from "@/../public/not-found.png";

import { NotFoundComponent } from "@repo/ui";

const NotFoundInAccount = () => {
  return (
    <main className="max-w-7xl mx-auto space-y-16 overflow-hidden p-3">
      <Header />
      <NotFoundComponent
        title="برگشت به صفحه اصلی"
        notFountImage={notFountImage}
        path="/"
      />
      <Footer />
    </main>
  );
};

export default NotFoundInAccount;
