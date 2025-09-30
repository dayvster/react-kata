import { useState, useCallback } from 'react';

/**
 * useCookie - React hook for getting, setting, and deleting a cookie value.
 *
 * @param name The name of the cookie.
 * @param options Optional object for cookie attributes (path, domain, expires, secure, sameSite).
 * @returns [value, setCookie, deleteCookie]
 *
 * @example
 * const [cookie, setCookie, deleteCookie] = useCookie('myCookie');
 * setCookie('newValue');
 * deleteCookie();
 */
export function useCookie(
  name: string,
  options?: {
    path?: string;
    domain?: string;
    expires?: Date | string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  }
): [string | null, (value: string, opts?: typeof options) => void, () => void] {
  
  const getCookie = useCallback((): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
  }, [name]);

  const [value, setValue] = useState<string | null>(() => getCookie());

  
  const setCookie = useCallback(
    (val: string, opts: typeof options = {}) => {
      let cookieStr = `${name}=${encodeURIComponent(val)}`;
      if (opts.path) cookieStr += `;path=${opts.path}`;
      if (opts.domain) cookieStr += `;domain=${opts.domain}`;
      if (opts.expires) {
        const expires = opts.expires instanceof Date ? opts.expires.toUTCString() : opts.expires;
        cookieStr += `;expires=${expires}`;
      }
      if (opts.secure) cookieStr += ';secure';
      if (opts.sameSite) cookieStr += `;samesite=${opts.sameSite}`;
      document.cookie = cookieStr;
      setValue(val);
    },
    [name]
  );

  
  const deleteCookie = useCallback(() => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    setValue(null);
  }, [name]);

  

  return [value, setCookie, deleteCookie];
}
