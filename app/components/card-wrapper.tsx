import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  title?: string;
  label?: string;
  href?: string;
  description?: string;
  className?: string;
}

const CardWrapper = ({
  title,
  label,
  href,
  description,
  children,
  className,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        `w-full py-3 bg-background border-bdr-default bg-linear-to-b from-bdr-default to-bdr-default/50 transition-all`,
        className,
      )}
    >
      <CardHeader className={label !== "" ? "flex-row items-center" : ""}>
        <div className="grid gap-2">
          <CardTitle>
            <h2 className="text-2xl font-bold text-accent-foreground mb-2">
              {title}
            </h2>
          </CardTitle>
          {description !== "" ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </div>
        {label !== "" ? (
          <Button asChild size="sm" className="ml-auto gap-1">
            {href ? (
              <Link href={href}>
                {label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
