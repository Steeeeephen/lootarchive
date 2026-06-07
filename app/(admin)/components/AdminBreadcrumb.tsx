import React from 'react'
import {usePathname} from "next/navigation";

const AdminBreadcrumb = () => {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter((segment) => segment !== "");



    return (
        <div>AdminBreadcrumb</div>
    )
}
export default AdminBreadcrumb
