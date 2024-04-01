import {
  Avatar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import clsx from "clsx";

const TokenTable = ({
  isLoading,
  tokens,
  title,
}: {
  isLoading: boolean;
  tokens: any;
  title?: string;
}) => {
  return (
    <div className="p-1 border-2 border-gold rounded-xl overflow-x-scroll">
      {title && <p className="p-4 text-2xl">{title}</p>}
      <Table
        removeWrapper
        bottomContent={
          isLoading ? (
            <div className="flex w-full justify-center">
              <Spinner color="white" />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn className="text-medium md:text-lg">Token</TableColumn>
          <TableColumn className="text-medium md:text-lg">Price</TableColumn>
          <TableColumn className="text-medium md:text-lg">1D</TableColumn>
          <TableColumn className="text-medium md:text-lg">
            Market Cap
          </TableColumn>
        </TableHeader>
        <TableBody>
          {tokens.map((token: any) => (
            <TableRow
              key={token.id}
              className=" last:border-0 border-b-[0.2px] border-y-gray-500 h-10"
            >
              <TableCell className="text-medium md:text-lg">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Avatar
                    size="md"
                    className="min-w-[40px] min-h-[40px]"
                    src={token.logo}
                    alt={token.name}
                  />
                  <span>
                    {token.name}
                    <span className="uppercase"> ({token.ticker})</span>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-medium md:text-lg">
                  ${token.price && token.price.toLocaleString()}
                </span>
              </TableCell>
              <TableCell
                className={clsx(
                  token.change1d >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="text-medium md:text-lg">
                  {Number(token.change1d).toFixed(2)}%
                </span>
              </TableCell>
              <TableCell>
                <span className="text-medium md:text-lg">
                  ${token.marketCap.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TokenTable;
