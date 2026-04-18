"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useClickOutside } from "@/hooks/use-click-outside";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  TextInput,
} from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { FaAlgolia } from "react-icons/fa6";
import { FiCommand } from "react-icons/fi";
import {
  InstantSearch,
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch";

import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY } from "@/lib/config";
import { ImageContainer } from "@/components/image-container";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

function Hit({
  hit,
  onNavigate,
}: {
  hit: {
    slug: string;
    title: string;
    abstract?: string;
    imageUrl?: string;
    excerpt?: string;
    tags?: string[];
  };
  onNavigate: () => void;
}) {
  const { slug, imageUrl, title, abstract, excerpt, tags } = hit;
  return (
    <div>
      <Link href={slug} onClick={onNavigate}>
        <div className="mb-2 flex cursor-pointer items-center gap-4 rounded-lg py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          {imageUrl && (
            <ImageContainer
              width={200}
              height={80}
              className="hidden rounded-md md:block"
              src={imageUrl}
              alt={title}
              priority={true}
              fill={true}
            />
          )}
          <div>
            <h2 className="text-lg font-bold text-pink-600">{title}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {(abstract ?? excerpt)?.substring(0, 250)}
            </p>
            <div>
              {tags?.map((tag) => (
                <span key={tag} className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CustomSearchBox(props: UseSearchBoxProps & { onNavigate: () => void }) {
  const { onNavigate } = props;
  const { query, refine } = useSearchBox(props);
  const { status, error, results } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <div role="search" className="relative mb-4 flex w-full items-center gap-2">
        <div className="flex w-full items-center gap-2">
          <TextInput
            ref={inputRef}
            autoComplete="off"
            autoCorrect="on"
            autoCapitalize="off"
            placeholder="Search for something…"
            spellCheck={false}
            maxLength={512}
            type="search"
            className="w-full"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
              refine(event.currentTarget.value);
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                refine(inputValue);
              }
            }}
          />
        </div>
      </div>
      {["loading", "stalled"].includes(status) ? (
        <Spinner aria-label="Loading..." className="flex w-full items-center justify-center" />
      ) : (
        <div>
          {error && <Alert color="red">Error: {error.message}</Alert>}
          {results && results.hits.length === 0 && <Alert color="yellow">No results found.</Alert>}
          {results && results.hits.length > 0 && (
            <div className="mb-8 max-h-80 overflow-scroll">
              {results.hits.map((hit) => (
                <Hit key={hit.objectID} hit={hit} onNavigate={onNavigate} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((x) => !x);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <InstantSearch indexName="Pages" searchClient={searchClient}>
      <button
        className="flex items-center gap-2 rounded-lg p-2.5 text-lg text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center text-sm text-gray-400 dark:text-gray-500">
          <FiCommand />
          &nbsp;K
        </div>
        <FaSearch />
      </button>
      {isMounted && (
        <Modal
          ref={modalRef}
          show={isOpen}
          onClose={() => setIsOpen(false)}
          className="text-black dark:text-white"
        >
          <ModalHeader className="border-gray-200 pb-0 dark:border-gray-800">
            Search for something
          </ModalHeader>
          <ModalBody className="max-h-[400px] overflow-hidden px-4 py-2 pb-8">
            <CustomSearchBox onNavigate={() => setIsOpen(false)} />
          </ModalBody>
          <ModalFooter className="px-4 py-4">
            <p className="text-md flex w-full items-center justify-end gap-1 text-gray-500 dark:text-gray-400">
              Powered by <FaAlgolia /> AlgoliaSearch
            </p>
          </ModalFooter>
        </Modal>
      )}
    </InstantSearch>
  );
}
