import React from 'react'
import PageBreadcrumb from "@/components/PageBreadcrumb";
import CategoryForm from "@/app/(admin)/admin/categories/CategoryForm";



const Page = () => {
    return (
        <>
            <main>

                <PageBreadcrumb />

                <div className="admin-header">
                    <h1 className="admin-header__title">Create a New Category</h1>


                </div>


                <CategoryForm />


            </main>
        </>
    )
}
export default Page
