import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [category, setCategory] = useState("all");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Groceries",
    "Home",
    "Sports",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stores and products..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((cat) => (
              <SelectItem key={cat.toLowerCase()} value={cat.toLowerCase()}>
                {cat}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
