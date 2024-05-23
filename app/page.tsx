import LandingFooter from "@/components/LandingFooter";
import LandingNavigationBar from "@/components/LandingNavBar";
import { HoverEffect } from "@/components/card-hover-effect";
import { EvervaultCard } from "@/components/evervault-card";
import { GradientButton } from "@/components/gradient-button";
import { LandingPieChart } from "@/components/landing-pie-chart";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { TracingBeam } from "@/components/tracing-beam";
import * as m from "@/paraglide/messages";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  const projects = [
    {
      title: m.phase({ num: 1 }),
      description:
        "In this phase, Long Dragon focuses on establishing a robust infrastructure, including the launch of the staking platform and initial liquidity pools. Community engagement is prioritized through airdrop farming and the introduction of the War Chest, fostering a strong and active user base.",
    },
    {
      title: m.phase({ num: 2 }),
      description:
        "The project expands its offerings by launching the user-friendly Launchpad and implementing the farming protocols. The $LD Fund and incubation program are introduced, diversifying investment opportunities and supporting innovative projects. This phase aims to attract a broader audience and increase the ecosystem's value.",
    },
    {
      title: m.phase({ num: 3 }),
      description:
        "Long Dragon consolidates its position by enhancing its data room capabilities and refining its platforms based on user feedback. The focus shifts to scaling the ecosystem, increasing interoperability, and fostering partnerships. This phase aims to establish Long Dragon as a leading DeFi ecosystem with sustained growth.",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <LandingNavigationBar className="md:sticky md:container md:top-4 md:z-5" />

      <video
        className="w-full h-screen absolute bottom-0 left-0 object-fit"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/dragon-background.mp4" type="video/mp4" />
      </video>

      <section className="container z-10 h-screen flex flex-col justify-center items-center md:items-start gap-3">
        <p className="text-5xl mb-4 text-center md:text-start">
          {m.shape_destiny()}
        </p>

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
                  text="War Chest"
                  imageUrl="/dragon3.webp"
                />
                <p className="p-8 text-center md:text-start">
                  The War Chest is an innovative feature within the Long Dragon
                  ecosystem designed to offer unique and potentially high-reward
                  opportunities. It leverages the collective expertise of Market
                  Makers and VCs to capitalize on emerging trends and projects
                  in the Crypto space
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
                The Long Dragon project has been created to effectively allow
                its stakers to participate in the same marketplace as whales
                with all the benefits that come along with size. Higher yield
                opportunities, better pre-sales, highest quality airdrops, and
                Market Making opportunities
              </span>
            </div>
          </div>
        </section>

        <section id="buy" className="mt-20 w-full container">
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            <div className="flex flex-col justify-start order-last md:order-1">
              <TextGenerateEffect
                className="text-center md:text-start"
                words={"Buy Long Dragon ($LD)"}
              />
              <span className="mt-4 text-md leading-7 text-center md:text-start">
                Long Dragon ($LD) is a native token that serves as the
                foundational asset for the Long Dragon ecosystem. It is designed
                to offer a wide range of utilities, including but not limited to
                staking, farming, governance, and investment opportunities. The
                token is available for purchase on various decentralized
                exchanges (DEXs) and can be used to access the full range of
                Long Dragon ecosystem features. The token is also used to
                incentivize and reward users for their participation in the
                ecosystem.
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
          <LandingPieChart />
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
