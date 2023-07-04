"use client"
import * as z from "zod" ;
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3)
})

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading]= useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
    },
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);    
  }

  return (
    <Modal 
      title={"Create Store"} 
      description={"add a new store to manage products and categories"} 
      isOpen={storeModal.isOpen} 
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading}
                      placeholder="E-commerce" {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      Future Create Store Form
    </Modal>
  )
}