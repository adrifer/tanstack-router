export function ScriptOnce({
  className,
  children,
  log,
  ...rest
}: { children: string; log?: boolean } & React.HTMLProps<HTMLScriptElement>) {
  if (typeof document !== 'undefined') {
    return null
  }

  return (
    <script
      {...rest}
      className={`tsr-once ${className || ''}`}
      dangerouslySetInnerHTML={{
        __html: [
          children,
          (log ?? true) && process.env.NODE_ENV === 'development'
            ? "console.info('Injected From Server:\\n" + children + "');"
            : '',
        ]
          .filter(Boolean)
          .join('\n'),
      }}
    />
  )
}
