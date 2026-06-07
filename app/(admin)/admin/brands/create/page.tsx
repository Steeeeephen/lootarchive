import React from 'react'
import BrandForm from "@/app/(admin)/admin/brands/create/BrandForm";



const Page = () => {
    return (
        <>
            <main>
                <div className="admin-header">
                    <h1 className="admin-header__title">Create a New Brand</h1>


                </div>

                <BrandForm />

            </main>
        </>
    )
}
export default Page
