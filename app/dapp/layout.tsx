import NavigationBar from "@/components/NavBar";

export default function DAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavigationBar className="container mt-4" />
      {children}
    </section>
  );
}
