import prismadb from "@/lib/prismadb";

interface getGraphRevenueProps {
  name: string,
  total: number
}

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include : {
      orderItems : {
        include: {
          product: true
        }
      }
    }
  })

  const montlyRevenue: { [key: number] : number } = {}
}

