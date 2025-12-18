'use client';

import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import ReactMarkdown from 'react-markdown';
import { getHeadingId, HeadingLink } from '@/components/heading-link';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useState } from 'react';
import { FaListOl } from 'react-icons/fa6';

export function Summary({ summary, text }: { summary?: string; text: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-2 right-2 rounded-full"
      >
        <FaListOl aria-label="Table of Contents" />
      </Button>
      <Modal
        ref={modalRef}
        show={isOpen}
        size="lg"
        onClose={() => setIsOpen(false)}
        className="z-100"
      >
        <ModalHeader>Summary</ModalHeader>
        <ModalBody>
          <div>{summary}</div>
          <div className="mt-4">
            <strong>Table of Contents</strong>
          </div>
          <ReactMarkdown
            components={{
              h2: ({ children }) => {
                const id = getHeadingId(children);
                return (
                  <HeadingLink id={id}>
                    <a href={`#${id}`} onClick={() => setIsOpen(false)}>
                      {children}
                    </a>
                  </HeadingLink>
                );
              },
              h3: ({ children }) => {
                const id = getHeadingId(children);
                return (
                  <div className="ml-8">
                    <HeadingLink id={id}>
                      <a href={`#${id}`} onClick={() => setIsOpen(false)}>
                        {children}
                      </a>
                    </HeadingLink>
                  </div>
                );
              },
              span: () => <></>,
              div: () => <></>,
              p: () => <></>,
              code: () => <></>,
              img: () => <></>,
              a: () => <></>,
              ul: () => <></>,
              ol: () => <></>,
              li: () => <></>,
            }}
          >
            {text}
          </ReactMarkdown>
        </ModalBody>
      </Modal>
    </div>
  );
}
