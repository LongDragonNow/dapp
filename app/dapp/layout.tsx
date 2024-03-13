import NavigationBar from "@/components/NavBar";

export default function DAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavigationBar />
      {children}
    </section>
  );
}
