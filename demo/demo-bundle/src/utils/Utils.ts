export const convertStringToHtmlDivElement = (htmlString: string): HTMLDivElement => {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();

  const element = template.content.firstElementChild;

  if (element instanceof HTMLDivElement) {
    return element;
  } else {
    throw new Error('Provided string does not represent a <div> element.');
  }
}

export const replaceStringFromList = (stringObject: string, replaceList: ReplaceData[]): string => {
  replaceList.forEach((replace) => {
    stringObject = stringObject.replace(replace.from, replace.to.toString());
  });

  return stringObject;
}