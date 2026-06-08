'use client'

import React from 'react'
import {usePathname} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const variantConfig :Record< "admin" | "storefront", {styles: string, labels: Record<string, string>}> = {
    "admin": {
        styles: "bg-primary text-primary-foreground hover:bg-primary/90",
        labels: {
            admin: "Dashboard",
            products: "Products",
            orders: "Orders",
            customers: "Customers",
            categories: "Categories",
            brands: "Brands",
        }
    },
    "storefront": {
        styles: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        labels: {
            home: "Home",
            products: "Products",
            cart: "Cart",
            checkout: "Checkout",
            login: "Login",
            register: "Register",
        }
    }

}

const PageBreadcrumb = ({ variant = "admin" }: { variant?: keyof typeof variantConfig }) => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter((segment) => segment !== "");



    return (
        <Breadcrumb className="flex items-center gap-2">
            <BreadcrumbList>
                {pathSegments.map((segment, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {index < pathSegments.length - 1 ? (
                                <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                                    {variantConfig[variant].labels[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>
                                    {variantConfig[variant].labels[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default PageBreadcrumb
