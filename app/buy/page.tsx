import { Avatar, Card, CardBody, CardHeader, Input } from "@nextui-org/react";

export default function Sale() {
  return (
    <main className="flex flex-col items-center p-8">
      <Card isBlurred className="ring ring-gold">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex flex-row mb-4">
            <Avatar
              className="w-60 h-60 text-large mx-auto"
              isBordered
              radius="full"
              size="md"
              src="/long-logo.png"
              color="primary"
            />
          </div>

          <p className=" text-center">Long Dragon Presale</p>
          <p>
            The presale is a great opportunity to get in early on the next big
            thing.
          </p>
        </CardHeader>
        <CardBody>
          <Input
            type="number"
            placeholder="Enter amount"
            classNames={{
              inputWrapper: ["ring ring-1 ring-gold"],
            }}
          />
        </CardBody>
      </Card>
    </main>
  );
}
