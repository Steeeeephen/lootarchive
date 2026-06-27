
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenuBadge,
    SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {LogoutButton} from "@/app/(admin)/components/LogoutButton";
import {TooltipProvider} from "@/components/ui/tooltip";
import {Logs, Users, ListPlus} from 'lucide-react';
import {getBrands} from "@/lib/data/brands";



const AdminNav = async () => {

    const brands = await getBrands();

    return (

        <TooltipProvider>
            <Sidebar collapsible={"icon"} className="bg-sidebar ">

                <SidebarContent>
                    <SidebarHeader>
                        <span className="font-grenze-gotisch text-2xl font-bold">Loot Archive</span>
                    </SidebarHeader>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Orders">
                            <Logs className="h-4 w-4 mr-2" />
                            <Link className="admin-link" href="/admin/orders">
                                <span>Orders</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>


                    <SidebarMenuButton tooltip="Customers">
                        <Users className="h-4 w-4 mr-2" />
                        <Link className="admin-link" href="/admin/customers">
                            <span>Customers</span>
                        </Link>
                    </SidebarMenuButton>

                    <SidebarMenuButton tooltip="Categories">
                        <ListPlus className="h-4 w-4 mr-2" />
                        <Link className="admin-link" href="/admin/categories">
                            <span>Categories</span>
                        </Link>
                    </SidebarMenuButton>


                    <SidebarMenuButton tooltip="Brands">
                        <ListPlus className="h-4 w-4 mr-2" />
                        <Link className="admin-link" href="/admin/brands">
                            <span>Brands</span>
                        </Link>
                    </SidebarMenuButton>

                    <SidebarMenuButton tooltip="Products">
                        <ListPlus className="h-4 w-4 mr-2" />
                        <Link className="admin-link" href="/admin/products">
                            <span>Products</span>
                        </Link>
                    </SidebarMenuButton>

                    <SidebarMenuButton tooltip="Admins">
                        <ListPlus className="h-4 w-4 mr-2" />
                        <Link className="admin-link" href="/admin/administrators">
                            <span>Administrators</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarContent>

                <SidebarFooter>
                    <LogoutButton />
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    )
}
export default AdminNav
