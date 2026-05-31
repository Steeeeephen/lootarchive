// noinspection ShadcnAccessibility

import { Sheet , SheetTrigger, SheetContent, SheetTitle, SheetHeader} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Nav = () => {
    return (
        <>
            <div data-section="mobile-nav" className="flex flex-col md:hidden m-4">
                <div className="flex justify-between items-center md:hidden">
                    <Link href="/">
                        <span className="font-grenze-gotisch text-2xl text-foreground">The Loot Archive</span>
                    </Link>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                className="font-grenze-gotisch text-2xl text-foreground md:hidden"
                            >
                                Menu
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="sr-only">
                                    Navigation
                                </SheetTitle>
                            </SheetHeader>
                            <nav>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="swords">
                                        <AccordionTrigger>Weapons</AccordionTrigger>
                                        <AccordionContent>
                                            <Link href="/swords">Swords</Link>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="armor">
                                        <AccordionTrigger>Armor</AccordionTrigger>
                                        <AccordionContent>
                                            <Link href="/armor">Heavy Armor</Link>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </nav>

                            <div className="flex flex-col justify-around gap-2 mt-4 w-full">
                                <Link href="/sign-in"><Button className="font-garamond bg-primary text-surface" variant="default">Sign In</Button></Link>
                                <Link href="/sign-up"><Button className="font-garamond w-full" variant="outline">Sign Up</Button></Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div>
                    <label htmlFor="search" className="sr-only">Search</label>
                    <Input type="text" placeholder="Search" id="search" name="search" className="m-2 w-full font-pixel focus-visible:ring-primary-hover focus-visible:border-0 border-0 md:hidden" />
                </div>

           </div>


            <div className="desktop-nav hidden md:flex">
                <h1>Desktop</h1>
            </div>




        </>
    )
}
export default Nav
