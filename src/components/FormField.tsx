import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CalendarDays } from "lucide-react";

interface FormFieldProps {
  label: string;
  type?: "text" | "date" | "select";
  placeholder?: string;
  options?: string[];
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const FormField = ({ 
  label, 
  type = "text", 
  placeholder, 
  options, 
  className,
  value,
  onChange 
}: FormFieldProps) => {
  const renderField = () => {
    switch (type) {
      case "date":
        return (
          <div className="relative">
            <Input 
              type="text" 
              placeholder={placeholder || "DD-MM-YYYY"}
              className={className}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        );
      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input 
            type="text" 
            placeholder={placeholder}
            className={className}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {renderField()}
    </div>
  );
};

export default FormField;