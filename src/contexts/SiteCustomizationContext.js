import { createContext } from 'react';

const SiteCustomizationContext = createContext({
  discordUrl: 'DiscordUrl',
  siteName: 'SiteName',
  siteRoot: 'http://localhost:8080',
  sourceRepo: 'https://github.com/ruler501/CubeCobra',
  supportEmail: 'support@localhost',
});

export default SiteCustomizationContext;
