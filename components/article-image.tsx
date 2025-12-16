import { ImageContainer } from './image-container';

function parseAttributes(attributes: string) {
  const src = attributes.match(/:src=([^|]+)/)?.[1] || null;
  const title = attributes.match(/\|title=([^|]+)/)?.[1] || null;
  const credit = attributes.match(/\|credit=([^|]+)/)?.[1] || null;
  const creditLink = attributes.match(/\|creditLink=([^|]+)/)?.[1] || null;
  return { src, title, credit, creditLink };
}

export function ArticleImage({ attributes }: { attributes: string }) {
  const { src, title, credit, creditLink } = parseAttributes(attributes);
  console.log(src, title, credit, creditLink);

  if (!src) return null;

  return (
    <div className="my-4 text-center">
      <ImageContainer
        src={src}
        alt={title ?? 'Article Image'}
        height={426}
        width={760}
        priority={true}
        fill={true}
      />
      {(title || credit) && (
        <div className="text-sm opacity-80 mt-1">
          {title && <span>{title}</span>}
          {title && credit && <span> </span>}
          {credit && creditLink ? (
            <span>
              Credit:{' '}
              <a href={creditLink} className="underline">
                {credit}
              </a>
            </span>
          ) : (
            credit && <span>Credit: {credit}</span>
          )}
        </div>
      )}
    </div>
  );
}
