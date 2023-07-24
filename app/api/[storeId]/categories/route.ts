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
   
    const billboard = await prismadb.billboard.create({
      data: {
      name,
      imageUrl,
      storeId: params.storeId
      }
    })
    
    return NextResponse.json(billboard)

  } catch(error){
    console.log('[BILLBOARD_POST]', error)
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
   
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    })
    
    return NextResponse.json(billboards)

  } catch(error){
    console.log('[BILLBOARD_GET]', error)
    return new NextResponse("Intenal error", { status: 500 });
  } 
}