import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { UserEntity } from "@/entities/user.entity";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { UserSearch } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchUserCard } from "./SearchUserCard";

export const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce(searchText, 500);

  const { data: users, isFetching } = useQuery<UserEntity[]>({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await api.get(`/users/search?q=${debouncedSearch}`);
      return res.data.data.users;
    },
    enabled: !!debouncedSearch.trim(),
  });

  return (
    <div>
      <div className="flex items-center gap-4">
        <Input
          type="search"
          placeholder="Find new friends.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <UserSearch className="text-primary" />
      </div>

      <Separator className="mt-4" />

      <div className="mt-4">
        {isFetching ? (
          <Spinner />
        ) : users?.length === 0 && searchText.trim() !== "" ? (
          <div className="flex flex-col gap-2 text-center justify-center">
            <p className="text-xs text-secondary-foreground font-semibold">
              No results for <q>{searchText}</q>
            </p>
            <p className="text-xs text-muted-foreground">
              Try searching for something else or check the spelling of what you
              typed
            </p>
          </div>
        ) : (
          users?.map((user) => (
            <SearchUserCard key={user.id} searcedUsers={user} />
          ))
        )}
      </div>
    </div>
  );
};
