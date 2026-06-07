"use client"

import React from 'react'
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createBrand, updateBrand} from "@/actions/brands";
import {toast} from "sonner";
import {brands} from "@/db/schema";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(255),
    slug: z
        .string()
        .min(1, { message: "Slug is required" })
        .max(255),
    logo: z
        .string()
        .optional(),
});

type BrandFormProps = {
    brand?: typeof brands.$inferSelect;
}

const BrandForm = ({ brand }:BrandFormProps) => {

    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: brand?.name ?? "",
            slug: brand?.slug ?? "",
            logo: brand?.logo ?? ""
        }
    })

    const isEditing = !!brand;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (isEditing) {
                await updateBrand(brand.id!, values)
            } else {
                await createBrand(values)
            }
            toast.success(isEditing ? "Brand updated" : "Brand created", {position: "top-right"})
            form.reset()
            router.push("/admin/brands");
        } catch (error) {
            console.error("Error creating brand:", error);
            toast.error("Brand failed to update", {position: "top-right"})
        }
    }


    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FieldGroup className="flex flex-col gap-5">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                                <FieldLabel htmlFor="name">
                                    Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter brand name"
                                    autoComplete="off"
                                    aria-label="Brand name"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="slug"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                                <FieldLabel htmlFor="slug">
                                    Slug
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="slug"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter slug"
                                    autoComplete="off"
                                    aria-label="slug"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                            </Field>
                        )}
                    />

                    <Controller
                        name="logo"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                                <FieldLabel htmlFor="logo">
                                    Logo
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="logo"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Logo"
                                    autoComplete="off"
                                    aria-label="logo"
                                    type="file"
                                />
                            </Field>
                        )}
                    />
                </FieldGroup>

                <div className="flex gap-2">
                    <Button className="cursor-pointer" type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button className="cursor-pointer" type="submit">{isEditing ? 'Update Brand' : 'Create Brand' }</Button>
                </div>


            </form>
        </>
    )
}
export default BrandForm
