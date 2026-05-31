import React from 'react'
import {Input} from "@/components/ui/input";
import {Field, FieldGroup, FieldLabel, FieldLegend} from "@/components/ui/field";

const Page = () => {
    return (
        <>

            <div className="flex flex-col justify-center items-center h-screen">

                <FieldGroup className="mb-6 flex flex-col items-center justify-center w-1/3">
                    <FieldLegend>Login</FieldLegend>
                    <Field className="h-full flex flex-col bg-accent">
                        <div className="flex flex-col">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" placeholder="Email"/>
                        </div>


                    </Field>
                </FieldGroup>

            </div>

        </>
    )
}
export default Page
