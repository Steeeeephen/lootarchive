"use client"

import '../../admin.css'
import React from 'react'
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createBrand, updateBrand} from "@/lib/actions/brands";
import {toast} from "sonner";
import {brands} from "@/db/schema";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {brandClientSchema} from "@/lib/validators/brands";


type BrandFormProps = {
    brand?: typeof brands.$inferSelect;
}

const BrandForm = ({ brand }:BrandFormProps) => {

    const router = useRouter();


    const form = useForm<z.infer<typeof brandClientSchema>>({
        resolver: zodResolver(brandClientSchema),
        defaultValues: {
            name: brand?.name ?? "",
            description: brand?.description ?? "",
            slug: brand?.slug ?? "",
            logo: undefined

        }
    })

    const isEditing = !!brand;

    async function onSubmit(values: z.infer<typeof brandClientSchema>) {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description ?? "");
            formData.append("slug", values.slug);

            if (values.logo instanceof File) {
                formData.append("logo", values.logo);
            }

            if (isEditing) {
                await updateBrand(brand.id!, formData);
            } else {
                await createBrand(formData);
            }
            toast.success(isEditing ? "Brand updated": "Brand created", {position: "top-right"})
            form.reset()
            router.push("/admin/brands");

        }

        catch (error) {
            console.error("Error creating brand:", error);
            toast.error("Brand failed to update", {position: "top-right"})
        }
    }


    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="admin-form">
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="field">
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
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor="description">
                                Description
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="description"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter brand description"
                                autoComplete="off"
                                aria-label="Brand description"
                            />
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
                                    placeholder="Select a file"
                                    autoComplete="off"
                                    aria-label="logo"
                                    type="file"
                                    value={undefined}
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
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
