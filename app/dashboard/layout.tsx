import ResizableSidebar from '@/app/ui/dashboard/resizable-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ResizableSidebar>{children}</ResizableSidebar>;
} 