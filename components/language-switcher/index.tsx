"use client";

import { Link, usePathname } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname(); //make sure to use the one from `@/lib/i18n`
  return (
    <div>
      <Link href={pathname} locale="en" hrefLang="en">
        English
      </Link>
      <Link href={pathname} locale="de" hrefLang="de">
        Deutsch
      </Link>
    </div>
  );
}
