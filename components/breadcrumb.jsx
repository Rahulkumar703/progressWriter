"use client";

import Link from "next/link";

import {
  Breadcrumb as BC,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export function Breadcrumb() {
  const pathName = usePathname();
  const pathNameWithoutQuery = pathName.split("?")[0];
  const pathNestedRoutes = pathNameWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  const crumblist = pathNestedRoutes.map((subpath, idx) => {
    const href = "/" + pathNestedRoutes.slice(0, idx + 1).join("/");
    const pathname = new URLSearchParams(subpath);
    return { href, pathname, icon: null };
  });

  console.log(crumblist);
  return (
    <BC className="w-full">
      <BreadcrumbList>
        <BreadcrumbItem>
          {crumblist.length ? (
            <BreadcrumbLink asChild>
              <Link href="/" className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage className="capitalize">
              <span className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Home
              </span>
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {crumblist.length > 2 ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
          </>
        ) : null}

        {crumblist.slice(-2, crumblist.length).map((crumb, index) => {
          return (
            <span
              key={index}
              className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5"
            >
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {index === crumblist.length - 1 ? (
                  <BreadcrumbPage className="capitalize">
                    {crumb.pathname}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href} className="capitalize">
                      {crumb.pathname}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </BC>
  );
}
