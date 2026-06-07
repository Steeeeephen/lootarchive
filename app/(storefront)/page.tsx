import {Card} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
          <div className={"flex flex-col items-center"}>
              <Skeleton className="h-25 w-full rounded-none bg-gray-300" />

              <h1 className="font-grenze-gotisch text-3xl">Welcome to The Loot Archive</h1>
          </div>

          <div className={"grid grid-cols-3 gap-4"}>

              <Link href="/weapons">
                  <Card className={`
                        group relative overflow-hidden
                        bg-surface-alt
                        border border-border
                        shadow-md
                        hover:border-primary/50 hover:shadow-lg
                        transition-all duration-300 cursor-pointer
                        flex flex-col items-center justify-center gap-3 p-6
                        rounded-lg
                    `}>



                      {/* Subtle hover wash using primary */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 rounded-lg" />

                      <Image
                          className="mx-auto relative z-10 group-hover:scale-105 transition-transform duration-300"
                          src={"/images/green-axes.png"}
                          alt={"weapon category"}
                          width={120}
                          height={120}
                      />

                      <p className="font-garamond font-bold text-2xl text-center text-foreground group-hover:text-primary tracking-widest uppercase transition-colors duration-300 p-0 relative z-10">
                          Shop Weapons
                      </p>

                      <p className="text-xs text-muted tracking-[0.2em] uppercase group-hover:text-accent transition-colors duration-300 relative z-10">
                          Browse Arsenal
                      </p>

                  </Card>
              </Link>
          </div>
      </main>
    </>
  );
}
