import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';

export function middleware(request) {
  const {
    locales,
    defaultLocale,
    prefixDefault = false,
    basePath = ''
  } = i18nConfig;

  const pathname = request.nextUrl.pathname;
  const basePathTrailingSlash = basePath.endsWith('/');

  const pathLocale = locales.find(
    locale => new RegExp(`^/(${locale}-[a-zA-Z]{2})($|/)`).test(pathname)
  );

  if (pathLocale) {
    let pathWithoutLocale = pathname.slice(`/${defaultLocale}`.length) || '/';

    if (pathWithoutLocale.includes('-')){
      pathWithoutLocale = 'en';
    }

    if (basePathTrailingSlash) {
      pathWithoutLocale = pathWithoutLocale.slice(1);
    }

    if (request.nextUrl.search) {
      pathWithoutLocale += request.nextUrl.search;
    }

    // If /default, redirect to /
    if (!prefixDefault && pathLocale === defaultLocale) {
      return NextResponse.redirect(
        new URL(`${basePath}${pathWithoutLocale}`, request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL(`${basePath}${pathLocale}`, request.url)
      );
    }
  }

  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
