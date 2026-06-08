import React from 'react'
import {getBrandById} from "@/lib/data/brands";
import BrandForm from "@/app/(admin)/admin/brands/BrandForm";
import PageBreadcrumb from "@/components/PageBreadcrumb";

interface pageProps {
    params: Promise<{ slug:string }>
}

const Page = async ({ params } :pageProps) => {

    const { slug } = await params;

    const brand = await getBrandById(slug);

    return (
        <>
            <main>

                <PageBreadcrumb />

                <div className="admin-header">
                    <h1 className="admin-header__title">Editing {brand.name}</h1>
                </div>

                <BrandForm brand={brand} />

            </main>

        </>
    )
}
export default Page
