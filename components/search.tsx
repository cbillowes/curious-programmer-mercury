'use client';

import { useEffect, useRef, useState } from 'react';
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY } from '@/lib/config';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {
  InstantSearch,
  UseSearchBoxProps,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import { FiCommand } from 'react-icons/fi';
import { FaAlgolia } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

function Hit({
  hit,
}: {
  hit: {
    slug: string;
    title: string;
    abstract?: string;
    imageUrl?: string;
    excerpt?: string;
    tags?: string[];
  };
}) {
  const { slug, imageUrl, title, abstract, excerpt, tags } = hit;
  return (
    <div>
      <Link href={slug}>
        <div className="py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mb-2 flex items-center gap-4 cursor-pointer">
          {imageUrl && (
            <Image
              className="w-40 h-40 mb-1 object-cover rounded-md"
              src={imageUrl}
              alt={title}
              width={80}
              height={80}
            />
          )}
          <div>
            <h2 className="text-lg text-pink-600 font-bold">{title}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {(abstract ?? excerpt)?.substring(0, 250)}
            </p>
            <div>
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-500 dark:text-gray-400 mr-2"
                >
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

function CustomSearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);
  const { status, error, results } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <div
        role="search"
        className="w-full flex items-center gap-2 mb-4 relative"
      >
        <div className="flex items-center gap-2 w-full">
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
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                refine(inputValue);
              }
            }}
          />
        </div>
        <Button
          className="bg-pink-600 cursor-pointer"
          onClick={() => {
            refine(inputValue);
          }}
        >
          Search
        </Button>
      </div>
      {status === 'loading' && <Spinner aria-label="Loading..." />}
      {error && <Alert color="red">Error: {error.message}</Alert>}
      <div className="max-h-96 overflow-y-auto">
        {results.hits.map((hit) => (
          <Hit key={hit.objectID} hit={hit} />
        ))}
      </div>
    </div>
  );
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((x) => !x);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <InstantSearch indexName="Pages" searchClient={searchClient}>
      <button
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center text-sm text-gray-400 dark:text-gray-500">
          <FiCommand />
          &nbsp;K
        </div>
        <FaSearch />
      </button>
      <Modal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        className="text-black dark:text-white"
      >
        <ModalHeader className="border-gray-200 dark:border-gray-800 pb-0">
          Search for something
        </ModalHeader>
        <ModalBody className="max-h-[400px] overflow-hidden px-4 py-2">
          <CustomSearchBox />
        </ModalBody>
        <ModalFooter className="px-4 py-4">
          <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 justify-end w-full text-md">
            Powered by <FaAlgolia /> AlgoliaSearch
          </p>
        </ModalFooter>
      </Modal>
    </InstantSearch>
  );
}
