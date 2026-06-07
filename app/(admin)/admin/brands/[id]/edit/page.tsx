import React from 'react'
import {getBrandById} from "@/lib/data/brands";
import BrandForm from "@/app/(admin)/admin/brands/BrandForm";

interface pageProps {
    params: Promise<{ id:number }>
}

const Page = async ({ params } :pageProps) => {

    const { id } = await params;

    const brand = await getBrandById(id);

    return (
        <>
            <main>
                <div className="admin-header">
                    <h1 className="admin-header__title">Editing {brand.name}</h1>
                </div>

                <BrandForm brand={brand} />

            </main>

        </>
    )
}
export default Page
