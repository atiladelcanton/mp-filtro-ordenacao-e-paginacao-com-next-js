'use client';
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
type PaginationProps = {
  links: {
    url: string;
    label: string;
    active: boolean;
    id: number;
  }[];
};
export default function Pagination({ links }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClickPage(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function handleClickPagePrevius() {
    let pageNumber = Number(searchParams.get('page'));
    const params = new URLSearchParams(searchParams);
    if (pageNumber) {
      pageNumber = pageNumber - 1;
    }
    if (pageNumber != 0) {
      params.set('page', pageNumber.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function handleClickPageNext() {
    let pageNumber = Number(searchParams.get('page'));
    const params = new URLSearchParams(searchParams);

    if (pageNumber) {
      pageNumber = pageNumber + 1;
    } else {
      pageNumber = 1;
    }
    if (pageNumber <= links.length) {
      params.set('page', pageNumber.toString());
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='cursor-pointer'
            onClick={handleClickPagePrevius}
          />
        </PaginationItem>
        {links.map(link => {
          if (
            link.label.includes('Anterior') ||
            link.label.includes('Próximo')
          ) {
            return null;
          }
          if (link.label === '...') {
            return (
              <PaginationItem key={link.id} className='hidden sm:inline-flex'>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem
              key={link.id}
              className='hidden md:inline-flex cursor-pointer'
            >
              <PaginationLink
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
                onClick={() => handleClickPage(Number(link.label))}
              />
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            className='cursor-pointer'
            onClick={handleClickPageNext}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
