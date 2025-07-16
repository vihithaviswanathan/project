import { ChevronDown, Search, Bell, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6">
      {/* Left side - Logo and Governance */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-jakson-red rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">✕</span>
          </div>
          <span className="text-xl font-bold text-foreground">JAKSON</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-1">
              Governance
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Environmental</DropdownMenuItem>
            <DropdownMenuItem>Social</DropdownMenuItem>
            <DropdownMenuItem>Governance</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center - Navigation Tabs */}
      <div className="flex items-center gap-8">
        <Button variant="ghost" className="text-muted-foreground">
          Dashboard
        </Button>
        <Button variant="ghost" className="text-primary font-medium border-b-2 border-primary pb-3">
          Data
        </Button>
        <Button variant="ghost" className="text-muted-foreground">
          Reports
        </Button>
      </div>

      {/* Right side - Icons and Profile */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/lovable-uploads/placeholder-avatar.jpg" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;