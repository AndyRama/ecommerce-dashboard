"use client"

import * as z from 'zod';

import { Store } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from '@/components/ui/form'
import { useState } from 'react';


interface SettingsFormProps {
  initialData: Store 
}

const formSchema = z.object({
  name: z.string().min(3)
})

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);    
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title="Settings"
          description="Manage store preferences"      
          />
        <Button
          variant="destructive"
          size="icon"
          onClick={()=>{}}
          >
          <Trash className="h-4 w-4"/>
        </Button>
      </div>
      <Separator/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                 <FormControl>
                    <Input disabled={loading} placeholder='Store Name' {...field}/>
                 </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto'type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};