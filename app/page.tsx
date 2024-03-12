"use client";

import LandingNavigationBar from "@/components/LandingNavBar";
import { HoverEffect } from "@/components/card-hover-effect";
import { EvervaultCard } from "@/components/evervault-card";
import { PieChart } from "@/components/pie-chart";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { TracingBeam } from "@/components/tracing-beam";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function Home() {
  const projects = [
    {
      title: "Phase 1",
      description:
        "In this phase, Long Dragon focuses on establishing a robust infrastructure, including the launch of the staking platform and initial liquidity pools. Community engagement is prioritized through airdrop farming and the introduction of the DeGen Box, fostering a strong and active user base.",
    },
    {
      title: "Phase 2",
      description:
        "The project expands its offerings by launching the user-friendly Launchpad and implementing the farming protocols. The $LD Fund and incubation program are introduced, diversifying investment opportunities and supporting innovative projects. This phase aims to attract a broader audience and increase the ecosystem's value.",
    },
    {
      title: "Phase 3",
      description:
        "Long Dragon consolidates its position by enhancing its data room capabilities and refining its platforms based on user feedback. The focus shifts to scaling the ecosystem, increasing interoperability, and fostering partnerships. This phase aims to establish Long Dragon as a leading DeFi ecosystem with sustained growth.",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <div
        className="absolute h-screen w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%), url('/hero.png')",
        }}
        suppressHydrationWarning
      ></div>

      <LandingNavigationBar className="md:sticky md:container md:top-4 md:z-50" />

      <section className="container z-10 h-screen flex flex-col justify-center items-start gap-3">
        <p className="text-5xl mb-4">Shape Destiny</p>
        <p className="text-2xl">In service of</p>
        <Image src="/render-text.webp" alt="Render network" width={300} />

        <Button
          size="lg"
          className="mt-4 relative inline-flex h-10 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#b8a159_0%,#f5d778_50%,#fcf4d9_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-black px-3 text-sm font-medium text-white backdrop-blur-3xl">
            Enter Dapp
          </span>
        </Button>
      </section>

      <TracingBeam className="w-full">
        <section className="md:h-screen w-full container">
          <div className="h-full place-content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-auto">
              <CardBody>
                <EvervaultCard
                  className="h-[350px]"
                  text="Launchpad"
                  imageUrl="/dragon1.png"
                />
              </CardBody>
              <CardFooter className="p-8 leading-7">
                The Long Dragon Launchpad simplifies the process of
                participating in emerging Web 3.0 projects. By rigorously
                vetting projects and purchasing a portion of their funding
                round, it provides potential for high returns. The platform is
                user-friendly, attracting both Web 2.0 and Web 3.0 investors
              </CardFooter>
            </Card>

            <Card>
              <CardBody>
                <EvervaultCard
                  className="h-[350px]"
                  text="Staking"
                  imageUrl="/dragon2.png"
                />
              </CardBody>
              <CardFooter className="p-8 leading-7">
                Long Dragon&apos;s staking platform offers multiple reward
                streams beyond traditional token tax redistribution. Stakers can
                earn through liquidity pool creation, airdrop farming, native
                token incentives, and DAO-backed investments. The platform
                provides enhanced benefits for stakers and contributes to
                ecosystem growth.
              </CardFooter>
            </Card>

            <Card>
              <CardBody>
                <EvervaultCard
                  className="h-[350px]"
                  text="DeGen Box"
                  imageUrl="/dragon3.png"
                />
              </CardBody>
              <CardFooter className="p-8">
                The DeGen Box is an innovative feature within the Long Dragon
                ecosystem designed to offer unique and potentially high-reward
                opportunities. It leverages the collective expertise of the Long
                Dragon DAO to identify and capitalize on emerging trends and
                projects in the Crypto space
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="md:h-screen mt-10 md:mt-0 w-full container ">
          <div className="h-full place-content-center grid grid-cols-1 md:grid-cols-2 gap-6">
            <Image
              src="/scroll.png"
              alt="Long Dragon Scroll"
              width={400}
              height={300}
            />

            <div className="flex flex-col justify-start">
              <TextGenerateEffect words={"Introducing Long Dragon ($LD)"} />
              <span className="mt-4 text-md leading-7">
                The Long Dragon project has been created to address several
                challenges prevalent in current DeFi ecosystems, including but
                not limited to the lack of comprehensive staking platforms with
                multiple reward streams, farming protocols that inadequately
                reward up and coming projects, ineffective decentralized venture
                capital (VC) fund structures, non-user-friendly launchpads for
                Web 2.0 investors and the absence of the availability of
                interpreted blockchain data. Our overarching aim is to merge the
                user benefits and accessibility of Web 2.0 with the
                decentralization and advanced technology of Web 3.0 by
                addressing the aforementioned problems.
              </span>
            </div>
          </div>
        </section>

        <section className="md:h-screen mt-10 md:mt-0 w-full container">
          <div className="h-full place-content-center grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-start order-last md:order-1">
              <TextGenerateEffect words={"Introducing Long Dragon ($LD)"} />
              <span className="mt-4 text-md leading-7">
                The Long Dragon project has been created to address several
                challenges prevalent in current DeFi ecosystems, including but
                not limited to the lack of comprehensive staking platforms with
                multiple reward streams, farming protocols that inadequately
                reward up and coming projects, ineffective decentralized venture
                capital (VC) fund structures, non-user-friendly launchpads for
                Web 2.0 investors and the absence of the availability of
                interpreted blockchain data. Our overarching aim is to merge the
                user benefits and accessibility of Web 2.0 with the
                decentralization and advanced technology of Web 3.0 by
                addressing the aforementioned problems.
              </span>
            </div>

            <div className="justify-self-end">
              <Image
                src="/scroll.png"
                alt="Long Dragon Scroll"
                width={400}
                height={300}
              />
            </div>
          </div>
        </section>

        <section className="w-full container mb-4">
          <HoverEffect items={projects} />
        </section>

        <section className="mt-10 w-full container ">
          <PieChart />
        </section>

        <section className="md:h-screen mt-10 md:mt-0 w-full container flex flex-col items-center justify-center">
          <TextGenerateEffect
            className="text-center leading-7"
            words={
              "We invite community members to support the Long Dragon Project for its potential to offer expansive staking rewards, multiple protocols with easily accessible utility and introduce new projects enabling exclusive access"
            }
          />
        </section>
      </TracingBeam>
    </main>
  );
}
