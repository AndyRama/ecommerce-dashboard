"use client"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  return(
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

