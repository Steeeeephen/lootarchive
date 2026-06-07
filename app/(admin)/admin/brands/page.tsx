import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

import {getBrands} from "@/lib/data/brands";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {Input} from "@/components/ui/input";

const Page = async () => {

    const allBrands = await getBrands();


    return (
        <main>
            <div className="admin-header">
                <h1 className="admin-header__title">Brand Management</h1>

                <Link href="/admin/brands/create" ><Button variant="outline" className="cursor-pointer">Create Brand</Button></Link>

            </div>



            <Table>
                <TableHeader>
                    <TableRow className="table-row text-center">
                        <TableHead className="table-head"></TableHead>
                        <TableHead className="table-head">ID</TableHead>
                        <TableHead className="table-head">Name</TableHead>
                        <TableHead className="table-head">Slug</TableHead>
                        <TableHead className="table-head">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    { allBrands.map((brand) => (
                        <TableRow className="" key={brand.id}>
                            <TableCell className="table-cell"><Input className="" type="checkbox" value={brand.id} aria-label="Select Brand" /></TableCell>
                            <TableCell className="table-cell">{brand.id}</TableCell>
                            <TableCell className="table-cell">{brand.name}</TableCell>
                            <TableCell className="table-cell">{brand.slug}</TableCell>
                            <TableCell className="table-cell">
                                <Link href={`/admin/brands/${brand.slug}/edit`}><Button variant="outline" className="cursor-pointer">View</Button></Link>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>

            </Table>



        </main>
    )
}
export default Page
