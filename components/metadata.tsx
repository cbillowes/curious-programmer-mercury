import { toDateString } from '@/lib/utils';

export function Metadata({
  type,
  date,
  timeToRead,
  modified,
}: {
  type: string;
  date: Date;
  timeToRead?: number;
  modified?: Date;
}) {
  return (
    <div className="text-gray-600 dark:text-gray-400">
      <div>
        {date && <span>{toDateString(date)}</span>}
        <br />
        {timeToRead &&
          ['article', 'scribble', 'chapter', 'resume'].indexOf(type) > -1 && (
            <span>Estimated {timeToRead} minute read</span>
          )}
      </div>
      {modified && <div>Modified on {toDateString(modified)}</div>}
    </div>
  );
}
