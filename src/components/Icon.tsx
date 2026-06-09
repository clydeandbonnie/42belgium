/**
 * Drop-in replacement for the old `<i className="fa-solid fa-xxx ...">` markup,
 * backed by tree-shaken inline SVGs instead of the FontAwesome JS kit.
 *
 * Accepts the exact same className string format used before (a mix of
 * `fa-solid|fa-regular|fa-brands`, an `fa-<icon>` name, and any utility
 * classes). It parses out the FA tokens and forwards the rest, so both the
 * static usages and the data-driven ones (`<Icon className={career.icon} />`)
 * keep working unchanged.
 */
import { config, library } from "@fortawesome/fontawesome-svg-core";
import type { IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {
  faArrowRight,
  faBriefcase,
  faChartLine,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleQuestion,
  faCode,
  faCompass,
  faLayerGroup,
  faListOl,
  faLocationDot,
  faMobileScreen,
  faPlay,
  faPlus,
  faRocket,
  faServer,
  faShieldHalved,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

// We import the CSS ourselves above; stop the kit from injecting it at runtime
// (which would otherwise cause a flash of oversized icons).
config.autoAddCss = false;

library.add(
  faArrowRight,
  faBriefcase,
  faChartLine,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleQuestion,
  faCode,
  faCompass,
  faLayerGroup,
  faListOl,
  faLocationDot,
  faMobileScreen,
  faPlay,
  faPlus,
  faRocket,
  faServer,
  faShieldHalved,
  faXmark,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faLightbulb,
);

const PREFIX: Record<string, "fas" | "far" | "fab"> = {
  "fa-solid": "fas",
  "fa-regular": "far",
  "fa-brands": "fab",
};

interface IconProps {
  /** Same string you used in the old `<i className="...">`. */
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

export function Icon({ className = "", ...rest }: IconProps) {
  let prefix: "fas" | "far" | "fab" = "fas";
  let name: string | null = null;
  const passthrough: string[] = [];

  for (const token of className.split(/\s+/).filter(Boolean)) {
    if (token in PREFIX) {
      prefix = PREFIX[token];
    } else if (token.startsWith("fa-")) {
      name = token.slice(3);
    } else {
      passthrough.push(token);
    }
  }

  if (!name) return null;

  return (
    <FontAwesomeIcon
      icon={[prefix, name as IconName] as IconProp}
      className={passthrough.join(" ") || undefined}
      {...rest}
    />
  );
}
