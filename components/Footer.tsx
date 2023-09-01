import Link from "next/link";

import {
  GithubIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/assets/icons";

const socials = [
  {
    icon: <TwitterIcon />,
    to: "#",
  },
  {
    icon: <YoutubeIcon />,
    to: "#",
  },
  {
    icon: <LinkedInIcon />,
    to: "#",
  },
  {
    icon: <TelegramIcon />,
    to: "#",
  },
  {
    icon: <GithubIcon />,
    to: "#",
  },
];

const blockchainNav = [
  {
    label: "Explore NFTs",
    to: "/",
  },
  {
    label: "Top Collections",
    to: "/rankings/collections",
  },
  {
    label: "Top Creators",
    to: "/rankings/creators",
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-ether-grey-1 mt-auto">
      <div className="flex gap-48 px-28 pt-16 pb-14 border-b-2 border-solid border-ether-grey-2">
        <div className="flex flex-2">
          <div className="flex flex-col">
            <Link href="/" className="text-white font-bold text-2xl">
              Explorify
            </Link>
            <p className="text-ether-grey-5 text-sm pt-4 pb-6">
              Ether Explorer is a Block Explorer and Analytics Platform for
              Ethereum, a decentralized smart contracts platform.
            </p>
            <div className="flex gap-8">
              {socials.map((social, index) => (
                <Link href={social.to} key={index} className="flexCenter">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex flex-3  flex-col">
          <h2 className="text-sm text-white font-semibold mb-7">Blockchain</h2>
          {blockchainNav.map((item, index) => (
            <Link
              href={item.to}
              key={index}
              className="text-ether-grey-5 hover:text-ether-grey-6 text-sm pb-4"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-28 py-8">
        <div className="text-sm text-ether-grey-5">
          Copyright @{new Date().getFullYear()} Ether Explorer
        </div>
        <div className="text-sm text-ether-grey-5">
          Powered by{" "}
          <Link href="#" className="text-white">
            WebWorks
          </Link>
        </div>
        <Link href="/privacyPolicy" className="text-white text-sm">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
