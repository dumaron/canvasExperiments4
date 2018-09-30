import stylis from 'stylis';

export type subClassFactory = (...classes: string[]) => string;
export type classFactory = (theme: any, bindedSubClass: subClassFactory) => string;
export type globalInjector = (theme: any) => void;
const classes: {
	[key: string]: classFactory;
} = {};
const globals: globalInjector[] = [];
let i = 0;

export function registerClass(classCreator: classFactory): string {
	const key = 'c' + i++;
	classes[key] = classCreator;
	return key;
}

export function generateCSS(theme: any, prefix?: string) {
	const curriedSubclass = (c: string) => (...classes: string[]) =>
		subClass.apply(null, [c].concat(classes));
	const global = globals.map((g) => g(theme)).join('\n');

	let css =
		global +
		Object.keys(classes)
			.map((k) => `.${k} { ${classes[k](theme, curriedSubclass(k))} }`)
			.join('\n');

	return stylis(prefix || '', css);
}

export function injectCSS(theme: any, prefix?: string) {
	const style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'css-manager-exported';
	style.appendChild(document.createTextNode(generateCSS(theme, prefix)));
	if (document.head !== null) document.head.appendChild(style);
}

export function injectGlobal(globalDef: globalInjector): void {
	globals.push(globalDef);
}

export const classNames = (...args: (string | null | undefined)[]) => {
	return args.filter((a) => a !== null && a !== undefined).join(' ');
};

export function subClass(...classes: string[]): string {
	return classes.join('-');
}
