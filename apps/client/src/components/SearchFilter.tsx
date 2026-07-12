"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
export default function SearchFilter() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const updateQueryParams = useUpdateQueryParams();
  const [searchValue, setSearchValue] = useState(search);
  const [debounceValue] = useDebounce(searchValue, 300);

  useEffect(() => {
    updateQueryParams({ search: debounceValue });
  }, [debounceValue]);

  return (
    <div className="relative">
      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="جستجو..."
        className="w-full md:w-56 pr-8"
      />
    </div>
  );
}
