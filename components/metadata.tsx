import { toDateString } from '@/lib/utils';
import { Link } from '@/components/link';

export function Metadata({
  type,
  date,
  timeToRead,
  modified,
  link,
}: {
  type: string;
  date?: Date;
  modified?: Date;
  timeToRead?: number;
  link?: string;
}) {
  if (!date && !timeToRead && !modified) {
    return null;
  }
  return (
    <div className="text-gray-600 dark:text-gray-400">
      <div>
        {date && <span>{toDateString(date)}</span>}
        &nbsp;&middot;&nbsp;
        {timeToRead &&
          ['article', 'scribble', 'chapter', 'resume'].indexOf(type) > -1 && (
            <span>Estimated {timeToRead} minute read</span>
          )}
      </div>
      {modified && <div>Modified on {toDateString(modified)}</div>}
      <Link>{link}</Link>
    </div>
  );
}
