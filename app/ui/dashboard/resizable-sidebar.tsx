'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import SideNav from './sidenav';

interface ResizableSidebarProps {
  children: React.ReactNode;
}

export default function ResizableSidebar({ children }: ResizableSidebarProps) {
  return (
    <PanelGroup direction="horizontal" className="h-screen">
      <Panel 
        defaultSize={20} 
        minSize={15} 
        maxSize={50}
        className="flex flex-col"
      >
        <SideNav />
      </Panel>
      
      <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors cursor-col-resize" />
      
      <Panel className="flex-grow overflow-auto">
        <div className="p-6 md:p-12">
          {children}
        </div>
      </Panel>
    </PanelGroup>
  );
} 