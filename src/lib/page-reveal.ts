/** Hero entrances wait for the loader, without delaying server-rendered content. */
export function waitForPageReveal(element: HTMLElement, signal: AbortSignal): Promise<void> {
  const shell = element.closest<HTMLElement>('[data-alp-load-state]');
  if (!shell || shell.dataset.alpLoadState !== 'loading' || signal.aborted) return Promise.resolve();
  return new Promise(resolve => {
    const done = () => {
      shell.removeEventListener('alp:page-reveal', done);
      signal.removeEventListener('abort', done);
      resolve();
    };
    shell.addEventListener('alp:page-reveal', done, { once: true });
    signal.addEventListener('abort', done, { once: true });
  });
}
