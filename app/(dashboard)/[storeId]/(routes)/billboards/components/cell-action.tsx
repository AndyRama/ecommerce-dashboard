"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Copy } from "lucide-react"

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  return(
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button  variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4"/>
            CopyId
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4"/>
            Update
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

