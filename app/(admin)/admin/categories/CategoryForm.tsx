"use client"

import React from 'react'
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller, useForm} from "react-hook-form";
import {categories} from "@/db/schema";
import {z} from "zod";
import {categoryClientSchema} from "@/lib/validators/categories";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {createCategory, updateCategory} from "@/lib/actions/categories";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


type CategoryFormProps = {
    category?: typeof categories.$inferSelect;
}

const CategoryForm = ({ category } :CategoryFormProps) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof categoryClientSchema>>({
        resolver: zodResolver(categoryClientSchema),
        defaultValues: {
            name: category?.name ?? "",
            description: category?.description ?? "",
            slug: category?.slug ?? "",
            parentId: category?.parentId ?? undefined,
            image: undefined
        }
    });

    const isEditing = !!category;

    async function onSubmit(values: z.infer<typeof categoryClientSchema>) {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            if (values.description) {
                formData.append("description", values.description);
            }
            formData.append("slug", values.slug);
            if (values.parentId != null) {
                formData.append("parentId", values.parentId.toString());
            }
            if (values.image instanceof File) {
                formData.append("image", values.image);
            }

            if(category) {
                await updateCategory(category.id!, formData);
            } else {
                await createCategory(formData);
            }
            toast.success(isEditing ? "Category updated" : "Category created", { position: "top-right" })

            if (isEditing) {
                form.reset({
                    name: values.name,
                    description: values.description,
                    slug: values.slug,
                    parentId: values.parentId,
                    image: undefined
                });
                router.refresh();
            } else {
                form.reset();
                router.push("/admin/categories");
            }

        } catch (error) {
            console.error("Error creating category:", error);
            toast.error("Category failed to update", {position: "top-right"})
        }
    }


    return (
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
                                placeholder="Enter category name"
                                autoComplete="off"
                                aria-label="Category name"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="field">
                            <FieldLabel htmlFor="description">
                                Description
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="description"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter category description"
                                autoComplete="off"
                                aria-label="Category description"
                            />
                        </Field>
                    )}
                />

                <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="field">
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
                        </Field>
                    )}
                />

                <Controller
                    name="image"
                    control={form.control}
                    render={({ field: { value, ...field }, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor="image">
                                Image
                            </FieldLabel>
                            <Input
                                {...field}
                                id="image"
                                aria-invalid={fieldState.invalid}
                                placeholder="Select a file"
                                autoComplete="off"
                                aria-label="image"
                                type="file"
                                onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => form.reset()}
                >
                    Reset
                </Button>
                <Button
                    type="submit"
                    className="cursor-pointer"
                >
                    {isEditing ? "Update Category" : "Create Category"}
                </Button>
            </div>
        </form>
    )
}
export default CategoryForm
