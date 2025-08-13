import Header from '@/components/shared/header';
import { TimetableProvider } from '@/context/TimetableContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TimetableProvider>
      <div className="flex flex-col min-h-screen bg-transparent">
        <Header />
        <main className="flex-1 p-8">{children}</main>
        <footer className="py-4 text-center text-sm text-muted-foreground bg-transparent">
          @YCCE.D,A
        </footer>
      </div>
    </TimetableProvider>
  );
}
