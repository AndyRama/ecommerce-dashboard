"use client"

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Image, Product } from "@prisma/client";
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
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: Product & {
    images: Image[]
  } | null 
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product.";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes"  : "Create";

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
    } : {
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    }
  })

  const onSubmit = async (data: ProductFormValues) => {
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
      toast.success("Product deleted.")
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload                   
                    value={ field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder='Product name'
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
    </>
  );
};