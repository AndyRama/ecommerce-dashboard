"use client"

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;

}
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted){
    return null
  }

  return (
    
    <Modal
      title="Are you sure?"
      description="Do you really want to delete this store?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-center w- full"></div>
      <Button
        disabled={loading}
        variant="outline"
        onClick={onClose}
        > 
        Cancel
      </Button>
      <Button
        disabled={loading}
        variant="destructive"
        onClick={onClose}
        > 
        Continue
      </Button>
    </Modal>
  )

}