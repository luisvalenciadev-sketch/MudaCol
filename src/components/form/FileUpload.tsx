import { useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';

type Preview = { file: File; url: string; key: string };

type FileUploadProps = {
  id: string;
  label: string;
  hint: string;
  buttonLabel: string;
  removeLabel: string;
  files: File[];
  onChange: (files: File[]) => void;
};

const fileKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;

/** Carga múltiple de imágenes y videos con vista previa. */
export function FileUpload({ id, label, hint, buttonLabel, removeLabel, files, onChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Caché de URLs de vista previa por archivo (se crean una sola vez)
  const urls = useRef(new Map<string, string>());

  const previews: Preview[] = files.map((file) => {
    const key = fileKey(file);
    let url = urls.current.get(key);
    if (!url) {
      url = URL.createObjectURL(file);
      urls.current.set(key, url);
    }
    return { file, key, url };
  });

  // Libera las URLs de archivos quitados
  useEffect(() => {
    const keys = new Set(files.map(fileKey));
    for (const [key, url] of urls.current) {
      if (!keys.has(key)) {
        URL.revokeObjectURL(url);
        urls.current.delete(key);
      }
    }
  }, [files]);

  // Libera todas al desmontar
  useEffect(() => {
    const cache = urls.current;
    return () => {
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  const add = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'));
    const existing = new Set(files.map(fileKey));
    onChange([...files, ...incoming.filter((f) => !existing.has(fileKey(f)))]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <span className="field-label" id={`${id}-label`}>
        {label}
      </span>
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors hover:border-brand-action hover:bg-blue-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-blue"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          add(e.dataTransfer.files);
        }}
      >
        <Icon name="add_photo_alternate" className="text-[32px] text-brand-action" />
        <span className="font-headline text-sm font-semibold uppercase tracking-wider text-slate-800">{buttonLabel}</span>
        <span className="font-body text-xs text-slate-600" id={`${id}-hint`}>
          {hint}
        </span>
        <input
          ref={inputRef}
          id={id}
          name={id}
          type="file"
          accept="image/*,video/*"
          multiple
          className="sr-only"
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-hint`}
          onChange={(e) => add(e.target.files)}
        />
      </label>

      {previews.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Archivos adjuntos">
          {previews.map((p) => (
            <li key={p.key} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              {p.file.type.startsWith('video/') ? (
                <video src={p.url} className="aspect-square w-full object-cover" muted playsInline preload="metadata" aria-label={p.file.name} />
              ) : (
                <img src={p.url} alt={p.file.name} className="aspect-square w-full object-cover" />
              )}
              {p.file.type.startsWith('video/') && (
                <Icon name="videocam" className="absolute left-2 top-2 rounded bg-brand-dark/80 p-0.5 text-[20px] text-white" />
              )}
              <p className="truncate bg-white px-2 py-1 font-body text-[11px] text-slate-700">{p.file.name}</p>
              <button
                type="button"
                onClick={() => onChange(files.filter((f) => fileKey(f) !== p.key))}
                className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow hover:bg-rose-50 hover:text-rose-700"
                aria-label={`${removeLabel}: ${p.file.name}`}
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
