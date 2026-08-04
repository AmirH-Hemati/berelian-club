"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
} from "@repo/ui";
import { MoreVertical } from "lucide-react";
import { DeleteRequestDialog } from "../../requests/components/DeleteRequestDialog";

interface ChatMenuProps {
  conversationId: string;
  isActive: boolean;
  requestId: string;
}

export function ChatMenu({ requestId }: ChatMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DeleteRequestDialog requestId={requestId} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
