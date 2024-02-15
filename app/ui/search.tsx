'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter  } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  //replace(href: string, options?: NavigateOptions): void;
  const { replace } = useRouter();//Navigate to the provided href. Replaces the current history entry.

    //useDebouncedCallback wrap the contents of handleSearch, and run the code after a specific time once the user has stopped typing (300ms).
    const handleSearch = useDebouncedCallback((term) => {
      console.log(term);//user input
      console.log(`Searching... ${term}`);
      //URLSearchParams - a Web API that provides utility methods for manipulating the URL query parameters.
      //Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a.
      const params = new URLSearchParams(searchParams);

      //when the user types a new search query, you want to reset the page number to 1.
      params.set('page', '1');

      if (term) {
          params.set('query', term);
      } else {
          params.delete('query');
      }

      //${pathname} is the current path, for ex, "/dashboard/invoices".
      //params.toString() translates this input into a URL-friendly format.
      //the below string updates the URL with the user's search data.
      //For example, /dashboard/invoices?query=lee if the user searches for "Lee".
      replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
        {/*since you're not using state, you can use defaultValue. This means the native input will manage its own state.
        This is okay since you're saving the search query to the URL instead of state.*/}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
            handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
