import React from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../icons/Icon";

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: Link[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
  const [, setSearchParams] = useSearchParams();

  function handleClick(url: string | null) {
    if (!url) return;
    const match = url.match(/page=(\d+)/);
    if (match) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", match[1]);
        return params;
      });
    }
  }

  const prevLink = links[0];
  const nextLink = links[links.length - 1];
  const numberedLinks = links.slice(1, links.length - 1).map((link) => {
    const num = Number(link.label.replace(/<[^>]+>/g, ""));
    return { ...link, page: isNaN(num) ? null : num };
  });
  const current =
    numberedLinks.find((l) => l.active && l.page !== null)?.page || 1;
  const last = numberedLinks.reverse().find((l) => l.page !== null)?.page || 1;
  numberedLinks.reverse();

  function getVisibleLinks() {
    if (numberedLinks.length === 0) return [];
    const result: (
      | (typeof numberedLinks)[0]
      | { ellipsis: true; key: string }
    )[] = [];
    const showPages = new Set<number>();
    for (let i = 1; i <= 2; i++) showPages.add(i);
    for (let i = last - 1; i <= last; i++) if (i > 2) showPages.add(i);
    for (let i = current - 1; i <= current + 1; i++)
      if (i > 2 && i < last - 1) showPages.add(i);
    let prevWasEllipsis = false;
    numberedLinks.forEach((link, idx) => {
      if (link.page && showPages.has(link.page)) {
        result.push(link);
        prevWasEllipsis = false;
      } else if (link.page && !prevWasEllipsis) {
        result.push({ ellipsis: true, key: `ellipsis-${idx}` });
        prevWasEllipsis = true;
      }
    });
    return result;
  }
  const visibleLinks = getVisibleLinks();

  return (
    <nav className="flex items-center justify-center gap-1 py-8">
      <button
        aria-label="Previous"
        disabled={!prevLink.url}
        className={`min-h-10 min-w-10 rounded-md px-3 py-1 transition-colors ${prevLink.url ? "hover:bg-borderColor text-primaryText" : "disabled:text-darkGrey disabled:cursor-not-allowed"}`}
        onClick={() => handleClick(prevLink.url)}
      >
        <Icon type="LeftArrowIcon" />
      </button>

      {visibleLinks.map((item, idx) =>
        "ellipsis" in item ? (
          <span
            key={item.key}
            className="text-darkGrey min-h-10 min-w-10 select-none px-3 py-1 text-xl"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            disabled={!item.url}
            className={`min-h-10 min-w-10 rounded-md border-2 px-3 py-1 font-bold transition-colors ${item.active ? "border-buttonColor text-buttonColor" : "text-darkGrey border-grey hover:bg-borderColor"} disabled:cursor-not-allowed disabled:text-gray-300`}
            onClick={() => handleClick(item.url)}
            dangerouslySetInnerHTML={{ __html: item.label }}
          />
        ),
      )}

      <button
        aria-label="Next"
        disabled={!nextLink.url}
        className={`min-h-10 min-w-10 rounded-md px-3 py-1 transition-colors ${nextLink.url ? "hover:bg-borderColor text-primaryText" : "disabled:text-darkGrey disabled:cursor-not-allowed"}`}
        onClick={() => handleClick(nextLink.url)}
      >
        <Icon type="RightArrowIcon" />
      </button>
    </nav>
  );
};

export default Pagination;
