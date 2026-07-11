"use client";

import { Input } from "@/components/ui/input";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchFilter() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const updateQueryParams = useUpdateQueryParams();
  const [searchValue, setSearchValue] = useState(search);
  const [isOpen, setIsOpen] = useState(false);
  const [debounceValue] = useDebounce(searchValue, 300);

  useEffect(() => {
    updateQueryParams({ search: debounceValue, page: "1" });
  }, [debounceValue]);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <>
      <div className=" relative">
        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="جستجو..."
          className="w-full md:w-56 pr-8"
        />
      </div>
    </>
  );
}
