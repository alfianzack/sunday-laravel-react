import { Head } from '@inertiajs/react';
import Navbar from './Components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <Navbar />
      {children}
    </>
  );
}

