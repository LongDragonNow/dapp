import LandingFooter from "@/components/LandingFooter";
import LandingNavigationBar from "@/components/LandingNavBar";
import { HoverEffect } from "@/components/card-hover-effect";
import { EvervaultCard } from "@/components/evervault-card";
import { GradientButton } from "@/components/gradient-button";
import { PieChart } from "@/components/pie-chart";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { TracingBeam } from "@/components/tracing-beam";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

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
      <LandingNavigationBar className="md:sticky md:container md:top-4 md:z-5" />

      <div
        className="absolute h-screen w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)",
        }}
        suppressHydrationWarning
      >
        <Image
          fill
          className="object-center object-cover pointer-events-none"
          src="/hero.png"
          alt="Long Dragon"
        />
      </div>

      <video
        className="w-full h-screen absolute top-0 left-0 mix-blend-color-dodge object-fill"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/dust.mp4" type="video/mp4" />
      </video>

      <video
        className="w-full h-screen absolute bottom-0 left-0 mix-blend-color-dodge object-fill"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/fog.mp4" type="video/mp4" />
      </video>

      <section className="container z-10 h-screen flex flex-col justify-center items-center md:items-start gap-3">
        <p className="text-5xl mb-4 text-center md:text-start">Shape Destiny</p>
        <p className="text-2x">In service of</p>
        <Image
          src="/render-text.webp"
          alt="Render network"
          width={300}
          height={150}
        />

        <GradientButton />
      </section>

      <TracingBeam className="w-full">
        <section id="features" className="md:h-screen w-full container">
          <div className="h-full place-content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-auto">
              <CardBody>
                <EvervaultCard
                  className="h-[350px]"
                  text="Launchpad"
                  imageUrl="/dragon1.webp"
                />
                <p className="p-8 leading-7 text-center md:text-start">
                  The Long Dragon Launchpad simplifies the process of
                  participating in emerging Web 3.0 projects. By rigorously
                  vetting projects and purchasing a portion of their funding
                  round, it provides potential for high returns. The platform is
                  user-friendly, attracting both Web 2.0 and Web 3.0 investors
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <EvervaultCard
                  className="h-[350px]"
                  text="Staking"
                  imageUrl="/dragon2.webp"
                />
                <p className="p-8 leading-7 text-center md:text-start">
                  Long Dragon&apos;s staking platform offers multiple reward
                  streams beyond traditional token tax redistribution. Stakers
                  can earn through liquidity pool creation, airdrop farming,
                  native token incentives, and DAO-backed investments. The
                  platform provides enhanced benefits for stakers and
                  contributes to ecosystem growth
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <EvervaultCard
                  className="h-[350px]"
                  text="DeGen Chest"
                  imageUrl="/dragon3.webp"
                />
                <p className="p-8 text-center md:text-start">
                  The DeGen Chest is an innovative feature within the Long
                  Dragon ecosystem designed to offer unique and potentially
                  high-reward opportunities. It leverages the collective
                  expertise of the Long Dragon DAO to identify and capitalize on
                  emerging trends and projects in the Crypto space
                </p>
              </CardBody>
            </Card>
          </div>
        </section>

        <section id="introduction" className="mt-10 w-full container ">
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            <Image
              src="/scroll.png"
              alt="Long Dragon Scroll"
              width={400}
              height={300}
              loading="lazy"
              className="justify-self-center"
            />

            <div className="flex flex-col justify-start">
              <TextGenerateEffect
                className="text-center md:text-start"
                words={"Introducing Long Dragon ($LD)"}
              />
              <span className="mt-4 text-md leading-7 text-center md:text-start">
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

        <section id="more" className="mt-20 w-full container">
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            <div className="flex flex-col justify-start order-last md:order-1">
              <TextGenerateEffect
                className="text-center md:text-start"
                words={"Introducing Long Dragon ($LD)"}
              />
              <span className="mt-4 text-md leading-7 text-center md:text-start">
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

            <Image
              src="/vase.png"
              alt="Long Dragon Vase"
              width={400}
              height={300}
              loading="lazy"
              className="justify-self-center md:order-last"
            />
          </div>
        </section>

        <section id="roadmap" className="mt-10 w-full container mb-4">
          <HoverEffect items={projects} />
        </section>

        <section id="tokenomics" className="mt-10 w-full container ">
          <PieChart />
        </section>

        <section className="h-screen mt-10 w-full container flex flex-col items-center justify-center">
          <TextGenerateEffect
            className="text-center leading-7 z-50"
            words={
              "We invite community members to support the Long Dragon Project for its potential to offer expansive staking rewards, multiple protocols with easily accessible utility and introduce new projects enabling exclusive access"
            }
          />

          <div className="absolute h-screen w-full bg-cover bg-no-repeat bg-center">
            <Image
              fill
              className="object-center object-cover pointer-events-none"
              src="/bottom-dragon.png"
              alt="Long Dragon"
            />
          </div>
        </section>
      </TracingBeam>

      <LandingFooter />
    </main>
  );
}
