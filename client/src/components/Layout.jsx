import { Toaster } from 'react-hot-toast';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div dir="rtl">
      <Toaster position="top-center" reverseOrder={false} />

 <header className="text-center py-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md">
        <h1
          className="text-3xl font-bold  animate-pulse cursor-pointer"
          onClick={() => navigate('/')}
        >
          הבלוג שלך – MERN
        </h1>
      </header>

      <main className="p-6">
        <Outlet /> {/* כאן ייכנסו כל העמודים שלך */}
      </main>
    </div>
  );
}
