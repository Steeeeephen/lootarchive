import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getCategories} from "@/lib/data/categories";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const CategoriesTable = async () => {

    const allCategories = await getCategories();

    return (
        <Table>
            <TableHeader>
                <TableRow className="table-row text-center">
                    <TableHead className="table-head"></TableHead>
                    <TableHead className="table-head">ID</TableHead>
                    <TableHead className="table-head">Name</TableHead>
                    <TableHead className="table-head">Slug</TableHead>
                    <TableHead className="table-head">Parent</TableHead>
                    <TableHead className="table-head">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {allCategories.map((category) => (
                    <TableRow className="" key={category.id}>
                        <TableCell className="table-cell">
                            <Checkbox className="checkbox" aria-label="Select Category" />
                        </TableCell>
                        <TableCell className="table-cell">{category.id}</TableCell>
                        <TableCell className="table-cell">{category.name}</TableCell>
                        <TableCell className="table-cell">{category.slug}</TableCell>
                        <TableCell className="table-cell">
                            {category.parentId != null ? category.parentId : 'None'}
                        </TableCell>

                        <TableCell>
                            <Link href={`/admin/categories/${category.slug}`}><Button variant="outline" className="cursor-pointer">View</Button></Link>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}
export default CategoriesTable


