import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: "cs-legal", label: "CS & Legal MIS", path: "/cs-legal" },
  { id: "csr", label: "CSR MIS", path: "/csr" },
  { id: "data-privacy", label: "Data Privacy & Sec. Indicators", path: "/data-privacy" },
  { id: "human-resource", label: "Human Resource MIS", path: "/human-resource" },
  {
    id: "operations",
    label: "Operations MIS",
    children: [
      { id: "materials", label: "Materials", path: "/operations/materials" },
      { id: "energy-emissions", label: "Energy and Emissions", path: "/operations/energy-emissions" },
      { id: "energy-conservation", label: "Energy Conservation", path: "/operations/energy-conservation" },
      { id: "renewable-energy", label: "Renewable energy", path: "/operations/renewable-energy" },
      { id: "ghg-reduction", label: "GHG Reduction", path: "/operations/ghg-reduction" },
      { id: "biodiversity", label: "Biodiversity", path: "/operations/biodiversity" },
      { id: "operational-waste", label: "Operational Waste", path: "/operations/operational-waste" },
      { id: "water", label: "Water", path: "/operations/water" },
      { id: "water-savings", label: "Water Savings(optional)", path: "/operations/water-savings" },
      { id: "air-emission", label: "Air Emission", path: "/operations/air-emission" },
      { id: "post-consumer", label: "Post Consumer Waste", path: "/operations/post-consumer" },
    ]
  },
  { id: "procurement", label: "Procurement & Supply Chain", path: "/procurement" },
  { id: "investment", label: "Responsible Investment MIS", path: "/investment" },
  { id: "safety", label: "Safety MIS", path: "/safety" },
  { id: "stakeholder", label: "Stakeholder Grievance MIS", path: "/stakeholder" },
];

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["operations"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <div key={item.id} className="w-full">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between h-auto p-3 font-normal",
              depth > 0 && "pl-6",
              item.id === "operations" && "text-primary bg-primary/10"
            )}
            onClick={() => toggleExpanded(item.id)}
          >
            <span className="text-left">{item.label}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isExpanded && (
            <div className="ml-4">
              {item.children.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink key={item.id} to={item.path!}>
        {({ isActive }) => (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-auto p-3 font-normal",
              depth > 0 && "pl-6",
              isActive && "text-primary bg-primary/10"
            )}
          >
            {item.label}
          </Button>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="w-64 bg-muted border-r border-border h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </div>
    </aside>
  );
};

export default Sidebar;