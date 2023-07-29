import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
  req: Request,
  { params }: { params: { productId: string }}
) {
  try {
    const { userId } = auth();
 
    if(!params.productId) {
      return new NextResponse("productId is requiered", { status: 400})
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include : {
        image: true,
        category:true,
        size: true,
        color:true,
      }
    }) 

    return NextResponse.json(product);
    
  } catch(error) {
    console.log('[PRODUCTS_DELETE]', error);
    return new NextResponse("Internal Error", {status: 500} )
  }
}
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json()

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
      return new NextResponse("Unauthenticated", { status: 401});
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
    
    if(!images || !images.length ) {
      return new NextResponse("Images is requiered", { status: 400});
    }
    
    if(!colorId) {
      return new NextResponse("Color id is requiered", { status: 400});
    }

    if(!sizeId) {
      return new NextResponse("Size id is requiered", { status: 400});
    }

    if(!params.productId) {
      return new NextResponse("billboard id is requiered", { status: 400})
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if(!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403})
    }

    await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        image: {
          deleteMany: { }
        },
        isFeatured,
        isArchived
      }
    }) ;

    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        image: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image ),
            ]
          }
        }
      }
    })

    return NextResponse.json(product);

  } catch(error) {
    console.log('[PRODUCTS_PATCH]', error);
    return new NextResponse("Internal Error", {status: 500} )
  }
}

export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, billboardId: string }}
) {
  try {
    const { userId } = auth();

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401})
    }

    if(!params.billboardId) {
      return new NextResponse("billboardId is requiered", { status: 400})
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if(!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403})
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId
      }
    }) 

    return NextResponse.json(billboard);
    
  } catch(error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal Error", {status: 500} )
  }
}