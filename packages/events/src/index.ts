type Target<T extends HTMLElement> = T | null | undefined | { value?: T | null; } | { current?: T | null; };
type TargetSvg<T extends SVGElement> = T | null | undefined | { value?: T | null; } | { current?: T | null; };




export const elementEvents = <
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  element: Target<T>,
  event: K | K[],
  listener: (event: HTMLElementEventMap[K], current: T) => void
) => {
  if (!element) { }
  else if ('value' in element)
    element = element.value;
  else if ('current' in element)
    element = element.current;

  const _element = element as T | null | undefined;

  if (!_element)
    return () => { };

  event = ([] as K[]).concat(event);

  const listenerCustom = (event: HTMLElementEventMap[K]) => {
    listener(event, _element);
  };

  for (const _event of event)
    _element.addEventListener(_event, listenerCustom);

  return () => {
    for (const _event of event)
      _element.removeEventListener(_event, listenerCustom);
  };
};

export const svgElementEvents = <
  K extends keyof SVGElementEventMap,
  T extends SVGElement
>(
  element: TargetSvg<T>,
  event: K | K[],
  listener: (event: SVGElementEventMap[K], current: T) => void
) => {
  if (!element) { }
  else if ('value' in element)
    element = element.value;
  else if ('current' in element)
    element = element.current;

  const _element = element as T | null | undefined;

  if (!_element)
    return () => { };

  event = ([] as K[]).concat(event);

  const listenerCustom = (event: SVGElementEventMap[K]) => {
    listener(event, _element);
  };

  for (const _event of event)
    _element.addEventListener(_event, listenerCustom);

  return () => {
    for (const _event of event)
      _element.removeEventListener(_event, listenerCustom);
  };
};

export const documentEvents = <K extends keyof DocumentEventMap>(
  event: K | K[],
  listener: (event: DocumentEventMap[K]) => void
) => {
  event = ([] as K[]).concat(event);

  for (const _event of event)
    document.addEventListener(_event, listener);

  return () => {
    for (const _event of event)
      document.removeEventListener(_event, listener);
  };
};

export const windowEvents = <K extends keyof WindowEventMap>(
  event: K[] | K,
  listener: (event: WindowEventMap[K]) => void
) => {
  event = ([] as K[]).concat(event);

  for (const _event of event)
    addEventListener(_event, listener);

  return () => {
    for (const _event of event)
      removeEventListener(_event, listener);
  };
};