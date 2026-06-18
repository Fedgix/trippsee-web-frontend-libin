const playStorePackage =
  import.meta.env.VITE_PLAY_STORE_PACKAGE || 'apps.trippsee.com';

const appStoreId =
  import.meta.env.VITE_APP_STORE_ID || '6759007924';

export const appConfig = {
  websiteUrl: import.meta.env.VITE_WEBSITE_URL || 'https://www.trippsee.com',
  playStorePackage,
  playStoreUrl: `https://play.google.com/store/apps/details?id=${playStorePackage}`,
  appStoreId,
  appStoreUrl: `https://apps.apple.com/in/app/trippsee/id${appStoreId}`,
  appName: 'Trippsee',
};
