import React from 'react'
import {Button} from "@/components/ui/button";

const Page = () => {
    return (
        <>
            <main>
                <div className="admin-header">
                    <h1 className="admin-header__title">Order Management</h1>
                    <Button variant="outline" className="cursor-pointer">Create Order</Button>
                </div>
            </main>
        </>
    )
}
export default Page
