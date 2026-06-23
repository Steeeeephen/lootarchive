import React from 'react'
import BrandForm from "@/app/(admin)/admin/brands/BrandForm";
import PageBreadcrumb from "@/components/PageBreadcrumb";



const Page = () => {
    return (
        <>
            <main>
                <PageBreadcrumb />

                <div className="admin-header">
                    <h1 className="admin-header__title">Create a New Brand</h1>


                </div>

                <BrandForm />

            </main>
        </>
    )
}
export default Page
