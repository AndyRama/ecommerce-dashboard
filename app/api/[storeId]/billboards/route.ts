import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401});
    }

    if(!label) {
      return new NextResponse("label is requiered", { status: 400});
    }

    
    if(!imageUrl) {
      return new NextResponse("imageUrl is requiered", { status: 400});
    }
   
    const billboard = await prismadb.billboard.create({
      data: {
      label,
      imageUrl
      }
    })
    
    return NextResponse.json(store)

  } catch(error){
    console.log('[STORES_POST]', error)
    return new NextResponse("Intenal error", { status: 500 });
  } 
}