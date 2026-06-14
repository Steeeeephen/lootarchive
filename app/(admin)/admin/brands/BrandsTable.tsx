import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getBrands} from "@/lib/data/brands";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

const BrandsTable = async () => {

    const allBrands = await getBrands();


    return (
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
                        <TableCell className="table-cell">
                            <Checkbox className="checkbox" aria-label="Select Brand" />
                        </TableCell>
                        <TableCell className="table-cell">{brand.id}</TableCell>
                        <TableCell className="table-cell">{brand.name}</TableCell>
                        <TableCell className="table-cell">{brand.slug}</TableCell>
                        <TableCell className="table-cell">
                            <Link href={`/admin/brands/${brand.slug}`}><Button variant="outline" className="cursor-pointer">View</Button></Link>
                        </TableCell>
                    </TableRow>
                )) }
            </TableBody>

        </Table>    )
}
export default BrandsTable
