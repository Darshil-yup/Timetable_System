import Header from '@/components/shared/header';
import { TimetableProvider } from '@/context/TimetableContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TimetableProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </TimetableProvider>
  );
}
