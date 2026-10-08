import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  LightbulbIcon,
} from "lucide-react";

import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";

function getJobIcon(title: string) {
  if (/(developer|engineer|coder|programmer)/i.test(title)) {
    return <CodeXmlIcon />;
  }

  if (/(founder|co-founder|student|researcher)/i.test(title)) {
    return <LightbulbIcon />;
  }

  return <BriefcaseBusinessIcon />;
}

type JobItemProps = {
  title: string;
  company: string;
  website: string;
  prefix?: string;
};

export function JobItem({ title, company, website, prefix = " @" }: JobItemProps) {
  return (
    <IntroItem>
      <IntroItemIcon>{getJobIcon(title)}</IntroItemIcon>

      <IntroItemContent>
        {title}
        {company && (
          <>
            {prefix}
            {website && website !== "#" ? (
              <IntroItemLink
                className="ml-0.5 font-medium"
                href={addQueryParams(website, UTM_PARAMS)}
                aria-label={`${company} website`}
              >
                {company}
              </IntroItemLink>
            ) : (
              <span className="ml-0.5 font-medium">{company}</span>
            )}
          </>
        )}
      </IntroItemContent>
    </IntroItem>
  );
}
