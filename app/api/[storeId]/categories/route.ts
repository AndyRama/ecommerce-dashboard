import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401});
    }

    if(!name) {
      return new NextResponse("name is requiered", { status: 400});
    }
    
    if(!billboardId) {
      return new NextResponse("billboard id is requiered", { status: 400});
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
   
    const category = await prismadb.category.create({
      data: {
      name,
      billboardId,
      storeId: params.storeId
      }
    })
    
    return NextResponse.json(category)

  } catch(error){
    console.log('[CATEGORIES_POST]', error)
    return new NextResponse("Intenal error", { status: 500 });
  } 
}


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {

    if(!params.storeId) {
      return new NextResponse("StoreId is requiered", { status: 400});
    }
   
    const categories = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    })
    
    return NextResponse.json(categories)

  } catch(error){
    console.log('[CATEGORIES_GET]', error)
    return new NextResponse("Intenal error", { status: 500 });
  } 
}