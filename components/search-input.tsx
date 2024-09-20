'use client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      {
        const params = new URLSearchParams(searchParams);
        const termSearch = event.target.value;
        let pageNumber = Number(searchParams.get('page'));
        if (pageNumber) {
          params.delete('page');
        }
        if (termSearch) {
          params.set('search', termSearch);
        } else {
          params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
      }
    },
    500,
  );
  return (
    <div className='relative'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Busque por nome...'
        className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
        onChange={handleChange}
      />
    </div>
  );
}
