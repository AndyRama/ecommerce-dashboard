"use client"

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Size } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import ImageUpload from '@/components/ui/image-upload';

import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from '@/components/ui/form'

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null; 
}

export const SizeForm: React.FC<SizeFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard." : "Add a new billboard.";
  const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
  const action = initialData ? "Save changes"  : "Create";

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    }
  })

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if(initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    } finally{
      setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh()
      router.push("/")
      toast.success("Billboard deleted.")
    } catch (error) {
      toast.error("Make sure you removed all categories using this billboard first.")
    } finally{
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading 
          title={title}
          description={description}     
        />
        { initialData && (            
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={()=>
                setOpen(true)}
            >
              <Trash className="h-4 w-4"/>
            </Button>
          )}
      </div>
      <Separator/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Background image
                </FormLabel>
                <FormControl>
                  <ImageUpload                   
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}  
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Label
                  </FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
      {/* <Separator/> */}
    </>
  );
};