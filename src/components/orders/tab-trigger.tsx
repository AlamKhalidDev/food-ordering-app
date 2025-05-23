import { ReactNode } from "react";
import { TabsTrigger } from "@/components/ui/tabs";

interface TabTriggerProps {
  value: string;
  icon: ReactNode;
  children: ReactNode;
}

export function TabTrigger({ value, icon, children }: TabTriggerProps) {
  return (
    <TabsTrigger value={value} className="flex items-center gap-2">
      {icon}
      {children}
    </TabsTrigger>
  );
}
