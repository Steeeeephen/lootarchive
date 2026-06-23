import PageBreadcrumb from "@/components/PageBreadcrumb";
import {getCategoryBySlug} from "@/lib/data/categories";
import CategoryForm from "@/app/(admin)/admin/categories/CategoryForm";
import Image from 'next/image'


interface pageProps {
    params: Promise<{ slug:string }>
}

const Page = async ({params} :pageProps) => {

    const { slug } = await params;

    const category = await getCategoryBySlug(slug)

    return (
        <>
            <main>
                <PageBreadcrumb />

                <div className="admin-header">
                    <h1 className="admin-header__title">
                        Editing {category.name}
                    </h1>
                </div>

                {
                    category?.image && (
                        <Image src={category.image} alt="Current image" width={128} height={128} />
                    )
                }


                <CategoryForm category={category} />

            </main>

        </>
    )
}
export default Page
