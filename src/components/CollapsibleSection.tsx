import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = true,
  className 
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("bg-card rounded-lg border border-border", className)}>
      <Button
        variant="ghost"
        className="w-full justify-between p-4 h-auto font-medium text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-primary">{title}</span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )} 
        />
      </Button>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;