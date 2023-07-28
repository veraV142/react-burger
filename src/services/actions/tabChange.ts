export const TAB_CHANGE = "TAB_CHANGE"
export const TAB_CHANGE_DEFAULT = "TAB_CHANGE_DEFAULT"

export interface ITabChange {
	type: typeof TAB_CHANGE;
	tab: string;
}
export interface ITabChangeDefault {
	type: typeof TAB_CHANGE_DEFAULT;
}

export type ITabChangeAction = | ITabChange|ITabChangeDefault;