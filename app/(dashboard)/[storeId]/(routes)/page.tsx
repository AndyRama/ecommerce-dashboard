import { Card, CardHeader } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
  params: {storeId: string}
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
  }) => {

    return (
      <div className="flex-col">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3" >
          <Card>
            <CardHeader>
              Total Revenue
            </CardHeader>
          </Card>
        </div>
      </div>
  )
}

export default DashboardPage