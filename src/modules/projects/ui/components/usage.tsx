import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { formatDuration, intervalToDuration } from "date-fns";
import { CrownIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
  points: number;
  msBeforeNext: number;
}

export const Usage = ({ points, msBeforeNext }: Props) => {
  const { has } = useAuth();
  const hasPro = has?.({ plan: "pro" });

  const resetTime = useMemo(() => {
    try {
      return formatDuration(
        intervalToDuration({
          start: new Date(),
          end: new Date(Date.now() + msBeforeNext),
        }),
        { format: ["months", "days", "hours"] }
      );
    } catch (err) {
      console.error("Error formatting duration", err);
      return "soon";
    }
  }, [msBeforeNext]);

  return (
    <>
      <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
        <div className="flex items-center gap-x-2">
          <div>
            <p className="text-sm">
              {points} {hasPro ? "" : "free"} credits remaining
            </p>
            <p className="text-xs text-muted-foreground">
              Resets in {resetTime}
            </p>
          </div>
          {hasPro ? null : (
            <Button
              className="ml-auto"
              asChild
              variant={"tertiary"}
              size={"sm"}
            >
              <Link href={"/pricing"}>
                <CrownIcon />
                Upgrade
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
