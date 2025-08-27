import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;