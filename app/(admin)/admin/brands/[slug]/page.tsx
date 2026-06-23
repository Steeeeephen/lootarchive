import React from 'react'
import {getBrandBySlug} from "@/lib/data/brands";
import BrandForm from "@/app/(admin)/admin/brands/BrandForm";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Image from 'next/image'


interface pageProps {
    params: Promise<{ slug:string }>
}

const Page = async ({ params } :pageProps) => {

    const { slug } = await params;

    const brand = await getBrandBySlug(slug);

    return (
        <>
            <main>

                <PageBreadcrumb />

                <div className="admin-header">
                    <h1 className="admin-header__title">Editing {brand.name}</h1>
                </div>

                {brand?.logo && (
                    <Image className="brand-logo" src={brand.logo} alt="Current logo" width={128} height={128} />

                )}
                <BrandForm brand={brand} />

            </main>


        </>
    )
}
export default Page
