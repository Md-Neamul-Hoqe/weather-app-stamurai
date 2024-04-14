import Link from "next/link";
import { Button } from "@mui/material";

const ErrorPage = ({ error }: { error: any }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="border rounded-md p-10 flex flex-col gap-5 bg-white bg-opacity-30">
        <div>
          <h2 className="text-xl font-semibold text-red-500">
            Something wrong{" "}
          </h2>
          <small className="text-xs italic">
            {error?.status} - {error?.error}
          </small>
        </div>
        <Button
          variant="outlined"
          className="text-green-500"
          sx={{
            fontWeight: 600,
          }}>
          <Link href={"/"}>Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
