"use client"

import axios from "axios"
import { Edit, MoreHorizontal, Copy, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"

import { BillboardColumn } from "./columns"

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {

  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState()
  const [open, setOpen] = useState()

  const onCopy = (id:string) => {
    navigator.clipboard.writeText(id)
    toast.success("BillBoard Id copied to the clipboard.")
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success("Billboard deleted.")
    } catch (error) {
      toast.error("Make sure you removed all categories using this billboard first.")
    } finally{
      setLoading(false)
      setOpen(false)
    }
  }

  return(
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        
      />
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
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4"/>
          CopyId
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/${params.stroreId}/billboards/${data.id}`)}>
          <Edit className="mr-2 h-4 w-4"/>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
          <Edit className="mr-2 h-4 w-4"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
