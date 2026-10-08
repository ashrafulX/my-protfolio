"use client";

import { PhoneIcon } from "lucide-react";

import { useIsClient } from "@/hooks/use-is-client";
import { formatPhoneNumber } from "@/utils/string";

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";

type PhoneItemProps = {
  phoneNumber: string;
  label?: string;
};

export function PhoneItem({ phoneNumber, label }: PhoneItemProps) {
  const isClient = useIsClient();
  const phoneNumberDecoded = phoneNumber;

  return (
    <IntroItem>
      <IntroItemIcon>
        <PhoneIcon />
      </IntroItemIcon>

      <IntroItemContent>
        <IntroItemLink
          href={isClient ? `tel:${phoneNumberDecoded}` : "#"}
          aria-label={
            isClient
              ? `Call ${formatPhoneNumber(phoneNumberDecoded)}`
              : "Phone number"
          }
        >
          {isClient
            ? formatPhoneNumber(phoneNumberDecoded)
            : "[Phone protected]"}
        </IntroItemLink>
        {label && (
          <span className="text-muted-foreground font-mono text-sm ml-1 select-none">
            {` // ${label}`}
          </span>
        )}
      </IntroItemContent>
    </IntroItem>
  );
}
