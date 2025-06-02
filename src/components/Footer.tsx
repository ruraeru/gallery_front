import React from 'react';
import styles from '@/styles/Footer.module.css';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const GithubIcon: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const InstagramIcon: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <title>Instagram</title>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.901 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.901-.42-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.859 0-3.211.016-3.586.061-4.859.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.38.419-.419.81-.689 1.379-.9.42-.165 1.065-.36 2.235-.413C8.417 2.18 8.796 2.16 12 2.16zm0 9.004c-2.021 0-3.644 1.623-3.644 3.644 0 2.02 1.623 3.644 3.644 3.644 2.02 0 3.644-1.624 3.644-3.644 0-2.021-1.624-3.644-3.644-3.644zm0 5.493c-1.017 0-1.849-.832-1.849-1.849s.832-1.849 1.849-1.849 1.849.832 1.849 1.849-.832 1.849-1.849 1.849zm4.757-6.896c-.53 0-.962.432-.962.962s.432.962.962.962.962-.432.962-.962c0-.53-.432-.962-.962-.962z" />
  </svg>
);

const LinkedinIcon: React.FC<IconProps> = ({ className, size = 24, ...props }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <title>LinkedIn</title>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

interface SocialLinkData {
  name: string;
  href: string;
  IconComponent: React.FC<IconProps>;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialMediaLinks: SocialLinkData[] = [
    {
      name: 'GitHub',
      href: 'https://github.com/ruraeru',
      IconComponent: GithubIcon,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/xodn_ghkd',
      IconComponent: InstagramIcon,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/%ED%83%9C%EC%9A%B0-%ED%99%A9-10a861336/',
      IconComponent: LinkedinIcon,
    },
  ];

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.personalInfo}>
          <p><strong>황태우 (Hwang Taewoo)</strong></p>
          <p>학번: 2022661108</p>
          <p>컴퓨터공학과 (Dept. of Computer Science and Engineering)</p>
        </div>

        <div className={styles.socialLinks}>
          {socialMediaLinks.map(({ name, href, IconComponent }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={name}
              className={styles.socialLink}
            >
              <IconComponent className={styles.icon} />
              <span className={styles.socialText}>{name}</span>
            </a>
          ))}
        </div>

        <p className={styles.copyright}>
          &copy; {currentYear} 황태우. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;