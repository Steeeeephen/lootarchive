import React from 'react'
import { Sidebar , SidebarContent} from "@/components/ui/sidebar";
import Link from "next/link";

const AdminNav = () => {
    return (
        <Sidebar className="bg-sidebar">
            <p className="text-xl mb-6 ml-6">
                <span className="font-grenze-gotisch text-2xl font-bold">Loot Archive</span> Admin
            </p>

            <SidebarContent className="flex flex-col gap-2 ml-6">
                <Link className="admin-link" href="/admin/orders">Orders</Link>
                <Link className="admin-link" href="/admin/customers">Customers</Link>
                <Link className="admin-link" href="/admin/categories">Categories</Link>
                <Link className="admin-link" href="/admin/brands">Brands</Link>
                <Link className="admin-link" href="/admin/products">Products</Link>
                <Link className="admin-link" href="/admin/administrators">Administrators</Link>

            </SidebarContent>
        </Sidebar>
    )
}
export default AdminNav
