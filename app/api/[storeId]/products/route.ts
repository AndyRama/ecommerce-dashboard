import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { ImageResponse, NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
    } = body

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401});
    }

    if(!name) {
      return new NextResponse("Name is requiered", { status: 400});
    }

    if(!categoryId) {
      return new NextResponse("Category id is requiered", { status: 400});
    }

    if(!price) {
      return new NextResponse("Price is requiered", { status: 400});
    }
    
    if(!images || !ImageResponse.length ) {
      return new NextResponse("Images is requiered", { status: 400});
    }
    
    if(!colorId) {
      return new NextResponse("Color id is requiered", { status: 400});
    }

    if(!sizeId) {
      return new NextResponse("Size id is requiered", { status: 400});
    }

    if(!params.storeId) {
      return new NextResponse("StoreId is requiered", { status: 400});
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if(!storeByUserId){
      return new  NextResponse("Unauthorized", { status: 403})
    }
   
    const product = await prismadb.product.create({
      data: {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      colorId,
      sizeId,
      storeId: params.storeId,
      images: {
        createMany: { 
          data: [
            ...images.map((image: { url: string }) => image )
          ]
        }
      }
      }
    })
    
    return NextResponse.json(product)

  } catch(error){
    console.log('[PRODUCTS_POST]', error)
    return new NextResponse("Intenal error", { status: 500 });
  } 
}


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {

    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured") 
    // const isArchived = searchParams.get("isArchived") 

    if(!params.storeId) {
      return new NextResponse("Store id is requiered", { status: 400});
    }
   
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(products)

  } catch(error){
    console.log('[PRODUCTS_GET]', error)
    return new NextResponse("Intenal error", { status: 500 });
  } 
}